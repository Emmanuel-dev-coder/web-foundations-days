## 1. Assumptions and Daily Active Users

- Registered users: 10,000,000
- Daily active users (DAU): 10% of registered users
- Each active user uploads 1 photo per day.
- Each active user views 50 feed pages per day.
- Average original photo size: 2 MB
- Average thumbnail size: 50 KB
- One day has 86,400 seconds.
- Peak traffic is estimated to be 5 times the average traffic.

Daily active users:

10,000,000 × 10% = 1,000,000 daily active users

## 2. Traffic and Storage Estimates

### Photo uploads

Daily uploads:

1,000,000 active users × 1 photo = 1,000,000 uploads per day

Average uploads per second:

1,000,000 ÷ 86,400 ≈ 11.6 uploads per second

Estimated peak uploads per second:

11.6 × 5 ≈ 58 uploads per second

### Feed views

Daily feed page views:

1,000,000 active users × 50 pages = 50,000,000 feed page views per day

Average feed views per second:

50,000,000 ÷ 86,400 ≈ 579 feed views per second

Estimated peak feed views per second:

579 × 5 ≈ 2,895 feed views per second

### Photo storage per year

Daily original photo storage:

1,000,000 photos × 2 MB = 2,000,000 MB per day, or approximately 2 TB per day.

Yearly original photo storage:

2 TB × 365 = 730 TB per year

Daily thumbnail storage:

1,000,000 thumbnails × 50 KB = 50 GB per day

Yearly thumbnail storage:

50 GB × 365 = 18.25 TB per year

Therefore, the app needs approximately 730 TB of original photo storage per year, plus 18.25 TB of thumbnails per year, before replication, backups, and storage overhead.

## 3. Is SnapShare Read-Heavy or Write-Heavy?

SnapShare is a read-heavy application because users generate about 50 million feed page views per day, compared with 1 million photo uploads per day. This means feed views happen approximately 50 times more often than photo uploads.

The architecture should therefore be designed to handle many reads efficiently. A CDN can serve photos and thumbnails close to users, a cache can store frequently requested feed data, and a database read replica can handle read queries without putting all the load on the primary database.

## 4. Proposed Architecture

```text
                         Users
                           |
                           v
                          CDN
                  (photos and thumbnails)
                           |
                           v
                    Load Balancer
                           |
                           v
                       App Servers
                      /     |      \
                     v      v       v
                   Cache  Primary   Queue
                          Database     |
                              |        v
                              v      Worker
                         Read Replica  |
                                      v
                               Object Storage
                              (photo files)
```

### Components and Their Responsibilities

- **CDN:** Serves photos and thumbnails from locations close to users, reducing latency and load on the app servers.
- **Load balancer:** Distributes incoming requests across multiple app servers so that one server does not receive all the traffic.
- **App servers:** Handle user requests, validate uploads, manage feed requests, and communicate with other services.
- **Cache:** Keeps frequently requested feed data or metadata in memory to reduce repeated database queries.
- **Primary database:** Stores structured information such as users, photo metadata, captions, and upload status.
- **Read replica:** Handles many read queries so that the primary database can focus on writes.
- **Object storage:** Stores original photos and generated thumbnails as files instead of storing large image files directly in database rows.
- **Queue:** Holds thumbnail-generation jobs so uploads can finish without waiting for image processing.
- **Worker:** Processes queued jobs, creates smaller thumbnails, and saves them to object storage.

## 5. Why Not Store Photos Directly in the Database?

Original photos are large files, and storing them directly in database rows can increase database size, backup time, and query overhead. SnapShare should store photo files and thumbnails in object storage, while the database stores their URLs or object keys and related metadata.

## 6. Step-by-Step Photo Upload Flow

1. The user selects a photo and uploads it through the application.
2. The load balancer directs the upload request to an available app server.
3. The app server validates the request and checks that the user is allowed to upload the photo.
4. The original photo is saved in object storage.
5. The app server saves the photo metadata, such as the user ID, object key, upload time, and photo status, in the primary database.
6. The app server adds a thumbnail-generation job to the queue.
7. The app server confirms that the upload was received successfully, without making the user wait for thumbnail processing.
8. A background worker takes the job from the queue and generates a smaller thumbnail.
9. The worker saves the thumbnail in object storage and updates the photo metadata if needed.
10. The CDN can then serve the original photo and thumbnail to users when they view the feed.

If thumbnail generation fails, the job can be retried rather than requiring the user to upload the photo again.

## 7. Trade-Offs

### Trade-Off 1: Faster Reads vs. Data Freshness

Using a cache and database read replica improves feed performance and reduces pressure on the primary database. However, cached data and replicas can be slightly out of date, so a newly uploaded photo might not appear immediately in every feed.

### Trade-Off 2: Object Storage vs. Database Storage

Object storage is designed to store large files economically and scales independently of the database. However, the application must manage object keys, permissions, file availability, and the relationship between stored files and database metadata.

### Trade-Off 3: Asynchronous Thumbnail Generation vs. Immediate Availability

Using a queue and background worker keeps photo uploads responsive and allows thumbnail processing to scale independently. However, thumbnails are not available immediately, and the system must handle failed jobs and retries.

### Trade-Off 4: CDN Performance vs. Cache Invalidation

A CDN reduces latency and origin-server traffic by caching images close to users. However, replacing or deleting an image can require cache invalidation or versioned URLs to prevent users from seeing stale content.