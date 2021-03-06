import {GET_PART_SNAPSHOT, GET_ORG_SNAPSHOT, GET_CHAL_SNAPSHOT} from 'actions/types';
const defaultState = {
  organisers: [],
  participants: [],
  challenges: [],
};

export default function(state = defaultState, action) {
  let obj = {};
  switch (action.type) {
    case GET_PART_SNAPSHOT:
      obj = defaultState;
      obj.participants = action.payload;
      return Object.assign({}, obj);
    case GET_ORG_SNAPSHOT:
      obj = defaultState;
      obj.organisers = action.payload;
      return Object.assign({}, obj);
    case GET_CHAL_SNAPSHOT:
      obj = defaultState;
      obj.challenges = action.payload;
      return Object.assign({}, obj);
    default:
      return state;
  }
}
