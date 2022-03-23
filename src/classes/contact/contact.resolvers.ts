import { AuthenticationError } from 'apollo-server-micro';
import { countAll, list } from '@/classes/contact/contact.lib';
import { Contact, ContactAddArgs, ContactModel } from '@/classes/contact/contact.schema';
import { GraphQLContext, Maybe, ResolverFn2 } from '@/lib/types';

type Resolvers<TParent = any, TSchema = Contact> = {
  Query: {
    contact: ResolverFn2<Maybe<TSchema>, TParent, { name: string }>;
    contactCountAll: ResolverFn2<number, TParent>;
    contactList: ResolverFn2<TSchema[], TParent>;
  };
  Mutation: {
    contactAdd: ResolverFn2<Maybe<Contact>, TParent, { contact: ContactAddArgs }>;
  };
};

export const contactResolvers: Resolvers = {
  Query: {
    async contact(_: any, args): Promise<Contact | null> {
      try {
        return null;
      } catch (e) {
        throw new AuthenticationError('');
      }
    },

    async contactCountAll(): Promise<number> {
      return countAll();
    },

    async contactList(
      _: any,
      args: {
        page: number;
        limit: number;
      }
    ): Promise<Contact[]> {
      try {
        return list(args.page, args.limit);
      } catch (e) {
        throw new AuthenticationError('');
      }
    },
  },

  Mutation: {
    async contactAdd(_: any, args, ctx: GraphQLContext): Promise<Contact> {
      const contact = await ContactModel.create({ ...args.contact, ip: ctx.ip });

      return contact;
    },
  },
};
