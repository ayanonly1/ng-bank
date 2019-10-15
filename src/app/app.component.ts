import { Component, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bank';
  bankList = new MatTableDataSource<BankInfo>();
  bankSearch: FormGroup;
  searching = false;
  cities: string[] = ['BANGALORE', 'MUMBAI', 'KOLKATA', 'PUNE', 'DELHI'];
  displayedColumns: string[] = ['name', 'city', 'ifsc'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor (private data: DataService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bankList.paginator = this.paginator;

    this.bankSearch = this.formBuilder.group({
      name: '',
      ifsc: '',
      city: ''
    });
  }

  searchBank () {
    this.searching = true;
    this.bankList.data = [];
    this.data.searchBankList({
      city: this.bankSearch.controls.city.value || this.cities,
      IFSC: this.bankSearch.controls.ifsc.value.replace(/\s/ig, '').split(',').filter(elem => elem !== '').map(elem => elem.toUpperCase()),
      name: this.bankSearch.controls.name.value
    }, data => {
      this.bankList.data = this.bankList.data.concat(data);
      this.searching = false;
    })
  }

}


export interface BankInfo {
  "ifsc": string;
  "bank_id": number;
  "branch": string;
  "address": string;
  "city": string;
  "district": string;
  "state": string;
  "bank_name": string;
}
