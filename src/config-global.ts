import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
};

export const CONFIG: ConfigValue = {
  appName: 'نامک',
  appVersion: packageJson.version,
  serverUrl: "http://localhost:8000/api/"
};
