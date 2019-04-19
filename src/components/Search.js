import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';

import { search } from '../BooksAPI';

const Search = ({ handleBookUpdate }) => {
	const [inputValue, setInputValue] = useState('');
	const [books, setBooks] = useState([]);

	const handleChange = async e => {
		setInputValue(e.target.value);
		setBooks(await search(inputValue));
	};

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
					{books &&
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
