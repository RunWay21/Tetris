import types from 'root/actions/types';

export function wait(id, number = 0) {
  return {
    type: types.COMMON_LOADER_WAIT,
    id,
    number
  };
}

export function error(id, error, number = 0) {
  return {
    type: types.COMMON_LOADER_ERROR,
    id,
    number,
    error
  };
}

export function ok(id, number = 0) {
  return {
    type: types.COMMON_LOADER_OK,
    id,
    number
  };
}