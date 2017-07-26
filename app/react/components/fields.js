import { connectField } from 'onion-form';

import TextField from './TextField.react';

export const Searchbar = connectField('SearchField')(TextField); // eslint-disable-line import/prefer-default-export
