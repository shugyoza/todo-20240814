import { path } from './url-path';

const env = 'local';
const port = 4200;

export const environment = {
  env,
  production: false,
  url: {
    api: {
      root: `http://localhost:${port}/local`,
      path: path.api,
    }
  }
};
