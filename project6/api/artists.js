const app = require('express');
const artistsRouter = app.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, artists) => {
    if(err) {
      next(err)
    } else {
      res.status(200).json({artists: artists});
    }
  });
});

artistsRouter.param('artistId', (req, res, next, artistId) => {
  db.get('SELECT * FROM Artist WHERE Artist.id = $artistId', {$artistId: artistId}, (err, artist) => {
    if(err) {
      next(err);
    } else if(artist) {
      req.artist = artist;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

artistsRouter.get('/:artistId', (req, res, next) => {
  res.status(200).json({artist: req.artist});
});

artistsRouter.post('/', (req, res, next) => {
  const name = req.body.artist.name;
  const dateOfBirth = req.body.artist.dateOfBirth;
  const biography = req.body.artist.biography;
  const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

  if (!name || !dateOfBirth || !biography) {
    res.sendStatus(400);
  } else {
    db.run('INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)',
    {
      $name: name,
      $dateOfBirth: dateOfBirth,
      $biography: biography,
      $isCurrentlyEmployed: isCurrentlyEmployed
    },
  function(err){
    if(err) {
      next(err);
    } else {
      db.get('SELECT * FROM Artist WHERE Artist.id = $lastId',
      {
        $lastId: this.lastID
      },
    function(err, artist) {
      res.status(201).json({artist: artist});
    });
    }
    })
  }
});

artistsRouter.put('/:artistId', (req, res, next) => {
  const name = req.body.artist.name;
  const dateOfBirth = req.body.artist.dateOfBirth;
  const biography = req.body.artist.biography;
  const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed

  if (!name || !dateOfBirth || !biography) {
    res.sendStatus(400);
  } else {
    db.run('UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed WHERE Artist.id = $artistId',
  {
    $name: name,
    $dateOfBirth: dateOfBirth,
    $biography: biography,
    $isCurrentlyEmployed: isCurrentlyEmployed,
    $artistId: req.params.artistId
  },
function(err) {
  if(err) {
    next(err);
  } else {
    db.get('SELECT * FROM Artist WHERE Artist.id = $lastId',
  {
    $lastId: req.params.artistId
  },
  function(err, artist) {
    res.status(200).json({artist: artist});
  });
  }
});
  }
});

artistsRouter.delete('/:artistId', (req, res, next) => {
  db.run('UPDATE Artist SET is_currently_employed = 0 WHERE Artist.id = $artistId',
      {
        $artistId: req.params.artistId
      },
    function(err) {
      if(err) {
        next(err);
      } else {
        db.get('SELECT * FROM Artist WHERE Artist.id = $artistId',
        {
          $artistId: req.params.artistId
        },
        function(err, artist) {
          if(err) {
            next(err);
          } else {
            res.status(200).json({artist: artist});
          }
        });
      }
    }
  );
});

module.exports = artistsRouter;
