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
			update(book, value);
			const index = books.indexOf(
				books.filter(entry => entry.id === book.id)[0]
			);
			const newBooks = [...books];
			newBooks.splice(index, 1);
			setBooks([...newBooks, { ...book, shelf: value }]);
		}
	};

	return (
		<BrowserRouter>
			<Route
				exact
				path='/'
				render={() => (
					<Home books={books} handleBookUpdate={handleBookUpdate} />
				)}
			/>

			<Route
				path='/search'
				render={() => <Search handleBookUpdate={handleBookUpdate} />}
			/>
		</BrowserRouter>
	);
};

export default App;
