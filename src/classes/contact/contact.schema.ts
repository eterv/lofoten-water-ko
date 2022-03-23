import { gql } from 'apollo-server-micro';
import { model, models, Document, Model, Schema } from 'mongoose';

/**
 *  Types
 */

export interface Contact {
  id?: any;
  name?: string;
  email?: string;
  tel?: string;
  ip?: string;
  dtCreated?: number;
  createdAt?: any;
  updatedAt?: any;
}

export type ContactAddArgs = {
  name: Contact['id'];
  email: Contact['email'];
  tel: Contact['tel'];
  // user: User;
};
export type ContactAddPayload = {
  contactAdd: Contact;
};

/**
 *  GraphQL TypeDefs
 */

export const ContactTypeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    email: String
    tel: String
    ip: String
    dtCreated: Float
    createdAt: String
    updatedAt: String
  }

  input ContactAddInput {
    name: String!
    email: String!
    tel: String!
  }

  extend type Query {
    contact(id: ID!): Contact!
    contactCountAll: Int!
    contactList(page: Int!, limit: Int!): [Contact]!
    contactFindOne(name: String!): Contact
    contactFind(name: String!): [Contact]
  }

  extend type Mutation {
    contactAdd(contact: ContactAddInput!): Contact!
  }
`;

/**
 *  Model Definition (Database)
 */

// Mongoose (MongoDB) Document
export interface ContactDocument extends Document, Contact {}

// Mongoose (MongoDB) Schema
export const ContactSchema: Schema<ContactDocument> = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    email: {
      type: String,
    },
    tel: String,
    ip: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

// Mongoose (MongoDB) Model
export const ContactModel: Model<ContactDocument> =
  models.Contact || model<ContactDocument>('Contact', ContactSchema);
