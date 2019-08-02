import {GET_PART_SNAPSHOT, GET_ORG_SNAPSHOT, GET_CHAL_SNAPSHOT, GET_ORG_FROM_REF, DELETE_ORG_IN_CHAL} from 'actions/types';

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
          console.log(documents);
          getOrgFromRef(documents).then((dat) => {
            console.log(dat);
            dispatch({type: GET_CHAL_SNAPSHOT, payload: dat});
          });
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

export const getOrgFromRef = async (challenges) => {
  console.log('getting org from ref', challenges);

  // get organiser from single reference
  const getOrgRef = async (ref) => {
    const document = await ref.get();
    return document.data();
  };

  // get all organisers from array of references
  const getOrganisers = async (challenge) => {
    console.log(challenge.organisers);
    const org = await Promise.all(challenge.organisers.map((ref) => getOrgRef(ref)));
    challenge.organisers = org;
    return challenge;
  };

  // get all updated challenges
  const getChallenges = async () => {
    return await Promise.all(challenges.map((chal) => getOrganisers(chal)));
  };

  return await getChallenges();
};

export const deleteOrgFromChallenge = (challengeId, organiserId) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log('deleting org from challenge');
    const state = getState();
    const firestore = getFirestore();

    let challenge = state.snapshot.challenges[challengeId];
    const {id, organisers} = challenge;

    // remove the organiser
    console.log(organisers);
    organisers.splice(organiserId, 1);
    console.log(organisers);
    challenge = Object.assign({}, {organisers});
    const ref = firestore.collection('challenges').doc(id);

    // update database
    ref.set(challenge, {merge: true}).then((res) => {
      dispatch(getOrganiserSnapshot());
    });
  };
};
