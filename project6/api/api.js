const app = require('express');
const apiRouter = app.Router();
const artistsRouter = require('./artists.js');
const seriesRouter = require('./series.js');

apiRouter.use('/artists', artistsRouter);
apiRouter.use('/series', seriesRouter);


module.exports = apiRouter;
