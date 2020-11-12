import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CurrencyService } from 'src/app/api/currency.service';
import { Currency } from 'src/app/model/Currencies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-create',
  templateUrl: './currency-create.component.html',
  styleUrls: ['./currency-create.component.css']
})
export class CurrencyCreateComponent implements OnInit {
  form = new FormGroup({
    BaseCurrency:new FormControl(''),
    CurrencyCode:new FormControl('',Validators.required),
    CurrencyName:new FormControl('',Validators.required),
    CurrencySymbol:new FormControl('',Validators.required),
    ExchangeRate:new FormControl(1, Validators.required),
    ValidFrom:new FormControl('', Validators.required),
    IsDefaultCurrency:new FormControl(false, Validators.required)
  });

   get CodeCurrency(){
     return this.form.get("CurrencyCode");
   }
   get CurrencyName(){
     return this.form.get("CurrencyName");
   }
   get CurrencySymbol(){
     return this.form.get("CurrencySymbol");
   }
   get ExchangeRate(){
     return this.form.get("ExchangeRate");
   }
   get ValidFrom(){
     return this.form.get("ValidFrom");

   }
   get IsDefaultCurrency(){
     return this.form.get("IsDefaultCurrency");

   }
   get formElement(){
     return this.form
   }

   SubmitData(){
    
    let currency:Currency = new Currency();
      currency.crrNAME = this.CurrencyName.value;
      currency.crrNAMEE = this.CodeCurrency.value;
      currency.crrSymbol = this.CurrencySymbol.value;
      currency.dfltCrncy = this.IsDefaultCurrency.value;
      currency.roe = this.ExchangeRate.value;
      currency.fdate = this.ValidFrom.value;

     this.CurrencyApi.Post<Currency>("/api/Currencies", currency).subscribe(a=>{
      
       this.router.navigate(["/currency"]);
     });
   }


  constructor(private CurrencyApi:CurrencyService ,private  router:Router) { }

  ngOnInit(): void {
  }

}
