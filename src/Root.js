import React from 'react';
import {Provider} from 'react-redux';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {firebaseConfig} from 'config/firebase';
import reducers from 'reducers';

import {createStore, applyMiddleware} from 'redux';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Create store with reducers and initial state
const Root = ({children, initialState = {}}) => {
  const store = createStore(
      reducers,
      initialState,
      composeWithDevTools(
          applyMiddleware(reduxPromise, thunk.withExtraArgument({getFirestore})),
          reduxFirestore(firebase)
      ));

  return <Provider store={store}>{children}</Provider>;
};

export default Root;
