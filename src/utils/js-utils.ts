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

export function removeSelectedFromArray(arr, key, rule) {
  const tmpArray = [];
  try {
    for (let i = 0; i < arr.length; i++) {
      if (rule(arr[i]?.[key])) {
        tmpArray.push(arr[i]);
      }
    }
    return tmpArray;
  } catch (error) {
    console.log(JSON.stringify(error));
    return arr;
  }
}

export const Rules = {
  tokenHolderSize: holderSize => {
    if (Number(holderSize.replace(' addresses', '')) > 100) return true;
    return false;
  },
};
