import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledUserEstimation,
  StyledUserEstimationExcluded,
  StyledUserEstimationGiven
} from './_styled';

/**
 * The area below the users' avatar, showing either a card "backside" (during estimation)
 * the estimated value of this user (after reveal)
 * or even a invisible placeholder for excluded users
 */
const UserEstimationCard = ({isExcluded, userHasEstimation, revealed, matchingCardConfig}) => {
  const estimationValueToDisplay = userHasEstimation && revealed ? matchingCardConfig.label : '-';

  if (isExcluded) {
    return (
      <StyledUserEstimationExcluded>
        <span>-</span>
      </StyledUserEstimationExcluded>
    );
  }

  if (!userHasEstimation) {
    return (
      <StyledUserEstimation revealed={revealed}>
        <span>{estimationValueToDisplay}</span>
      </StyledUserEstimation>
    );
  }

  return (
    <StyledUserEstimationGiven
      revealed={revealed}
      valueColor={matchingCardConfig.color}
      data-testid={`${revealed ? 'revealed.' : ''}userEstimationGiven.${matchingCardConfig.value}`}
    >
      {estimationValueToDisplay}
    </StyledUserEstimationGiven>
  );
};

UserEstimationCard.propTypes = {
  isExcluded: PropTypes.bool,
  userHasEstimation: PropTypes.bool,
  revealed: PropTypes.bool,
  matchingCardConfig: PropTypes.object
};

export default UserEstimationCard;
