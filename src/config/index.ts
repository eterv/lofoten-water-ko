/**
 * Your favorite port
 */
export const port = parseInt(process.env.PORT as string, 10);

/**
 * Database connection string
 */
export const databaseUri = process.env.MONGO_URI as string;

/**
 * Your secret sauce
 */
export const jwtSecret = process.env.JWT_SECRET as string;

/**
 * Used by winston logger
 */
export const logs = {
  level: process.env.LOG_LEVEL || 'silly',
};

export const navList = [
  { name: 'products', href: '/products', text: 'Our Products' },
  { name: 'source', href: '/source', text: 'The Source' },
  { name: 'about', href: '/about', text: 'About us' },
  { name: 'sustainability', href: '/sustainability', text: 'Sustainability' },
  { name: 'contact', href: '/contact', text: 'Contact us' },
  { name: 'privacy', href: '/privacy', text: 'Privacy' },
  // { name: 'shop', href: '/shop', text: 'Shop' },
];

/**
 * API configs
 */
export const api = {
  prefix: '/api',
};

export default {
  port,
  databaseUri,
  jwtSecret,
  logs,
  api,
};
