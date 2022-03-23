import { connectMongoDB } from './mongoose';

export interface LoadResult {
  isMongoDBConnected: boolean;
  isLoaded: boolean;
}

let isLoaded = false;
let loadedResult: LoadResult;

export const loadMiddlewares = async (): Promise<LoadResult> => {
  if (isLoaded) return loadedResult;

  const isMongoDBConnected = await connectMongoDB();
  let hasError = false;
  if (!isMongoDBConnected) {
    console.error('MongoDB Connection Error!');
    hasError = true;
  }

  isLoaded = !hasError;

  loadedResult = {
    isMongoDBConnected,
    isLoaded,
  };
  return loadedResult;
};
