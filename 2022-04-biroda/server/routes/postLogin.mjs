import jwt from 'jsonwebtoken';
import { config } from '../modules/config.mjs';
import { dao } from '../modules/dao.mjs';

// write samples users if we have no dummy db at all
dao.initResource('users', [
  { id: 1, username: 'demo', password: 'demo' },
  { id: 2, username: 'username', password: 'password' },
]);

export const routePostLogin = (req, res, next) => {
  const { username, password } = req.body;
  let foundUsers = dao.getUsers({ username, password });
  const match = foundUsers.length === 1 ? foundUsers[0] : null;
  if (!match) {
    res.status(401).send({ error: 'Authentication failed.' });
    return next();
  }
  // if I created a session id, then I'd store that in the "db" (and use header[session-id] for
  // transportation, or a httpOnly cookie), but with jwt we can validate the token without the db
  const token = jwt.sign({ username }, config.app.jwtSecret, { expiresIn: '2h' });
  res.send({ token });
};
