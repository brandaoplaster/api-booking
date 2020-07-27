import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';
import IAppointmentsRespostory from '@modules/appoitments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appoitments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import IUserTokensRespository from '@modules/users/repositories/IUserTokensRespository';

container.registerSingleton<IAppointmentsRespostory>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRespository>(
  'UserTokenRepository',
  UserTokenRepository,
);
