import FakeAppointmentsRepository from '@modules/appoitments/repositories/fakes/FakeAppointmentsRepository';
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

  // it('should not be able to create two appointments on the same time', () => {

  // });
});
