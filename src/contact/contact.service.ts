import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './contact.model';

import { mockContacts } from './contact.mock';

@Injectable()
export class ContactService {
  private contacts: Contact[] = mockContacts.map(
    (c) => new Contact(c.id, c.book, c.name, c.phone),
  );

  createContact(contact: Contact) {
    const newContact = new Contact(
      this.contacts.length + 1,
      contact.book,
      contact.name,
      contact.phone,
    );
    this.contacts.push(newContact);
    return `Contact ${newContact.name} created for book ${contact.book}`;
  }

  getAllContacts(): Contact[] {
    return this.contacts;
  }

  getBookContacts(bookId: number): Contact[] {
    const bookContacts = this.contacts.filter((c) => {
      return c.book === bookId;
    });

    if (!bookContacts) {
      throw new NotFoundException(`No contacts found for book ${bookId}`);
    } else {
      return bookContacts;
    }
  }
}
