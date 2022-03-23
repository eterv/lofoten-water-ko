export const isEnvDev = (): boolean => process.env.NODE_ENV === 'development';
export const isEnvProd = (): boolean => process.env.NODE_ENV === 'production';

export const isServer = (): boolean => typeof window === 'undefined';
