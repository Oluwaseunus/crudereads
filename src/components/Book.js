import React, { useState, useEffect } from 'react';
import { get } from '../BooksAPI';

const Book = ({ id, handleBookUpdate }) => {
	const [book, setBook] = useState({});
	useEffect(() => {
		(async () => {
			setBook(await get(id));
		})();
	}, []);

	return (
		<li>
			{book.authors && (
				<div className='book'>
					<div className='book-top'>
						<div
							className='book-cover'
							style={{
								width: 128,
								height: 190,
								backgroundImage: `url(${book.imageLinks.smallThumbnail})`
							}}
						/>

						<div className='book-shelf-changer'>
							<select
								onChange={e => handleBookUpdate(book, e.target.value)}
								value={book.shelf}
							>
								<option value='move' disabled>
									Move to...
								</option>
								<option value='currentlyReading'>Currently Reading</option>
								<option value='wantToRead'>Want to Read</option>
								<option value='read'>Read</option>
								<option value='none'>None</option>
							</select>
						</div>
					</div>
					<div className='book-title'>{book.title}</div>
					<div className='book-authors'>{book.authors.join(', ')}</div>
				</div>
			)}
		</li>
	);
};

export default Book;
