const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const express = require('express');
const employeesRouter = express.Router();
const timesheetsRouter = require('./timesheets.js')

employeesRouter.param('employeeId', (req, res, next, employeeId) => {
  const sql = 'SELECT * FROM Employee WHERE id = $employeeId';
  const values = {$employeeId: employeeId};
  db.get(sql, values, (err, employee) => {
    if (err) {
      next(err)
    } else if (employee) {
      req.employee = employee;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

employeesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Employee WHERE is_current_employee = 1',
    (err, employees) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json({employees: employees});
      }
    });
});

employeesRouter.get('/:employeeId', (req, res, next) => {
  res.status(200).json({employee: req.employee});
});

employeesRouter.post('/', (req, res, next) => {
  const name = req.body.employee.name;
  const position = req.body.employee.position;
  const wage = req.body.employee.wage;
  //const isCurrentEmployee = req.body.employee.is_current_employee === 0 ? 0 : 1;

  if (!name || !position || !wage) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO Employee (name, position, wage) VALUES ($name, $position, $wage)';
  const values = {
    $name: name,
    $position: position,
    $wage: wage
  };

  db.run(sql, values, function(err) {
    if (err) {
      next(err)
    } else {
      db.get(`SELECT * FROM Employee WHERE id = ${this.lastID}`,
        (err, employee) => {
          res.status(201).json({employee: employee});
        });
    }
  });
});

employeesRouter.put('/:employeeId', (req, res, next) => {
  const name = req.body.employee.name;
  const position = req.body.employee.position;
  const wage = req.body.employee.wage;
  if (!name || !position || !wage) {
    return res.sendStatus(400);
}

  const sql = 'UPDATE Employee SET name = $name, position = $position, wage = $wage WHERE id = $employeeId';
  const values = {
    $name: name,
    $position: position,
    $wage: wage,
    $employeeId: req.params.employeeId
  };

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Employee WHERE id = ${req.params.employeeId}`,
        (err, employee) => {
          res.status(200).json({employee: employee});
        });
    }
  });
});

employeesRouter.delete('/:employeeId', (req, res, next) => {
  const sql = 'UPDATE Employee SET is_current_employee = 0 WHERE id = $employeeId';
  const values = {$employeeId: req.params.employeeId};

  db.run(sql, values, (err) => {
    if (err) {
      next(err);
    } else {
      db.get(`SELECT * FROM Employee WHERE id = ${req.params.employeeId}`,
        (err, employee) => {
          res.status(200).json({employee: employee});
        });
    }
  });
});

/*
employeesRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message);
  console.log(err.message);
});
*/
module.exports = employeesRouter;
