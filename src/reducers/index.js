import {firestoreReducer} from 'redux-firestore';
import snapshot from 'reducers/snapshot';
import {combineReducers} from 'redux';

export default combineReducers({
  snapshot: snapshot,
  firebase: firestoreReducer,
});
