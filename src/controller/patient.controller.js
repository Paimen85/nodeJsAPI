import database from "../config/mysql.config.js";
import Response from "../domain/response.js";
import logger from "../util/logger.js";
import QUERY from "../query/student.query.js";
import log from "../util/logger.js";

const HttpStatus = {
  OK: {
    code: 200,
    status: "OK",
  },
  CREATED: {
    code: 201,
    status: "CREATED",
  },
  NO_CONTENT: {
    code: 204,
    status: "NO_CONTENT",
  },
  BAD_REQUEST: {
    code: 400,
    status: "BAD_REQUEST",
  },
  NOT_FOUND: {
    code: 404,
    status: "NOT_FOUND",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    status: "INTERNAL_SERVER_ERROR",
  },
};

export const getStudents = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching students`);
  database.query(QUERY.SELECT_STUDENTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `No students found`
          )
        );
    } else {
      res.status(HttpStatus.OK.code).send(
        new Response(
          HttpStatus.OK.code,
          HttpStatus.OK.status,
          `Students retrieved`,
          {
            students: results,
          }
        )
      );
    }
  });
};

export const createStudent = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, creating student`);
  database.query(
    QUERY.CREATE_STUDENT,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        logger.error(error.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Response(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              `Error occurred`
            )
          );
      } else {
        const student = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date().toLocaleString(),
        };

        res.status(HttpStatus.CREATED.code).send(
          new Response(
            HttpStatus.CREATED.code,
            HttpStatus.CREATED.status,
            `Student created`,
            {
              student,
            }
          )
        );
      }
    }
  );
};

export const getStudent = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching student`);
  database.query(QUERY.SELECT_STUDENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Student by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Response(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Student retrieved`,
            results[0]
          )
        );
    }
  });
};

export const updateStudent = (req, res) => {
  logger.info(`${req.method} ${req.originalurl}, fetching student`);
  database.query(QUERY.SELECT_STUDENT, [req.params.id], (error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Student by id ${req.params.id} was not found`
          )
        );
    } else {
      logger.info(`${req.method} ${req.originalurl}, updating patient`);

      database.query(
        QUERY.UPDATE_STUDENT,
        [...Object.values(req.body), req.params.id],
        (error, results) => {
          if (!error) {
            res
              .status(HttpStatus.OK.code)
              .send(
                new Response(
                  HttpStatus.OK.code,
                  HttpStatus.OK.status,
                  `Student updated`,
                  { id: req.params.id, ...req.body }
                )
              );
          } else {
            logger.error(error.message);
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(
                new Response(
                  HttpStatus.INTERNAL_SERVER_ERROR.code,
                  HttpStatus.INTERNAL_SERVER_ERROR.status,
                  `Error occurred`
                )
              );
          }
        }
      );
    }
  });
};


export const deleteStudent = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, deleting student`);
    database.query(QUERY.DELETE_STUDENT, [req.params.id], (error, results) => {
      if (results.affectedRows > 0) {
          res
          .status(HttpStatus.OK.code)
          .send(
            new Response(
              HttpStatus.OK.code,
              HttpStatus.OK.status,
              `Student deleted`,
              results[0]
            )
          );
      } else {
        res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Student by id ${req.params.id} was not found`
          )
        );
      }
    });
  };
export default HttpStatus;
