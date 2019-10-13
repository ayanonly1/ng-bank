import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bank';
  bankList: object[];

  constructor (private data: DataService) {}

  ngOnInit () {
    this.data.searchBankList({
      city: [],
      IFSC: ['ABHY0065101', 'ALLA0210159'],
      name: 'AL'
    }, data => {
      this.bankList = data;
      console.log(data);
    })
  }

}
