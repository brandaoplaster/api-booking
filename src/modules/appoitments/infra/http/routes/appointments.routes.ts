import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appoitments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { user_id, date } = request.body;

  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    user_id,
    date: parsedDate,
  });

  return response.json({ appointment });
});

export default appointmentsRouter;
