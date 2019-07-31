import {GET_SNAPSHOT} from 'actions/types';

export const getSnapshot = (payload) => {
  return {
    type: GET_SNAPSHOT,
    payload
  }
}
