import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';

import { getAll, update } from './BooksAPI';

import './App.css';

const App = () => {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		(async () => {
			setBooks(await getAll());
		})();
	}, []);

	const handleBookUpdate = (book, value) => {
		if (book.shelf !== value) {
			const index = books.indexOf(
				books.filter(entry => entry.id === book.id)[0]
			);
			books.splice(index, 1);
			book.shelf = value;
			update(book, value);
			setBooks([...books, book]);
		}
	};

	return (
		<BrowserRouter>
			<Route
				exact
				path='/'
				render={props => (
					<Home {...props} books={books} handleBookUpdate={handleBookUpdate} />
				)}
			/>
			<Route
				path='/search'
				render={props => (
					<Search {...props} handleBookUpdate={handleBookUpdate} />
				)}
			/>
		</BrowserRouter>
	);
};

export default App;
