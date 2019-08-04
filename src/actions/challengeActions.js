import {GET_CHAL_SNAPSHOT, LOADING_TRUE, LOADING_FALSE} from 'actions/types';

const getOrgFromRef = async (challenges) => {
  console.log('getting org from ref', challenges);

  // get organiser from single reference
  const getOrgRef = async (ref) => {
    const document = await ref.get();
    const data = document.data();
    data['id'] = document.id;
    return data;
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

export const getChallengesSnapshot = async () => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: LOADING_TRUE, payload: 'deleting org from challenge'});
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
            dispatch({type: LOADING_FALSE, payload: 'deleting org from challenge'});
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
      dispatch(getChallengesSnapshot());
    });
  };
};

export const deleteOrgFromChallenge = (challengeId, organiserId) => {
  return (dispatch, getState, {getFirestore}) => {
    dispatch({type: LOADING_TRUE, payload: 'deleting org from challenge'});
    console.log('deleting org from challenge');
    const state = getState();
    const firestore = getFirestore();

    // unpack data
    let challenge = state.snapshot.challenges[challengeId];
    const {id} = challenge;
    let {organisers} = challenge;

    // remove the organiser
    organisers.splice(organiserId, 1);

    // convert organiser to document reference, then put back into firebase
    organisers = organisers.map((org) => {
      const orgRef = firestore.collection('organisers').doc(org.id);
      return orgRef;
    });
    challenge = Object.assign({}, {organisers});
    const ref = firestore.collection('challenges').doc(id);

    // update database
    ref.set(challenge, {merge: true}).then((res) => {
      dispatch(getChallengesSnapshot());
      dispatch({type: LOADING_FALSE});
    });
  };
};
