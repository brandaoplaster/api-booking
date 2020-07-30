import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    user_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointmentsProviders = this.appointments.filter(
      appointment =>
        appointment.user_id === user_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) + 1 === year,
    );

    return appointmentsProviders;
  }
}

export default AppointmentsRepository;
