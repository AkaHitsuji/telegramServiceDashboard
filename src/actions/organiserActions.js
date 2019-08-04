import {GET_ORG_SNAPSHOT} from 'actions/types';

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
