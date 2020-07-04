import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/user';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar!');
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarExists = await fs.promises.stat(userAvatarPath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarPath);
      }

      user.avatar = avatarFilename;

      await usersRepository.save(user);
    }
    delete user.password;

    return user;
  }
}

export default UpdateUserAvatarService;
