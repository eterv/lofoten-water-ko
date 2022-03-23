import { Contact, ContactModel } from '@/classes/contact/contact.schema';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export async function countAll(): Promise<number> {
  return ContactModel.countDocuments().exec();
}

export async function findContact({ name }: { name?: string }): Promise<Contact | null> {
  // if (name) return contacts.find((contact) => contact.name === name);
  // if (email) return contacts.find((contact) => contact.email === email);

  return ContactModel.findOne({ name: new RegExp(`${name}`, 'i') }).exec();
}

export async function findContacts({ name }: { name: string }): Promise<Contact[]> {
  return ContactModel.find({ name: new RegExp(`${name}`, 'i') }).exec();
}

export async function list(page: number, limit = 10): Promise<Contact[]> {
  const skipDataLength = (page - 1) * limit;
  const _list = await ContactModel.find()
    .sort({ _id: -1 })
    .skip(skipDataLength)
    .limit(limit)
    .exec();

  for (let i = 0; i < _list.length; i++) {
    // _list[i].dtCreated = dayjs.utc(_list[i].createdAt, '').local().format('YYYY-MM-DD HH:mm:ss');
    _list[i].dtCreated = dayjs.utc(_list[i].createdAt, '').local().valueOf();
  }

  return _list;
}
