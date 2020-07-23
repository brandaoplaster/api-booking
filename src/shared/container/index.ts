import { container } from 'tsyringe';

import IAppointmentsRespostory from '@modules/appoitments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appoitments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IAppointmentsRespostory>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
