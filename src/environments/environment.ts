import { path } from './url-path';

const env = 'production';

export const environment = {
  env,
  production: true,
  url: {
    api: {
      root: `https://${env}.root.url/api`,
      path: path.api,
    },
  },
};
