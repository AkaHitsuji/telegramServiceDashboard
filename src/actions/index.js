import {GET_PART_SNAPSHOT, GET_ORG_SNAPSHOT, GET_CHAL_SNAPSHOT} from 'actions/types';

export const getParticipantSnapshot = () => {
  return (dipatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('participants').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push(doc.data());
          });
          dipatch({type: GET_PART_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dipatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const getOrganiserSnapshot = () => {
  return (dipatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('organisers').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push(doc.data());
          });
          dipatch({type: GET_ORG_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dipatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};

export const getChallengesSnapshot = () => {
  return (dipatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('challenges').get()
        .then((snapshot) => {
          const documents = [];
          snapshot.forEach((doc) => {
            documents.push(doc.data());
          });
          dipatch({type: GET_CHAL_SNAPSHOT, payload: documents});
        }).catch((err) => {
          console.log(err);
          dipatch({type: 'CREATE_GOAL_ERROR', err});
        });
  };
};
