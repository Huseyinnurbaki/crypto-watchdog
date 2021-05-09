import { MessageColors } from './constants';

export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : o => o[predicate];

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values(),
  ];
};

export function ninEqualRange(rate, range) {
  return rate > range || rate < -range;
}

export function assignColor(value, range) {
  if (value > range) {
    return MessageColors.increased;
  } else if (value < -range) {
    return MessageColors.decreased;
  }
  return MessageColors.default;
}
