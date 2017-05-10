import { schema } from 'normalizr';

const translation = new schema.Entity('translations');
const locale = new schema.Entity('locales');
const key = new schema.Entity('keys', {
  translations: [translation]
});
const project = new schema.Entity('projects', {
  locales: [locale],
});

export const translationSchema = translation;
export const keySchema = key;
export const localeSchema = locale;
export const projectSchema = project;
