import {AUTHENTICATED_TRUE, AUTHENTICATED_FALSE, LOGIN_FAIL, LOADING_TRUE, LOADING_FALSE} from 'actions/types';

export const performAuthentication = (user='', pass='') => {
  if (user.length === 0 || pass.length === 0) {
    return {type: LOGIN_FAIL, payload: 'Blank inputs!'};
  } else {
    return (dispatch, getState, {getFirestore}) => {
      dispatch({type: LOADING_TRUE, payload: 'Logging in'});
      const firestore = getFirestore();
      getUser(firestore, user).then((res) => {
        if (res) {
          checkPassword(firestore, pass).then((auth) => {
            if (auth) {
              dispatch({type: AUTHENTICATED_TRUE});
              dispatch({type: LOADING_FALSE});
            } else {
              dispatch({type: AUTHENTICATED_FALSE});
              dispatch({type: LOADING_FALSE});
              dispatch({type: LOGIN_FAIL, payload: 'Authentication failed. Wrong password.'});
            }
          });
        } else {
          dispatch({type: LOADING_FALSE});
          dispatch({type: LOGIN_FAIL, payload: 'User does not exist.'});
        }
      });
    };
  }
};

export const signOut = () => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: AUTHENTICATED_FALSE});
  };
};

const getUser = async (firestore, username) => {
  const result = await firestore.collection('organisers').doc(username).get();
  return result.exists;
};

const checkPassword = async (firestore, pass) => {
  const authRef = firestore.collection('metadata').doc('security');
  const result = await authRef.get();
  const password = result.data();
  return password.password === pass;
};
