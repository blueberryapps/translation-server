export const patternletters = /^[a-zA-Z]+$/;
export const patternlettersSpace = /^[a-zA-Z\s]+$/;
export const patternlettersNumbersSpace = /^[a-zA-Z0-9\s]+$/;

export const ERROR_LETTERS = 'letters_only';
export const ERROR_LETTERS_SPACE = 'letters_and_space_only';
export const ERROR_LETTERS_NUMBERS_SPACE = 'letters_and_numbers_and_space_only';

function createValidator(pattern, error) {
  return (value) => {
    if (value && !pattern.match(value)) return error;

    return null;
  };
}

export function letters() {
  return createValidator(patternletters, ERROR_LETTERS);
}

export function lettersAndSpace() {
  return createValidator(patternlettersSpace, ERROR_LETTERS_SPACE);
}

export function lettersAndNumbersAndSpace() {
  return createValidator(patternlettersNumbersSpace, ERROR_LETTERS_NUMBERS_SPACE);
}
