/* eslint-disable import/prefer-default-export */
import { lettersAndNumbersAndSpace } from '../lib/validations';

export const searchValidations = {
  searchbar: [lettersAndNumbersAndSpace()]
};
