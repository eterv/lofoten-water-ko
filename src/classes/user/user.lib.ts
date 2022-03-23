import { User, UserModel } from '@/classes/user/user.schema';
import { getRandomInt } from '@/lib/utils/number';

export async function addUser(data: User): Promise<User> {
  // 아직 미완성
  const n = getRandomInt(10000, 99999);

  data.name = `테스터${n}`;
  data.email = `test${n}@test.com`;

  const user = new UserModel(data);
  await user.setPassword(data.pw as string);
  await user.save();

  return user;
}

export async function findUser({ name }: { name?: string }): Promise<User | null> {
  // if (name) return users.find((user) => user.name === name);
  // if (email) return users.find((user) => user.email === email);

  return UserModel.findOne({ name: new RegExp(`${name}`, 'i') }).exec();
}

export async function findUsers({ name }: { name: string }): Promise<User[]> {
  return UserModel.find({ name: new RegExp(`${name}`, 'i') }).exec();
}
