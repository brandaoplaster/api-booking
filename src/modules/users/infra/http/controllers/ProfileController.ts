import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    delete user.password;
    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    // show profile
  }
}
