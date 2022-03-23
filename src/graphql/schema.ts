import { gql, makeExecutableSchema, IResolvers } from 'apollo-server-micro';

import { ContactTypeDefs } from '../classes/contact/contact.schema';
import { contactResolvers } from '../classes/contact/contact.resolvers';
import { UserTypeDefs } from '../classes/user/user.schema';
import { userResolvers } from '../classes/user/user.resolvers';

// GraphQL Root TypeDefs
const RootTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [RootTypeDefs, ContactTypeDefs, UserTypeDefs];
const resolvers = [contactResolvers, userResolvers] as IResolvers[];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
