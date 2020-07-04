import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UserAccess from '../models/UserAccess';
import UserInfo from '../models/UserInfo';
import AppError from '../errors/AppError';

/**
 * Interface to request run
 */
interface Request {
  name: string;
  email: string;
  password: string;
}

/**
 * Define all methods to creat
 * new User in database
 */
class CreateUserService {
  /**
   * Create new User
   *
   * @param   Request interface to request run
   * @returns Promise<User> created user
   */
  public async run({ name, email, password }: Request): Promise<UserAccess> {
    const usersAccessRepository = getRepository(UserAccess);
    const usersInfoRepository = getRepository(UserInfo);

    const checkUser = await usersAccessRepository.findOne({
      where: { email },
    });

    if (checkUser) {
      throw new AppError('Email adderess already used.');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersAccessRepository.create({
      email,
      password: hashedPassword,
    });

    await usersAccessRepository.save(user);

    const info = usersInfoRepository.create({
      userAccessId: user.userId,
      firstName: name,
    });

    await usersInfoRepository.save(info);

    return user;
  }
}

export default CreateUserService;
