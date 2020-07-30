// import AppError from '@shared/errors/AppError';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsReposioty: FakeAppointmentsRepository;
let listProviderDayAvailable: ListProviderDayAvailabilityService;

describe('ListDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsReposioty = new FakeAppointmentsRepository();
    listProviderDayAvailable = new ListProviderDayAvailabilityService(
      fakeAppointmentsReposioty,
    );
  });

  it('should be able to list the day availability from provider ', async () => {
    await fakeAppointmentsReposioty.create({
      user_id: '12we',
      date: new Date(2020, 7, 30, 8, 0, 0),
    });

    await fakeAppointmentsReposioty.create({
      user_id: '12we',
      date: new Date(2020, 7, 30, 10, 0, 0),
    });

    const availability = listProviderDayAvailable.execute({
      user_id: '12we',
      year: 2020,
      day: 30,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
