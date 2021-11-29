import React from 'react';
import backLeft from '../../assets/back-left.jpg';

/**
 * Is displayed as soon as the user joined a room.
 * contains the top-bar, the board and the (bottom right) version info
 */
class Banner extends React.Component {
  componentDidMount() {}
  render () {
  return <div style={{bottom: 0, width: '300px', height: '213px', left: '-10px', position: 'absolute', backgroundImage: `url(${backLeft})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
  </div>;
  }
}

export default Banner;
