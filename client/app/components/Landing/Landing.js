import React, {useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {L10nContext} from '../../services/l10n';
import {getPendingJoinCommandId} from '../../state/commandTracking/commandTrackingSelectors';
import {getActionLog} from '../../state/actionLog/actionLogSelectors';
import JoinRoomForm from './JoinRoomForm';

import {
  StyledActionLog,
  StyledEyecatcher,
  StyledLandingInner,
  StyledLanding,
  StyledLoadingSpinner
} from './_styled';

/**
 * The "landing" page where the user can enter a room name to join
 */
const Landing = ({waitingForJoin, actionLog}) => {
  const {t} = useContext(L10nContext);
  if (waitingForJoin) {
    return (
      <StyledLanding>
        <StyledLandingInner>
          <Loader t={t} />
        </StyledLandingInner>
      </StyledLanding>
    );
  }

  return (
    <StyledLanding>
      <StyledLandingInner>
        <JoinRoomForm />

        {actionLog && actionLog.length > 0 && (
          <StyledEyecatcher>
            <StyledActionLog>
              {actionLog.map((entry, index) => (
                <li key={`logline_${index}`}>
                  <span>{entry.tstamp}</span>
                  <span>{entry.message}</span>
                </li>
              ))}
            </StyledActionLog>
          </StyledEyecatcher>
        )}
      </StyledLandingInner>
    </StyledLanding>
  );
};

Landing.propTypes = {
  waitingForJoin: PropTypes.bool,
  actionLog: PropTypes.array
};

export default connect((state) => ({
  actionLog: getActionLog(state),
  waitingForJoin: !!getPendingJoinCommandId(state)
}))(Landing);

const Loader = ({t}) => (
  <StyledLoadingSpinner>
    <div>{t('loading')}</div>
    <div className="waiting-spinner"></div>
  </StyledLoadingSpinner>
);

Loader.propTypes = {
  t: PropTypes.func
};
