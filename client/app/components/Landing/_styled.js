import styled from 'styled-components';
// import backgroundImage from '../../assets/landing_bg_z2020_wayrex.gif';
import {COLOR_FONT_GREY, COLOR_ORANGE} from '../colors';
import {device} from '../dimensions';

export const StyledLanding = styled.div`
`;

export const StyledLandingInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-top: 5%;

  @media ${device.desktop} {
    margin-top: 20%;
  }
`;

export const StyledActionLog = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    padding: 4px;
    margin-bottom: 8px;
    box-sizing: border-box;

    > span {
      display: block;
    }

    > span:first-child {
      font-size: 12px;
    }
  }
`;

export const StyledChangelog = styled.div`
  ul {
    margin: 0;
    margin-bottom: 22px;
    padding: 0;
    list-style-type: none;

    h1 {
      margin: 0;
      margin-bottom: 4px;
      font-size: 16px;
    }

    li {
      margin: 0;
      padding: 0;
    }

    ul {
      margin-left: 22px;
      list-style-type: square;

      li {
        margin-bottom: 4px;
      }
    }
  }
`;

export const StyledInfoText = styled.div`
  display: flex;
  align-items: center;

  i {
    font-size: ${({small}) => (small ? '20px' : '30px')};
    margin-right: 16px;
  }
`;

export const StyledEyecatcher = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  max-width: 85%;
  background: rgba(0, 0, 0, 0.5);
  color: #f99955;
  padding: 18px 32px 32px 32px;
  border-radius: 2px;
  margin: 12px auto 0 auto;
  font-family: 'trajan';F
  input {
    color: ${COLOR_FONT_GREY};
  }

  &.disclaimer-text {
    font-size: 13px;
  }
`;

export const StyledLoadingSpinner = styled(StyledEyecatcher)`
  font-size: larger;

  > div {
    min-height: 32px;
  }
`;

const StyledLandingButton = styled.button`
  background-color: ${COLOR_ORANGE} !important;
  font-weight: bold;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.56);
  max-width: 350px;
  overflow: hidden;
`;
export const StyledLandingDoubleButtonWrapper = styled.div`
  margin-bottom: 12px;
`;

export const StyledLandingDoubleButtonL = styled(StyledLandingButton)`
  border-radius: 2px 0 0 2px;
`;
export const StyledLandingDoubleButtonR = styled(StyledLandingButton)`
  border-radius: 0 2px 2px 0;
`;

export const StyledLandingForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  input[type='text'],
  input[type='text']:focus,
  input[type='text']:active,
  input[type='password'],
  input[type='password']:focus,
  input[type='password']:active {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    box-shadow: none;
    border-bottom: 1px solid white;
    color: white;

    margin-bottom: 12px;

    &::placeholder {
      color: white;
      opacity: 0.7;
    }
  }
`;

export const StyledGithubRibbon = styled.a`
  position: fixed;
  top: 0;
  right: 0;
  border: 0;

  > img {
    border: none;
    outline: none;
  }
`;
