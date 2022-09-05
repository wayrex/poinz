import React from 'react';
import gif1 from '../../assets/sidebar/1.gif';
import gif2 from '../../assets/sidebar/2.gif';
import gif3 from '../../assets/sidebar/3.gif';
import gif4 from '../../assets/sidebar/4.gif';
import gif5 from '../../assets/sidebar/5.gif';

/**
 * Is displayed as soon as the user joined a room.
 * contains the top-bar, the board and the (bottom right) version info
 */
class Banner extends React.Component {
  componentDidMount() {}
  render () {
    let gifUrl = '';
    const randomChoice = Math.floor(Math.random() * 5);
    switch (randomChoice) {
      case 0:
        gifUrl = gif1;
        break;
      case 1:
        gifUrl = gif2;
        break;
      case 2:
        gifUrl = gif3;
        break;
      case 3:
        gifUrl = gif4;
        break;
        case 4:
          gifUrl = gif5;
          break;
      default:
        break;
    }
  return <div style={{bottom: 0, width: '300px', height: '213px', left: '-10px', position: 'absolute', backgroundImage: `url(${gifUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
  </div>;
  }
}

export default Banner;
