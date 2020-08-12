import React from 'react';
import Tilt from 'react-tilt';
import  galaxy from '/Users/pranavharsh/Desktop/face-detect-url-master/src/components/Logo/ galaxy.png'
import '/Users/pranavharsh/Desktop/face-detect-url-master/src/components/Logo/Logo.css';

const Logo = () => {
	return(
		<div className='ma4 nt0'>
		<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 140 }} >
        <div className="Tilt-inner pa3">
        <img style={{paddingTop: '5px'}}alt='logo' src={galaxy}/> 
        </div>
        </Tilt>
		</div>
		);
}

export default Logo;