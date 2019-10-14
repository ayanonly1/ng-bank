import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-bank';
  bankList: object[];
  bankSearch: FormGroup;
  searched = false;
  cities = ['BANGALORE', 'MUMBAI', 'KOLKATA', 'PUNE', 'DELHI'];
  constructor (private data: DataService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bankSearch = this.formBuilder.group({
      name: '',
      ifsc: '',
      city: ''
    });
  }

  searchBank () {
    this.searched = true;
    this.data.searchBankList({
      city: this.bankSearch.controls.city.value || this.cities,
      IFSC: this.bankSearch.controls.ifsc.value.replace(/\s/ig, '').split(',').filter(elem => elem !== '').map(elem => elem.toUpperCase()),
      name: this.bankSearch.controls.name.value
    }, data => {
      this.bankList = data;
    })
  }

}
