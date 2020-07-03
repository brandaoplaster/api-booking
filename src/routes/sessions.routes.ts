import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const userAuthenticate = new AuthenticateUserService();

    const { user } = await userAuthenticate.execute({
      email,
      password,
    });

    return response.json({ user });
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default sessionsRouter;
