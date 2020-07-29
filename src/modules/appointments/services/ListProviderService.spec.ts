import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositories';
import ListProviderSevice from './ListProviderSevice';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderSevice;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProviderSevice(fakeUsersRepository);
  });

  it('should be able to list the providers ', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joe 1',
      email: 'joe1@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joe 2',
      email: 'joe2@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Joe',
      email: 'joe@gmail.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
