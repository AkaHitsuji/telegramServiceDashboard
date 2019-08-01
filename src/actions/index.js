import {GET_PART_SNAPSHOT, GET_ORG_SNAPSHOT, GET_CHAL_SNAPSHOT} from 'actions/types';

export const getParticipantSnapshot = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('participants').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push(doc.data());
          });
          dispatch({type: GET_PART_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dispatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const getOrganiserSnapshot = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('organisers').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push(doc.data());
          });
          dispatch({type: GET_ORG_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dispatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const getChallengesSnapshot = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('challenges').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            const dat = doc.data();
            dat['id'] = doc.id;
            documents.push(dat);
          });
          dispatch({type: GET_CHAL_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dispatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const updateChallenges = (docs) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log('updating challenges');
    const state = getState();
    const challenges = state.snapshot.challenges;
    const challengeNames = challenges.map((chal) => {
      return chal.id;
    });
    const firestore = getFirestore();
    const updateChallenges = async () => {
      await docs.forEach((doc) => {
        doc['organisers'] = [];
        if (!challengeNames.includes(doc.name)) {
          firestore.collection('challenges').doc(doc.name).set(doc);
        }
      });
    };

    updateChallenges().then(() => {
      dispatch(getOrganiserSnapshot());
    });
  };
};
