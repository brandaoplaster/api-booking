import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  user_id: string;
  month: number;
  day: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProciderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepositoy: IAppointmentsRepository,
  ) {}

  public async execute({
    user_id,
    month,
    day,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepositoy.findAllInDayFromProvider(
      {
        user_id,
        month,
        day,
        year,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const available = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    return available;
  }
}

export default ListProciderDayAvailabilityService;
