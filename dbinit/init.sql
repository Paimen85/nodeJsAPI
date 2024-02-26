CREATE database IF NOT EXISTS students_db;

USE students_db;

DROP TABLE IF EXISTS students;

CREATE TABLE students(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name  VARCHAR(255) DEFAULT NULL,
    last_name   VARCHAR(255) DEFAULT NULL,
    email       VARCHAR(255) DEFAULT NULL,
    phone       VARCHAR(255) DEFAULT NULL,
    address     VARCHAR(255) DEFAULT NULL,
    image_url   VARCHAR(255) DEFAULT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Students_Email UNIQUE (email)
);