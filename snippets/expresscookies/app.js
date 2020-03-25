const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sessionHandler = require('./sessionHandler');
const apiRouter = require('./apiRouter');
// import session from 'express-session'
// import redis from 'redis'

// const RedisStore = require('connect-redis')(session)

// const redisClient = redis.createClient({
// 	host: process.env.REDIS_HOST,
// 	port: process.env.REDIS_PORT
// })



// The request handler must be the first middleware on the app
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow cors everywhere
app.use(cors());

const cookieOptions = {
	maxAge: 24 * 60 * 60 * 1000,
	secure: process.env.ENVIRONMENT === 'production' ? true : false
};


// This middleware sets a cookie if the user doesn't already have one (or the cookie is expired)
app.use(sessionHandler);

app.use('/api', apiRouter);


// We use the default route to serve our views
app.use('/', express.static('./views'));

const server = app.listen(app.get('port'), () => {
	console.log(
		`Shopping  App is running on port ${app.get('port')}`,
	);
});
