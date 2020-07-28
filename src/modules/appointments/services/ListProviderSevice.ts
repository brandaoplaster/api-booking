import { injectable, inject } from 'tsyringe';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/user';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ListProviderService;
