import { connectField } from 'onion-form';

import TextField from './TextField.react';
import Select from './Select.react';

export const Searchbar = connectField('SearchField')(TextField);
export const SearchSelect = connectField('SearchSelect')(Select);
