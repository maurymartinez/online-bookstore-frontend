import './BookItem.css';
import type { Book } from '../domain/types';

type Props = {
    book: Book;
}

export default function BookItem({ book }: Props) {
    return (
        <div className="book-item">
            <div className="book-info">
                <div className="book-title">{book.title}</div>
                <div className="book-author">by {book.author}</div>
                <div className="book-price">
                    {book.price.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                    })}
                </div>
            </div>

            <button className="book-button">
                Add
            </button>
        </div>
    )
}
