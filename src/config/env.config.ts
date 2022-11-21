import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

interface ENV {
  BOT_TOKEN: string | undefined;
  DATABASE_URL: string | undefined;
}

interface Config {
  BOT_TOKEN: string;
  DATABASE_URL: string;
}

const getConfig = (): ENV => {
  return {
    BOT_TOKEN: process.env['BOT_TOKEN'],
    DATABASE_URL: process.env['DATABASE_URL'],
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const { BOT_TOKEN } = getSanitzedConfig(config);

export { BOT_TOKEN };
