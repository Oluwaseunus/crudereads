import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';

import { search } from '../BooksAPI';

const Search = ({ handleBookUpdate }) => {
	const [inputValue, setInputValue] = useState('');

	const handleChange = e => setInputValue(e.target.value);

	const [books, setBooks] = useState([]);
	useEffect(() => {
		(async () => {
			if (!inputValue) setBooks([]);
			else {
				const newBooks = await search(inputValue);
				setBooks(newBooks);
			}
		})();
	}, [inputValue]);

	return (
		<div className='search-books'>
			<div className='search-books-bar'>
				<Link to='/' className='close-search'>
					Close
				</Link>

				<div className='search-books-input-wrapper'>
					<input
						type='text'
						placeholder='Search by title or author'
						onChange={handleChange}
						value={inputValue}
					/>
				</div>
			</div>

			<div className='search-books-results'>
				<ol className='books-grid'>
					{books.length > 0 &&
						books.map(book => (
							<Book
								id={book.id}
								key={book.id}
								handleBookUpdate={handleBookUpdate}
							/>
						))}
				</ol>
			</div>
		</div>
	);
};

export default Search;
