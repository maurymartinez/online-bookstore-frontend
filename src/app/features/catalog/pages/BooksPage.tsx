import './BookPage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../slices/booksSlice';
import type { RootState, AppDispatch } from '../../../state/store';
import BookItem from './BookItem';

export default function BooksPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status, error } = useSelector((state: RootState) => state.books);

    useEffect(() => {
        dispatch(fetchBooks())
    }, [dispatch])

    if (status === 'loading') return <p>Loading books...</p>
    if (status === 'failed') return <p>Error: {error}</p>

    return (
        <div>
            <h1>Books</h1>
            <ul className="list-unstyled">
                {items.map((book) => (
                    <li key={book.id}>
                        <BookItem key={book.id} book={book} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
