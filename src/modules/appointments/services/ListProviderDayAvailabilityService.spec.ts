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
      provider_id: '12we',
      date: new Date(2020, 7, 30, 14, 0, 0),
    });

    await fakeAppointmentsReposioty.create({
      provider_id: '12we',
      date: new Date(2020, 7, 30, 17, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = listProviderDayAvailable.execute({
      provider_id: '12we',
      year: 2020,
      day: 30,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 17, available: false },
      ]),
    );
  });
});
