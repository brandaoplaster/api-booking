import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
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
    provider_id,
    month,
    day,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepositoy.findAllInDayFromProvider(
      {
        provider_id,
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

    const currentDate = new Date(Date.now());

    const available = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return available;
  }
}

export default ListProciderDayAvailabilityService;
