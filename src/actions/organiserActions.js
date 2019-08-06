import {GET_ORG_SNAPSHOT, LOADING_TRUE, LOADING_FALSE} from 'actions/types';
import {getChallengesSnapshot} from './challengeActions';

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

export const addOrganiser = (name, orgId, location='') => {
  return (dispatch, getState, {getFirestore}) => {
    console.log('adding organiser');
    dispatch({type: LOADING_TRUE, payload: 'Adding an organiser into the system'});
    const firestore = getFirestore();
    const orgRef = firestore.collection('organisers').doc(orgId);
    const data = {name, location, chatID: ''};
    orgRef.set(data, {merge: true}).then((res) => {
      dispatch({type: LOADING_FALSE});
      dispatch(getOrganiserSnapshot());
    });
  };
};

export const deleteOrganiser = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    dispatch({type: LOADING_TRUE, payload: 'Removing organiser from the system'});
    const orgRef = firestore.collection('organisers').doc(id);
    removeOrgFromDb(orgRef).then((res) => {
      dispatch(getOrganiserSnapshot());
      dispatch({type: LOADING_TRUE, payload: 'Removing organiser from the challenges'});

      // check all organiser reference in challenges, remove them.
      console.log('checking org ref');
      const state = getState();
      let {challenges} = state.snapshot;

      challenges = challenges.filter((chal) => {
        const organisers = chal.organisers.map((org) => {
          return org.id;
        });
        return organisers.includes(id);
      });
      console.log(challenges);

      const sendChallenges = async () => {
        return await Promise.all(challenges.map((chal) => challengeUpdate(chal, id, firestore)));
      };

      sendChallenges().then((res) => {
        dispatch({type: LOADING_FALSE});
        dispatch(getChallengesSnapshot());
      });
    });
  };
};

const challengeUpdate = async (chal, id, firestore) => {
  const resOrganisers = [];
  chal.organisers.forEach((org) => {
    if (org.id !== id) {
      resOrganisers.push(firestore.collection('organisers').doc(org.id));
    }
  });
  return await firestore.collection('challenges').doc(chal.id).set({organisers: resOrganisers}, {merge: true});
};

const removeOrgFromDb = async (ref) => {
  const data = await ref.get();
  if (data.exists) {
    return await ref.delete();
  }
};
