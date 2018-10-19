import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';

// Variables declared
// use ? for variables
export interface IOrder {
  pid?: string;
  image?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders: Array<IOrder> = [];
  errorMessage = '';
  confirmMessage = '';
  name = '';

  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {
  }

  async ngOnInit() {

  }

  // Validation Step
  validate(name: string, total: number, taxAmount: number, subTotal: number) {
    this.errorMessage = '';
    if (!total) {
      this.errorMessage = 'Total must execute calculation!';
    }

    if (name === '') {
      this.errorMessage = 'Name must not be empty!';
    } else if (name.indexOf(',') === -1) {
      this.errorMessage = 'Name must have a comma and a space!';
    }

    if (this.errorMessage.length > 0) {

      return false;

    } else {
      this.flexModal.openDialog('confirm-modal');
      return true;

    }
  }

  showMessage(modalID: string) {
    this.flexModal.openDialog('error-modal');
  }

  // Success
  setSuccessMessage(name: string, total: number, taxAmount: number, subTotal: number) {
  }

  // Calculate Total use acc q*p
  calcTotal() {
    const total = this.orders.reduce((acc: number, item: IOrder) => {
      acc += item.quantity * item.price;
      return acc;
    }, 0);
    const taxAmount = total * 0.1;
    const subTotal = total - taxAmount;
    const validation = this.validate(this.name, total, taxAmount, subTotal);
    if (!validation) {
      this.showMessage('error-modal'); 
    } else {

      this.showMessage('confirm-modal');
    }
  }

  // Add Orders
  addOrder(item: string) {
    switch (item) {
      case 'Android':
        this.orders.push({
          'pid': '1',
          'image': 'assets/sm_android.jpeg',
          'description': 'Android',
          'price': 150.00,
          'quantity': 1
        });
        break;
      case 'IPhone':
        this.orders.push({
          'pid': '2',
          'image': 'assets/sm_iphone.jpeg',
          'description': 'IPhone',
          'price': 200.00,
          'quantity': 1
        });
        break;
      case 'Windows':
        this.orders.push({
          'pid': '3',
          'image': 'assets/sm_windows.jpeg',
          'description': 'Windows Phone',
          'price': 110.00,
          'quantity': 1
        });
        break;
    }
  }
  // Display Orders
  displayOrder() {
    this.orders = [{
      'pid': '1',
      'image': 'assets/sm_android.jpeg',
      'description': 'Android',
      'price': 150.00,
      'quantity': 2
    }, {
      'pid': '2',
      'image': 'assets/sm_iphone.jpeg',
      'description': 'IPhone',
      'price': 200.00,
      'quantity': 1
    }, {
      'pid': '3',
      'image': 'assets/sm_windows.jpeg',
      'description': 'Windows Phone',
      'price': 110.00,
      'quantity': 2
    }];

  }

  // Clear Orders using keys / map
  clearOrders() {
    this.orders = [];
  }

  // Submit button “Thank you . Here is your order details!”.
  submitOrder() {

  }

// Delete Order use splice
  deleteOrder(index: number) {
    console.log(index);
    this.orders.splice(index, 1);
  }
}

