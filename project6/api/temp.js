const app = require('express');
const seriesRouter = app.Router();
//const issuesRouter = require('./issues.js');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

//seriesRouter.use('/:seriesId/issues', issuesRouter);

seriesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Series', (err, series) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({series: series});
    }
  });
});

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
  db.get('SELECT * FROM Series WHERE Series.id = $seriesId',
  {$seriesId: seriesId},
  (err, series) => {
    if(err) {
      next(err);
    } else if(series) {
      req.series = series;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

seriesRouter.get('/:seriesId', (req, res, next) => {
  res.status(200).json({series: req.series});
});

seriesRouter.post('/', (req, res, next) => {
  const name = req.body.series.name;
  const description = req.body.series.description;

  if (!name || !description) {
    return res.sendStatus(400);
  }

    db.run('INSERT INTO Series (name, description) VALUES ($name, $description)',
    {
      $name: name,
      $description: description
    },
    function(err) {
    if(err) {
      next(err);
    } else {
      db.get('SELECT * FROM Series WHERE id = $lastID',
      {
        $lastID: this.lastID
      },
      function(err, series){
        if(err) {
          next(err)
        } else {
          res.status(201).json({series: series});
        }
      });
    }
  });
});

seriesRouter.put('/:seriesId', (req, res, next) => {
  const name = req.body.series.name;
  const description = req.body.series.description;

  if (!name || !description) {
    return res.sendStatus(400);
  }

    db.run('UPDATE Series SET name = $name, description = $description WHERE id = $seriesId',
    {
      $name: name,
      $description: description,
      $seriesId: req.params.seriesId
    },
    function(err) {
      if(err) {
        next(err);
      } else {
        db.get('SELECT * FROM Series WHERE id = $id',
        {
          $id: req.params.seriesId
        },
        (err, series) => {
          res.status(200).json({series: series});
        });
      }
    })
});





module.exports = seriesRouter;
