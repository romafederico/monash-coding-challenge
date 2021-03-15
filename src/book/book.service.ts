import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.model';
import { mockBooks } from './book.mock';

@Injectable()
export class BookService {
  private books: Book[] = mockBooks.map((b) => new Book(b.id));

  @Get()
  getAllBooks() {
    return this.books;
  }

  @Get()
  getBook(id: number) {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`No book found with id ${id}`);
    } else {
      return book;
    }
  }
}
