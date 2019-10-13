import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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

  constructor (private data: DataService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.bankSearch = this.formBuilder.group({
      name: [''],
      ifsc: ['']
    });
  }

  searchBank () {
    this.searched = true;
    this.data.searchBankList({
      city: [],
      IFSC: this.bankSearch.controls.ifsc.value.replace(/\s/ig, '').split(',').filter(elem => elem !== '').map(elem => elem.toUpperCase()),
      name: this.bankSearch.controls.name.value
    }, data => {
      this.bankList = data;
    })
  }

}
