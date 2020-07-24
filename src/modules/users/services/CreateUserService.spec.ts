import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new  user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      name: 'Joe',
      email: 'joe@gmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    await createUserService.execute({
      name: 'Joe 2',
      email: 'joe2@gmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Joe',
        email: 'joe2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
