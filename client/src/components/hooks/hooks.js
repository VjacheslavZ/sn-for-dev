import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi  = (initialUrl, initialData) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect( () => {
		const fetchData = async () => {
			setIsLoading(true);
			setIsError(false);

			try {
				const result = await axios(`http://hn.algolia.com/api/v1/search?query=${url}`);
				setData(result.data);
			} catch (e) {
				setIsError(true);
			}

			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return [{ data, isLoading, isError }, setUrl];
};

function App() {
	const [query, setQuery] = useState('redux');
	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		'http://hn.algolia.com/api/v1/search?query=',
		{ hits: [] },
	);

	return (
		<Fragment>
			<form
				onSubmit={event => {
					doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
					event.preventDefault()
				}}
			>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>

				{isError && <div>Something went wrong ...</div>}

				{isLoading ?
					(<div>Loading...</div>)
					:
					(<ul>
						{data.hits.map(item => (
							<li key={item.objectID}>{item.story_title}</li>
						))}
					</ul>)
				}

				<button type="submit">Search</button>
			</form>
		</Fragment>
	)
}

export default App;