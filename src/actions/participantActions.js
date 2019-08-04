import {GET_PART_SNAPSHOT} from 'actions/types';

export const getParticipantSnapshot = async () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('participants').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            const dat = doc.data();
            dat['id'] = doc.id;
            documents.push(dat);
          });
          dispatch({type: GET_PART_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dispatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};
