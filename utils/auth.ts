
const jwt = require('jsonwebtoken');

 export class Auth{
     constructor(){}
      getTokenFromHeader(req:any) {
	if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
		|| (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
		return req.headers.authorization.split(' ')[1];
	}
      
	return null;}
}

