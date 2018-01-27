const express = require('express');
const issuesRouter = express.Router({mergeParams: true});
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.delete('/:issueId', (req, res, next) => {
  db.run('DELETE FROM Issue WHERE Issue.id = $issueId',
  {$issueId: req.params.issueId},
  (err) => {
    if(err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
});

issuesRouter.put('/:issueId', (req, res, next) => {
  const name = req.body.issue.name;
  const issueNumber = req.body.issue.issueNumber;
  const publicationDate = req.body.issue.publicationDate;
  const artistId = req.body.issue.artistId;

  db.get('SELECT * FROM Artist WHERE Artist.id = $artistId',
    {$artistId: artistId},
    (err, artist) => {
      if(err) {
        next(err);
      } else {
        if(!name || !issueNumber || !publicationDate || !artist) {
          return res.sendStatus(400)
        }

        db.run('UPDATE Issue SET name = $name, issue_number = $issueNumber, publication_date = $publicationDate, artist_id = $artistId WHERE Issue.id = $issueId',
        {
          $name: name,
          $issueNumber: issueNumber,
          $publicationDate: publicationDate,
          $artistId: artistId,
          $issueId: req.params.issueId
        },
        (err) => {
          if(err){
            next(err);
          } else {
            db.get(`SELECT * FROM Issue WHERE Issue.id = ${req.params.issueId}`,
            (err, issue) => {
              res.status(200).json({issue: issue});
            });
          }
        });
      }
    });


});

issuesRouter.param('issueId', (req, res, next, issueId) => {
  db.get('SELECT * FROM Issue WHERE id = $issueId',
  {$issueId: issueId},
  (err, issue) => {
    if(err) {
      next(err);
    } else if(issue) {
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

issuesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Issue WHERE Issue.series_id = $seriesId',
  { $seriesId: req.params.seriesId },
  (err, issues) => {
    if(err) {
      next(err);
    } else {
      res.status(200).json({issues: issues});
    }
  });
});

issuesRouter.post('/', (req, res, next) => {
  const name = req.body.issue.name;
  const issueNumber = req.body.issue.issueNumber;
  const publicationDate = req.body.issue.publicationDate;
  const artistId = req.body.issue.artistId;

  if (!name || !issueNumber || !publicationDate || !artistId) {
    return res.sendStatus(400);
  }
  db.serialize(() => {
    db.get('SELECT * FROM Artist WHERE id = $artistId',
    {$artistId: artistId},
    (err, artist) => {
      if(err) {
        next(err);
      } else {
        if(!artist) {
          return res.sendStatus(400);
        }
      }
    });
    db.run('INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)',
    {
      $name: name,
      $issueNumber: issueNumber,
      $publicationDate: publicationDate,
      $artistId: artistId,
      $seriesId: req.params.seriesId
    },
    function(err) {
      if(err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Issue WHERE id = ${this.lastID}`,
        (error, issue) => {
          if(err) {
            next(err);
          } else {
            res.status(201).json({issue: issue});
          }
        });
      }
    });
  });
});

module.exports = issuesRouter;
