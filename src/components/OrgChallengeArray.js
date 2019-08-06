import React from 'react';
import {connect} from 'react-redux';

function OrgChallengeArray({challenges, organiserID}) {
  const orgChallenges = [];
  challenges.forEach((chal) => {
    chal.organisers.forEach((org) => {
      if (org.id === organiserID) {
        orgChallenges.push(chal.id);
      }
    });
  });
  console.log(orgChallenges);

  return (
    <p>{orgChallenges.join(', ')}</p>
  );
}

const mapStateToProps = (state) => {
  return {
    challenges: state.snapshot.challenges,
  };
};

export default connect(mapStateToProps, null)(OrgChallengeArray);
