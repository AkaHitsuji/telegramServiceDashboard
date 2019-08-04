import {GET_ORG_SNAPSHOT, LOADING_TRUE, LOADING_FALSE} from 'actions/types';

export const getOrganiserSnapshot = async () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('organisers').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            const dat = doc.data();
            dat['id'] = doc.id;
            documents.push(dat);
          });
          dispatch({type: GET_ORG_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dispatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const addOrganiser = (orgId, name) => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: LOADING_TRUE, payload: 'Adding an organiser into the system'});
    const firestore = getFirestore();
    const orgRef = firestore.collection('organisers').doc(orgId);
    const data = {name, chatID: ''};
    orgRef.set(data, {merge: true}).then((res) => {
      dispatch({type: LOADING_FALSE});
      dispatch(getOrganiserSnapshot);
    });
  };
};
