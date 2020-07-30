// import AppError from '@shared/errors/AppError';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsReposioty: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsReposioty = new FakeAppointmentsRepository();
    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppointmentsReposioty,
    );
  });

  it('should be able to list the month availability from provider ', async () => {
    await fakeAppointmentsReposioty.create({
      user_id: '12we',
      date: new Date(2020, 7, 29, 5, 0, 0),
    });

    await fakeAppointmentsReposioty.create({
      user_id: '12we',
      date: new Date(2020, 7, 29, 4, 0, 0),
    });

    await fakeAppointmentsReposioty.create({
      user_id: '12we',
      date: new Date(2020, 7, 30, 5, 0, 0),
    });

    const availability = listMonthAvailability.execute({
      user_id: '12we',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: false },
        { day: 29, available: true },
        { day: 30, available: true },
        { day: 31, available: false },
      ]),
    );
  });
});
