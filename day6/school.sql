
-- Day 6 Assignment: A School Database

-- 1. Create the students table
CREATE TABLE students (
    student_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 2. Create the courses table
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL,
    course_code TEXT NOT NULL UNIQUE
);

-- 3. Create the enrolments table
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade REAL,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE (student_id, course_id)
);

CREATE INDEX ix_enrolments_course_id
ON enrolments (course_id);


-- Insert at least 3 students
INSERT INTO students (student_id, name, email) VALUES
(1, 'Amina Hassan', 'amina@example.com'),
(2, 'Brian Otieno', 'brian@example.com'),
(3, 'Carol Wanjiku', 'carol@example.com'),
(4, 'David Kimani', 'david@example.com'),
(5, 'Eva Njeri',   'eva@example.com');

-- Insert at least 3 courses
INSERT INTO courses (course_id, course_name, course_code) VALUES
(1, 'Database Systems', 'DB101'),
(2, 'Web Development', 'WEB101'),
(3, 'Computer Networks', 'NET101');

-- Insert at least 5 enrolments
INSERT INTO enrolments (enrolment_id, student_id, course_id, grade) VALUES
(1, 1, 1, 85),
(2, 1, 2, 90),
(3, 2, 1, 78),
(4, 2, 3, 82),
(5, 3, 2, 88),
(6, 4, 3, NULL);


-- 1. All courses for Amina Hassan, alphabetically
SELECT students.name, courses.course_name, enrolments.grade
FROM students
JOIN enrolments ON enrolments.student_id = students.student_id
JOIN courses ON courses.course_id = enrolments.course_id
WHERE students.name = 'Amina Hassan'
ORDER BY courses.course_name ASC;


-- 2. All students enrolled in Database Systems
SELECT students.name, courses.course_name, enrolments.grade
FROM students
JOIN enrolments ON enrolments.student_id = students.student_id
JOIN courses ON courses.course_id = enrolments.course_id
WHERE courses.course_name = 'Database Systems'
ORDER BY students.name ASC;


-- 3. Count students enrolled in each course
SELECT courses.course_name, COUNT(enrolments.student_id) AS student_count
FROM courses
LEFT JOIN enrolments ON enrolments.course_id = courses.course_id
GROUP BY courses.course_id, courses.course_name
ORDER BY courses.course_name ASC;


-- 4. Find students who have no enrolments
SELECT students.student_id, students.name
FROM students
LEFT JOIN enrolments ON enrolments.student_id = students.student_id
WHERE enrolments.student_id IS NULL;


-- 5. Update Amina's grade in Database Systems
UPDATE enrolments
SET grade = 92
WHERE student_id = (
    SELECT student_id
    FROM students
    WHERE name = 'Amina Hassan'
)
AND course_id = (
    SELECT course_id
    FROM courses
    WHERE course_name = 'Database Systems'
);
