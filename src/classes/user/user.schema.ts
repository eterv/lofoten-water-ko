import { gql } from 'apollo-server-micro';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { model, models, Document, Model, Schema, Query } from 'mongoose';
import { jwtSecret } from '@/config';

/**
 *  Types
 */

export interface User {
  id?: any;
  uid?: string;
  pw?: string;
  name?: string;
  email?: string;
  tel?: string;
  isAdmin?: boolean;

  createdAt?: any;
  updatedAt?: any;
}

export interface JwtUser {
  id: User['id'];
  uid: User['uid'];
  name: User['name'];
  isAdmin: User['isAdmin'];

  iat: number;
  ext: number;
}

export type SignInArgs = {
  uid: User['uid'];
  pw: User['pw'];
};
export type SignInPayload = {
  token: string;
  user: User | null;
};

export type SignUpArgs = {
  uid: User['uid'];
  pw: User['pw'];
  name: User['id'];
  email: User['email'];
};
export type SignUpPayload = SignInPayload;

/**
 *  GraphQL TypeDefs
 */

export const UserTypeDefs = gql`
  type User {
    id: ID!
    uid: String!
    pw: String!
    name: String!
    email: String!
    tel: String
    isAdmin: Boolean!

    createdAt: String
    updatedAt: String
  }

  input SignInInput {
    uid: String!
    pw: String!
  }
  type SignInPayload {
    token: String
    user: User
  }

  input SignUpInput {
    uid: String!
    pw: String!
  }
  type SignUpPayload {
    token: String
    user: User
  }

  extend type Query {
    user(id: ID!): User!
    users: [User]!
    userCurrent: User
    viewer(name: String!): User
    viewers(name: String!): [User]
  }

  extend type Mutation {
    signIn(user: SignInInput): SignInPayload!
    signOut: Boolean
    signUp(user: SignUpInput!): SignUpPayload!
  }
`;

/**
 *  Model Definition (Database)
 */

// Mongoose (MongoDB) Document
export interface UserDocument extends Document, User {
  generateToken(): string;
  matchPassword(pw: string): Promise<boolean>;
  setPassword(pw: string): Promise<void>;
}

interface IUserModel extends Model<UserDocument> {
  findByUid(uid: string): Query<UserDocument | null, UserDocument>;
}

// Mongoose (MongoDB) Schema
export const UserSchema: Schema<UserDocument> = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  pw: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tel: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.generateToken = function (this: UserDocument): string {
  return jwt.sign(
    {
      id: this.id,
      uid: this.uid,
      name: this.name,
      isAdmin: this.isAdmin,
    },
    jwtSecret,
    {
      expiresIn: '6h',
    }
  );
};

UserSchema.methods.matchPassword = async function (pw: string): Promise<boolean> {
  return bcrypt.compare(pw, this.pw as string);
};

UserSchema.methods.setPassword = async function (this: UserDocument, pw: string): Promise<void> {
  this.pw = await bcrypt.hash(pw, 10);
};

UserSchema.statics.findByUid = function (uid: string): Query<UserDocument | null, UserDocument> {
  return this.findOne({ uid });
};

// Mongoose (MongoDB) Model
// @ts-expect-error Because of using static methods
export const UserModel: IUserModel =
  models.User || model<UserDocument, IUserModel>('User', UserSchema as any);
