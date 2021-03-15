import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { BookService } from '../book/book.service';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../contact/contact.model';

const compare = (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0);

const findUniques = (a, b) => {
  const u = b.filter((cB) => !a.find((cA) => cB.name === cA.name));
  return u;
};

@Controller('api')
export class ApiController {
  constructor(
    private readonly bookService: BookService,
    private readonly contactService: ContactService,
  ) {}

  // Route /api - GET - Basic welcome message or health check
  @Get()
  getApiIndex() {
    return {
      message: 'Monash University Backend Coding Challenge by Federico Roma',
    };
  }

  // Route /api/book - GET - Fetches all available books
  @Get('book')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  // Route /api/compare - GET - Takes two parameters bookA and bookB
  // returns unique contacts from both
  @Get('book/compare')
  compareBooks(@Query() query) {
    if (!query.bookA || !query.bookB) {
      throw new NotFoundException(
        `One of two parameters bookA or bookB is missing`,
      );
    }

    // Fetches contacts from both books
    const contactsA = this.getBookContacts(query.bookA);
    const contactsB = this.getBookContacts(query.bookB);

    // Finds unique contacts simmetrically
    const uniqueContacts = [];
    findUniques(contactsA, contactsB).map((c) => uniqueContacts.push(c));
    findUniques(contactsB, contactsA).map((c) => uniqueContacts.push(c));

    // Returns unique contacts alphabetically sorted
    return uniqueContacts.sort(compare);
  }

  // Route /api/book/:id - GET - Fetches all contacts for a specicic book
  @Get('book/:id')
  getBookContacts(@Param('id') id: string) {
    // Apparently nestjs captures url parameters as strings and need to be converted into a number
    // even if we declare the type of id as number as in line 18
    const bookId: number = +id;

    // Check for book existence
    this.bookService.getBook(bookId);

    // Fetch contacts for specific book
    const contacts = this.contactService.getBookContacts(bookId);

    // Returns contacts alphabetically sorted
    return contacts.sort(compare);
  }

  // Route /api/conctact - Fetches all contacts
  @Get('contact')
  getAllContacts() {
    const contacts = this.contactService.getAllContacts();

    // Returns contacts alphabetically sorted
    return contacts.sort(compare);
  }

  // Route /api/conctact - Fetches all contacts
  @Post('contact')
  createContact(@Body() contact: Contact) {
    // Check existence of book in DB
    const book = this.bookService.getBook(contact.book);
    if (!book) {
      throw new NotFoundException(
        `Cannot create contact since book ${contact.book} does not exist`,
      );
    }

    // Create contact for the specified book
    const contactId = this.contactService.createContact(contact);
    return { id: contactId };
  }
}
