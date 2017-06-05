const maxLevel = 10;

const findIds = (path, translations) => {
  const key = path.join('.');
  const values = Object.keys(translations).map(k => translations[k]);
  return values.filter(translation => translation.key.indexOf(key) === 0).map(t => t.id);
};

const transformHierarchy = (structure: Object, translations: Object, level: number = 0, path = []): Array<Object> => {
  if (level > maxLevel) {
    // eslint-disable-next-line no-console
    console.warn('Provided hierarchy object was to deep. Either provide different object or increase "maxLevel" variable');
    return [];
  }
  return Object.keys(structure)
    .map(key => ({
      level,
      ids: findIds([...path, key], translations),
      label: key,
      childrenKeys: transformHierarchy(structure[key], translations, level + 1, [...path, key])
    }));
};

export default transformHierarchy;
