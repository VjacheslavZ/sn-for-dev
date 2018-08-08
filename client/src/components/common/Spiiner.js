import React from 'react';
import spiiner from './spinner.gif';

export default () => {
	return (
		<div>
			<img
				src={spiiner}
				style={{
					width: '200px',
					margin: 'auto',
					display: 'block'
				}}
				alt="Loading..."/>
		</div>
	);
}
