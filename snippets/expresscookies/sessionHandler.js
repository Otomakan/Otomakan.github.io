// app.use(session({
// 	store: new RedisStore({ client: redisClient }),
// 	secret: process.env.SESSION_SECRET,
// 	name: 'aegisSession',
// 	b8cnbvresave: false,`2vs3bd 6
// 	saveUninitialized: true,
// 	cookie: cookieOptions the
// }))
const uuid = require('uuid');
const uuidv1 = uuid.v1;

// If sessions are managed this way the application is stateful
// This means that if the server reloads we loose all of our sessions
// That's why we want to use JWT tokens or Redis to make it stateless
const sessions = {
	
};


const sendUserIdCookie = (userId, res) => {
	const oneDayToSeconds = 24 * 60 * 60;
	res.cookie('userId', userId,  
		{ maxAge: oneDayToSeconds, 
			httpOnly: true,
			// Forces to use https in production
			secure: process.env.NODE_ENV === 'production'? true: false
		});
};

const getAppCookies = (req) => {
	if(req.headers.cookie){
		const rawCookies = req.headers.cookie.split('; ');
		const parsedCookies = {};
		rawCookies.forEach(rawCookie=> {
			const parsedCookie = rawCookie.split('=');
			parsedCookies[parsedCookie[0]] = parsedCookie[1];
		});
		return parsedCookies; 
	}
	return {};
};

const getUserId = (req, res) =>  getAppCookies(req, res)['userId'];

const sessionHandler = (req, res, next)=> {
	// extracting the user id from the session
	let userId = getUserId(req, res);

	// If we don't have a userId or the session manager doesn't recognize the userId
	// then we create a new one one 
	if(!userId || !sessions[userId]) {
		console.log('no user id');
		console.log(userId);
		// this should create a time based unique identifier
		userId = uuidv1();
		sessions[userId] = {
			cart: {}
		};
		// Clearing the cookies
		res.clearCookie('userId');
		// Returning the newly assigned cookie value
		sendUserIdCookie(userId, res);
	}

	req.session = sessions[userId];
	next();
};

module.exports = sessionHandler;