import * as Joi from 'joi';

export enum CONFIGURATION_KEYS {
  NODE_ENV = 'NODE_ENV',
  DATABASE_URL = 'DATABASE_URL',
}

export const CONFIGURATION_SCHEMA = Joi.object({
  [CONFIGURATION_KEYS.NODE_ENV]: Joi.string()
    .valid('development')
    .default('development'),
  [CONFIGURATION_KEYS.DATABASE_URL]: Joi.string().required(),
});
