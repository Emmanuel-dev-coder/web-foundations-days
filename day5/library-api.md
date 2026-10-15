# Library Books REST API

## Overview

This API manages books in a library. It allows users to list, view, create, update, and delete books, as well as find books by a particular author.

**Base URL:** `/api/books`

## 1. List All Books

- **Method:** GET
- **Path:** `/api/books`
- **Description:** Retrieves a list of all books in the library.
- **Success Status Code:** `200 OK`
- **Example Request Body:** None required.

## 2. Get a Single Book

- **Method:** GET
- **Path:** `/api/books/:id`
- **Description:** Retrieves a single book using its ID.
- **Success Status Code:** `200 OK`
- **Example Request Body:** None required.

## 3. Create a Book

- **Method:** POST
- **Path:** `/api/books`
- **Description:** Adds a new book to the library.
- **Example Request Body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1958
}
```

- **Success Status Code:** `201 Created`

## 4. Update a Book

- **Method:** PUT
- **Path:** `/api/books/:id`
- **Description:** Updates the details of an existing book using its ID.
- **Example Request Body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publishedYear": 1959
}
```

- **Success Status Code:** `200 OK`

## 5. Delete a Book

- **Method:** DELETE
- **Path:** `/api/books/:id`
- **Description:** Deletes a book from the library using its ID.
- **Success Status Code:** `204 No Content`
- **Example Request Body:** None required.

## 6. List Books by Author

- **Method:** GET
- **Path:** `/api/books?author=Chinua%20Achebe`
- **Description:** Retrieves all books written by the specified author using a query parameter.
- **Success Status Code:** `200 OK`
- **Example Request Body:** None required.

## Error Responses

### 400 Bad Request

- **Description:** The request contains invalid data or is missing required fields.
- **Example:** Creating a book without a title or author.

### 404 Not Found

- **Description:** The requested resource does not exist.
- **Example:** Requesting `GET /api/books/999` when book ID `999` does not exist.
