import {GET_PART_SNAPSHOT, LOADING_TRUE, LOADING_FALSE} from 'actions/types';

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

export const addParticipants = (name, tgName, team) => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: LOADING_TRUE, payload: 'Adding participant to database.'});
    const firestore = getFirestore();
    const dataObj = {name, team, chatID: ''};
    firestore.collection('participants').doc(tgName).set(dataObj, {merge: true}).then((res) => {
      dispatch(getParticipantSnapshot());
      dispatch({type: LOADING_FALSE});
    });
  };
};

export const deleteParticipant = (partName) => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: LOADING_TRUE, payload: 'Deleting participant.'});
    const firestore = getFirestore();
    const partRef = firestore.collection('participants').doc(partName);
    partRef.get().then((res) => {
      if (res.exists) {
        partRef.delete();
        dispatch(getParticipantSnapshot());
        dispatch({type: LOADING_FALSE});
      } else {
        dispatch({type: LOADING_FALSE});
      }
    }).catch((err) => {
      dispatch({type: LOADING_FALSE});
    });
  };
};
