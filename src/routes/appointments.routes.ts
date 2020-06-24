import { Router } from 'express';

const appointmentsRouter = Router();

const apppointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const apppointment = {
    provider,
    date,
  };

  apppointments.push(apppointment);

  return response.json({ apppointment });
});

export default appointmentsRouter;
