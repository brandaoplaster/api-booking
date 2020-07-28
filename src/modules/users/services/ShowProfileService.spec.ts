import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joe',
      email: 'joe@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });
    expect(profile.name).toBe('Joe');
    expect(profile.email).toBe('joe@gmail.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-id-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
