import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    return response.json({ ok: true });
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default sessionsRouter;
