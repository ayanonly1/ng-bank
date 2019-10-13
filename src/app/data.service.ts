import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cityArr = ['BANGALORE', 'MUMBAI', 'KOLKATA', 'PUNE', 'DELHI'];
  constructor(private http: HttpClient) {}

  searchBankList (config: any, callBack: Function) {
    let bankList = [],
      cityList: [string],
      remainingCall = 0;

    // There should be at least a valid param. Else the the API may return 404
    // Search for IFSC is not working
    // Can't search partial bank name
    cityList = config.city && config.city.length ? config.city : this.cityArr;
    for (let i = 0; i < cityList.length; i++) {
      remainingCall += 1;
      this.http.get('https://vast-shore-74260.herokuapp.com/banks?city='+ cityList[i].toUpperCase()).subscribe((data: Array<any>) => {
        // Mark completion
        remainingCall -= 1;

        // filter for IFSC
        if (config.IFSC && config.IFSC.length) {
          data = data.filter((elem) => {
            return elem && elem.ifsc && config.IFSC.indexOf(elem.ifsc) !== -1;
          });
        }

        // filter bank Name
        if (config.name) {
          data = data.filter((elem) => {
            return elem && elem.bank_name && elem.bank_name.toLowerCase().indexOf(config.name.toLowerCase()) !== -1;
          });
        }

        bankList.push(...data);
        !remainingCall && callBack(bankList);
      });

    }
  }
}
