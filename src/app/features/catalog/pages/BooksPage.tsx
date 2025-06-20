import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../slices/booksSlice';
import type { RootState, AppDispatch } from '../../../state/store';

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
            <ul>
                {items.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author} —{' '}
                        {book.price.toLocaleString('de-DE', {
                            style: 'currency',
                            currency: 'EUR',
                        })}
                    </li>
                ))}
            </ul>
        </div>
    )
}
