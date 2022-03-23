import { connect } from 'mongoose';

let isConnect = 0;

// TODO 정말 문제 없는지 추후 확인하기 테스트

export const connectMongoDB = async (): Promise<boolean> => {
  if (isConnect) return true;

  const uri: string = process.env.MONGO_URI || '';

  try {
    const db = await connect(uri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnect = db.connection.readyState;
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};
