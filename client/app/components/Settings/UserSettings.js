import React, {useState, useContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ValidatedInput from '../common/ValidatedInput';
import {EMAIL_REGEX, USERNAME_REGEX} from '../frontendInputValidation';
import avatarIcons from '../../assets/avatars';
import {getOwnUser} from '../../state/users/usersSelectors';
import {toggleExcluded, setUsername, setEmail, setAvatar} from '../../state/actions/commandActions';
import {L10nContext} from '../../services/l10n';

import {
  StyledArea,
  StyledAvatarGrid,
  StyledMiniAvatar,
  StyledSection,
  StyledTextInput
} from './_styled';

const UserSettings = ({user, setUsername, setEmail, setAvatar, toggleExcluded}) => {
  const {t} = useContext(L10nContext);
  const {username, email, excluded} = user;

  // derive username for input field from prop
  const [myUsername, setMyUsername] = useState(username || '');
  React.useEffect(() => {
    setMyUsername(user.username || '');
  }, [user.username]);

  // derive email for input field from prop
  const [myEmail, setMyEmail] = useState(email || '');
  React.useEffect(() => {
    setMyEmail(user.email || '');
  }, [user.email]);

  return (
    <StyledArea>
      <h4>{t('user')}</h4>

      <StyledSection>
        <h5>{t('username')}</h5>

        <StyledTextInput>
          <ValidatedInput
            data-testid="usernameInput"
            type="text"
            id="username"
            placeholder={t('name')}
            fieldValue={myUsername}
            setFieldValue={setMyUsername}
            regexPattern={USERNAME_REGEX}
            onEnter={saveUsername}
          />

          <button
            data-testid="saveUsernameButton"
            className="pure-button pure-button-primary"
            onClick={saveUsername}
          >
            <i className="icon-floppy" />
          </button>
        </StyledTextInput>
      </StyledSection>

      <StyledSection>
        <h5>{t('avatar')}</h5>
        {t('avatarInfo')}

        <StyledAvatarGrid data-testid="avatarGrid">
          {avatarIcons.map((aIcn, index) => (
            <StyledMiniAvatar
              selected={user.avatar === index}
              src={aIcn}
              key={'aIcn_' + aIcn + index}
              onClick={() => setAvatar(index)}
            />
          ))}
        </StyledAvatarGrid>

        {t('gravatarInfo')}

        <StyledTextInput>
          <ValidatedInput
            data-testid="gravatarEmailInput"
            type="text"
            id="email"
            placeholder="Email..."
            fieldValue={myEmail}
            setFieldValue={setMyEmail}
            regexPattern={EMAIL_REGEX}
            onEnter={saveEmail}
          />

          <button
            className="pure-button pure-button-primary"
            onClick={saveEmail}
            data-testid="saveEmailButton"
          >
            <i className="icon-floppy" />
          </button>
        </StyledTextInput>
      </StyledSection>

      <StyledSection>
        <h5>{t('markExcluded')}</h5>
        {t('excludedInfo')}

        <p onClick={toggleExcluded} className="clickable" data-testid="excludedToggle">
          <i className={excluded ? 'icon-check' : 'icon-check-empty'}></i> {t('excluded')}
        </p>
      </StyledSection>
    </StyledArea>
  );

  function saveUsername() {
    if (myUsername && myUsername.length) {
      setUsername(myUsername);
    }
  }

  function saveEmail() {
    setEmail(myEmail);
  }
};

UserSettings.propTypes = {
  user: PropTypes.object,
  toggleExcluded: PropTypes.func,
  setUsername: PropTypes.func,
  setEmail: PropTypes.func,
  setAvatar: PropTypes.func
};

export default connect(
  (state) => ({
    user: getOwnUser(state)
  }),
  {
    toggleExcluded,
    setUsername,
    setEmail,
    setAvatar
  }
)(UserSettings);
