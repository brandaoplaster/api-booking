import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new  appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      user_id: '9876',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.user_id).toBe('9876');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 7, 23, 5);

    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '9876',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '9876',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
