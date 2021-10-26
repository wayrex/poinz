import React from 'react';

import Board from './Board';
import TopBar from '../TopBar/TopBar';
import RoomFooter from './RoomFooter';
import {StyledRoom} from './_styled';
import web from '../../assets/web.png';

/**
 * Is displayed as soon as the user joined a room.
 * contains the top-bar, the board and the (bottom right) version info
 */
const Room = () => (
  <StyledRoom>
    <TopBar />
    <Board />
    <RoomFooter />
    <img className="profile-photo" src={web} style={{bottom: 0, width: '300px', left: '-10px', position: 'absolute', transform: 'rotate(270deg)'}}/>
  </StyledRoom>
);

export default Room;
