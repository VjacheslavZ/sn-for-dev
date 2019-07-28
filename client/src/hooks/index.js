import React, { useState, useEffect } from 'react';

function UseExample() {
	const [count, setCount] = useState(0);
	useEffect(() => {
		document.title = `Вы кликнули ${count} раз`;
		return () => {
			console.log('unmount')
		}
	}, []);
	console.log('useExample')
	return (
		<div>
			<p>Вы кликнули {count} раз</p>
			<button type="button" onClick={() => setCount(count + 1)}>
				Кликни меня
			</button>
		</div>
	);
}

export default UseExample;