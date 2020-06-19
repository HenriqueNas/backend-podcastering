import { Router } from 'express';
import usersRouter from './user.routs';
import sessionsRouter from './sessions.routs';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
