import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const apppointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const apppointment = {
    id: uuid(),
    provider,
    date,
  };

  apppointments.push(apppointment);

  return response.json({ apppointment });
});

export default appointmentsRouter;
