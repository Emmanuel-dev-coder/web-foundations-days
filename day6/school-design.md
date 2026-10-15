# School Database Design

## 1. Tables and Their Purpose

### Students

The `students` table stores information about students. It contains `student_id` as the primary key, `name` to store the student's name, and `email` to store the student's email address. The email column is unique so that two students cannot register using the same email address.

### Courses

The `courses` table stores information about courses offered by the school. It contains `course_id` as the primary key, `course_name` for the course title, and `course_code` to identify each course. The course code is unique.

### Enrolments

The `enrolments` table records which students are enrolled in which courses. It contains `enrolment_id` as the primary key, `student_id` and `course_id` as foreign keys, and `grade` to store each student's result for a course. A unique constraint on `student_id` and `course_id` prevents the same student from enrolling in the same course twice.

## 2. Relationships Between Tables

The relationship between students and enrolments is one-to-many because one student can enrol in several courses, while each enrolment belongs to one student.

The relationship between courses and enrolments is also one-to-many because one course can have many students enrolled in it, while each enrolment refers to one course.

Students and courses have a many-to-many relationship because a student can take many courses and each course can have many students. The `enrolments` table acts as a join table between students and courses. It is needed to connect the two tables and store additional information, such as each student's grade for a particular course.

## 3. Index Recommendation

I would add an index on `enrolments(course_id)`. This index would help queries that find students on a particular course or count the number of students enrolled in each course. Without this index, SQLite may need to scan the enrolments table to find matching records. The index can improve query performance as the database grows.

## 4. SQL or NoSQL?

I would choose SQL for this school database because the data is structured and has clear relationships between students, courses, and enrolments. SQL supports primary keys, foreign keys, unique constraints, and joins, which help maintain accurate and consistent data. It also allows the school to retrieve information using queries such as finding a student's courses, counting enrolments, and updating grades. SQLite is suitable for this project because it is lightweight and supports the required SQL features.
