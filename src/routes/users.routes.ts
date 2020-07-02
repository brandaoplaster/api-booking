import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    return response.json();
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default usersRouter;
