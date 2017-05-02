import { LocaleType } from '../locales/types';

export type ProjectType = {
  defaultLocaleId: number,
  id: number,
  locales: Array<LocaleType>,
  name: string,
}
