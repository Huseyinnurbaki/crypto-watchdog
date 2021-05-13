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

export function removeEvery(value: string, pattern) {
  return value.replace(`/${pattern}/g`, '');
}

export function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
