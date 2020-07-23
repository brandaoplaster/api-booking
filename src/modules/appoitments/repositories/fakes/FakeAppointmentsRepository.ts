import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, user_id });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
