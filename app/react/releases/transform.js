const maxLevel = 10;
const transformHierarchy = (structure: Object, level: number = 0, path = []): Array<Object> => {
  if (level > maxLevel) {
    // eslint-disable-next-line no-console
    console.warn('Provided hierarchy object was to deep. Either provide different object or increase "maxLevel" variable');
    return [];
  }
  return Object.keys(structure)
    .map(key => ({
      level,
      label: key,
      path: [...path, key],
      childrenKeys: transformHierarchy(structure[key], level + 1, [...path, key])
    }));
};

export default transformHierarchy;
