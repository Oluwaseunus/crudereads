import React from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';

const Home = ({ books, handleBookUpdate }) => {
	const shelves = ['currentlyReading', 'wantToRead', 'read'];

	const pascalCase = string => {
		const first = [...string]
			.map(value =>
				value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90
					? ` ${value}`
					: value
			)
			.join('');
		return [...first][0].toUpperCase() + first.slice(1);
	};

	return (
		<div>
			{books && (
				<div className='list-books'>
					<div className='list-books-title'>
						<h1>MyReads</h1>
					</div>

					<div className='list-books-content'>
						<div>
							{shelves.map(shelf => (
								<div className='bookshelf' key={shelf}>
									<h2 className='bookshelf-title'>{pascalCase(shelf)}</h2>

									<div className='bookshelf-books'>
										<ol className='books-grid'>
											{books
												.filter(book => book.shelf === shelf)
												.map(book => (
													<Book
														id={book.id}
														key={book.id}
														handleBookUpdate={handleBookUpdate}
													/>
												))}
										</ol>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			<div>
				<Link className='open-search' to='/search'>
					<button>Add a book</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
