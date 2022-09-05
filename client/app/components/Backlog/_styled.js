import styled from 'styled-components';

import {
  COLOR_BACKGROUND_SECONDARY,
  COLOR_LIGHT_GREY,
  COLOR_LIGHTER_GREY,
  COLOR_ORANGE,
  COLOR_WARNING
} from '../colors';
import {LEFT_MENU_WIDTH, device} from '../dimensions';

export const StyledBacklog = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 0 0 0;
  background: ${COLOR_BACKGROUND_SECONDARY};
  flex-shrink: 0;

  display: ${({shown}) => (shown ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  @media ${device.desktop} {
    display: flex;
    width: ${LEFT_MENU_WIDTH}px;
  }

  &:after {
    content: '';
    @media ${device.desktop} {
      border-right: 1px solid ${COLOR_LIGHTER_GREY};
    }
    top: 8px;
    right: 0;
    position: absolute;
    bottom: 8px;
  }
`;

export const StyledStories = styled.div`
  margin: 16px 8px 0 0;
`;

export const StyledEditForm = styled.form`
  background: #fff;
  box-sizing: border-box;
  border-radius: 2px;

  input,
  textarea {
    resize: vertical;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${COLOR_LIGHTER_GREY};
  }

  textarea {
    min-height: 64px;
  }
`;

export const StyledEditFormButtonGroup = styled.div`
  > div {
    padding: 0 4px;
    box-sizing: border-box;
  }
`;

export const StyledAddForm = styled(StyledEditForm)`
  margin: 0 8px;
  padding: 8px 16px 16px 16px;
  border: 1px solid ${COLOR_LIGHTER_GREY};
`;

export const StyledBacklogInfoText = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const StyledBacklogActive = styled.div`
  margin: 16px 0 0 8px;
  outline: none;
  border: none;
  overflow-y: auto;
  flex-grow: 1;
`;

export const StyledBacklogTrash = styled.div`
  margin-left: 8px;
  overflow-y: auto;
`;

const dzOverlayAcceptBorder = '4px dashed rgba(0, 153, 204, 0.25)';
const dzOverlayAcceptBg = 'rgba(0, 153, 204, 0.02)';
const dzOverlayRejectBorder = '4px dashed rgba(255, 130, 10, 0.3)';
const dzOverlayRejectBg = 'rgba(255, 130, 10, 0.06)';

export const StyledFileImportDropZoneOverlay = styled.div`
  display: ${({active}) => (active ? 'block' : 'none')};
  position: absolute;
  left: 0;
  right: 0;
  top: 33px;
  height: calc(100% - 51px);
  margin: 4px;
  font-size: 62px;
  color: rgba(0, 153, 204, 0.25);
  z-index: ${({active}) => (active ? 1000 : 0)};

  border: ${({active, isAccept, isReject}) =>
    active && isAccept
      ? dzOverlayAcceptBorder
      : active && isReject
      ? dzOverlayRejectBorder
      : 'none'};
  background: ${({active, isAccept, isReject}) =>
    active && isAccept
      ? dzOverlayAcceptBg
      : active && isReject
      ? dzOverlayRejectBg
      : 'transparent'};
`;

export const StyledStory = styled.div`
  position: relative;
  background: white;
  padding: 8px 16px 16px 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid ${COLOR_LIGHTER_GREY};
  cursor: pointer;
  border-left: ${({selected}) =>
    selected ? '2px solid ' + COLOR_ORANGE : '1px solid ' + COLOR_LIGHTER_GREY};

  &:hover {
    box-shadow: ${({noShadow}) =>
      noShadow ? 'none' : 'inset 0 82px 50px -60px rgba(194, 194, 194, 0.45)'};
  }
`;

export const StyledStoryToolbar = styled.div`
  display: flex;
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: 18px;

  > i {
    margin: 0 4px;
    opacity: 0;
    display: block;
    padding: 6px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
  }

  /* My parent "StoryWrapper" gets hovered. my child "i" gets additional styles ... neat! */

  ${StyledStory}:hover & i {
    opacity: 0.6;
    background: white;
    border-radius: 50%;

    &:hover {
      opacity: 1;

      &.story-delete {
        color: ${COLOR_WARNING};
      }
    }
  }
`;

export const StyledStoryText = styled.div`
  overflow-x: hidden;
  white-space: pre-wrap;
`;

export const StyledHighlightButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
`;

export const StyledStoryAttributes = styled.div`
  > span {
    color: ${COLOR_LIGHT_GREY};
    font-size: 12px;
  }
`;

export const StyledBacklogSortForm = styled.form`
  padding: 8px 8px 8px 8px;
  margin-right: 8px;
  border-bottom: 1px solid ${COLOR_LIGHTER_GREY};
  position: relative;

  display: flex;
  justify-content: flex-end;

  > input[type='text'],
  input[type='text']:focus {
    flex-grow: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
  }

  > i {
    margin-left: 4px;
    transform: rotate(90deg);
  }
`;

export const StyledSortDropdownItem = styled.div`
  color: ${({selected}) => (selected ? COLOR_LIGHTER_GREY : 'inherit')};
`;
