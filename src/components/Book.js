import React, { useState, useEffect } from 'react';

import { get } from '../BooksAPI';

const Book = ({ id, handleBookUpdate }) => {
	const [book, setBook] = useState({});
	useEffect(() => {
		async function fetchData() {
			setBook(await get(id));
		}
		fetchData();
	}, [book]);

	if (!book.imageLinks) {
		book.imageLinks = {
			smallThumbnail:
				'https://cdn4.iconfinder.com/data/icons/solid-part-6/128/image_icon-128.png'
		};
	}

	if (!book.authors) {
		book.authors = ['No known Author'];
	}

	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<div
						className='book-cover'
						style={{
							width: 128,
							height: 190,
							backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
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
		</li>
	);
};

export default Book;
