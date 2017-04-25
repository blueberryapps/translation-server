import { TranslationType } from '../translations/types';

export type KeyType = {
  id: number,
  key: string,
  note?: string,
  dataType: string,
  translations: Array<TranslationType>
};
