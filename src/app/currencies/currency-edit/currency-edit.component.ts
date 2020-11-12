import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/api/currency.service';
import { Currency } from 'src/app/model/Currencies';

@Component({
  selector: 'app-currency-edit',
  templateUrl: './currency-edit.component.html',
  styleUrls: ['./currency-edit.component.css']
})
export class CurrencyEditComponent implements OnInit {
   public currency:Currency= null;
    private currenctId:number = null;
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

  constructor(private currencyService:CurrencyService, private router:ActivatedRoute , private routes:Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(a=>{
      this.currencyService.GetByID<Currency,number>("/api/Currencies/",a.id).subscribe(c=>{
          this.currency = c;
          this.currenctId = a.id;
          this.CodeCurrency.setValue(c.crrNAMEE);
          this.CurrencyName.setValue(c.crrNAME);
          this.CurrencySymbol.setValue(c.crrSymbol);
          this.ExchangeRate.setValue(c.roe);
          this.IsDefaultCurrency.setValue(c.dfltCrncy);
          let validationForm = new Date(c.fdate);
          this.ValidFrom.setValue(validationForm)
       
          

      });
    });
   
  }
  SubmitData(){
    let currency = new Currency();
    currency.crrID = this.currenctId;
    currency.crrNAME = this.CurrencyName.value;
    currency.crrNAMEE = this.CodeCurrency.value;
    currency.crrSymbol = this.CurrencySymbol.value;
    currency.roe = this.ExchangeRate.value;
    currency.fdate = this.ValidFrom.value;
    currency.dfltCrncy  =this.IsDefaultCurrency.value;
    this.currencyService.Put<Currency,any>("/api/Currencies",currency,this.currenctId).subscribe(a=>{
      this.routes.navigate(["/currency"]);
    });
  }

}
