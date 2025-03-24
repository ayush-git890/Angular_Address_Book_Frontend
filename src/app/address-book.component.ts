import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contact } from './contact.model';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h1>Address Book - By Ayush Agarwal</h1>
      
      <div class="add-contact">
        <h2>Add New Contact</h2>
        <form (ngSubmit)="addContact()">
          <div class="form-group">
            <input [(ngModel)]="newContact.fullname" name="fullname" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input [(ngModel)]="newContact.address" name="address" placeholder="Address" required>
          </div>
          <div class="form-group">
            <input [(ngModel)]="newContact.city" name="city" placeholder="City" required>
          </div>
          <div class="form-group">
            <input [(ngModel)]="newContact.state" name="state" placeholder="State" required>
          </div>
          <div class="form-group">
            <input [(ngModel)]="newContact.zipCode" name="zipCode" placeholder="Zip Code" required>
          </div>
          <div class="form-group">
            <input [(ngModel)]="newContact.phoneNumber" name="phoneNumber" placeholder="Phone Number" required>
          </div>
          <button type="submit">Add Person</button>
        </form>
      </div>

      <div class="contacts-list">
        <h2>Person Details</h2>
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let contact of contacts; let i = index">
              <td>{{contact.fullname}}</td>
              <td>{{contact.address}}</td>
              <td>{{contact.city}}</td>
              <td>{{contact.state}}</td>
              <td>{{contact.zipCode}}</td>
              <td>{{contact.phoneNumber}}</td>
              <td>
                <button (click)="editContact(i)" class="edit">✏️</button>
                <button (click)="deleteContact(i)" class="delete">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #333;
      text-align: center;
    }

    .add-contact {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
    }

    .edit, .delete {
      padding: 5px 10px;
      margin: 0 5px;
    }

    .delete {
      background: #dc3545;
    }

    .delete:hover {
      background: #c82333;
    }
  `]
})
export class AddressBookComponent {
  contacts: Contact[] = [];
  newContact: Contact = this.getEmptyContact();

  getEmptyContact(): Contact {
    return {
      fullname: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: ''
    };
  }

  addContact() {
    if (this.validateContact(this.newContact)) {
      this.contacts.push({...this.newContact});
      this.newContact = this.getEmptyContact();
    }
  }

  editContact(index: number) {
    this.newContact = {...this.contacts[index]};
    this.contacts.splice(index, 1);
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
  }

  validateContact(contact: Contact): boolean {
    return Object.values(contact).every(value => value.trim() !== '');
  }
}