import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import GetUsersInfo from '../services/GetUsersInfo';

const usersRouter = Router();
const upload = multer(uploadConfig);

/**
 * Create new user
 *
 * @returns new User without password
 */
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.run({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

/**
 * Get all users info
 *
 * @returns list of User
 */
usersRouter.get('/', async (request, response) => {
  return response.json(await new GetUsersInfo().findAll());
});

/**
 * Update profile avatar
 */
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.run({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json({ user });
  },
);

export default usersRouter;
