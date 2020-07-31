import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new  appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '9876',
      user_id: '1',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('9876');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 23, 5);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '9876',
      user_id: '1',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '9876',
        user_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
