import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUerService', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'joe',
      email: 'joe@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'joe@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
  });
});
