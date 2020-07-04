import { getRepository } from 'typeorm';
import UserInfo from '../models/UserInfo';

interface Response {
  users: UserInfo[];
}

class GetUsersInfo {
  public async findAll(): Promise<Response> {
    const usersRepository = getRepository(UserInfo);
    const users = await usersRepository.find({
      select: ['firstName', 'description'],
    });
    return { users };
  }
}

export default GetUsersInfo;
