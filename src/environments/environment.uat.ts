import { path } from './url-path';

const env = 'uat';

export const environment = {
  env,
  production: false,
  url: {
    api: {
      root: `https://${env}.root.url/api`,
      path: path.api
    }
  }
};
