import * as Joi from 'joi';

export enum CONFIGURATION_KEYS {
  NODE_ENV = 'NODE_ENV',
  DATABASE_URL = 'DATABASE_URL',
  OPENBOOK_API_TOKEN = 'OPENBOOK_API_TOKEN',
}

export const CONFIGURATION_SCHEMA = Joi.object({
  [CONFIGURATION_KEYS.NODE_ENV]: Joi.string()
    .valid('development')
    .default('development'),
  [CONFIGURATION_KEYS.DATABASE_URL]: Joi.string().required(),
  [CONFIGURATION_KEYS.OPENBOOK_API_TOKEN]: Joi.string().required(),
});
