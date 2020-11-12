import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/api/currency.service';
import { Currency } from 'src/app/model/Currencies';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogBoxComponent } from 'src/app/delete-dialog-box/delete-dialog-box.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-currency-data',
  templateUrl: './currency-data.component.html',
  styleUrls: ['./currency-data.component.css']
})
export class CurrencyDataComponent implements OnInit {

 public CurrencyData:Currency[] =[];
  constructor(private currencyService:CurrencyService
    ,private activeRouter:Router ,
     private dailogRef:MatDialog) { }

  ngOnInit(): void {
    this.currencyService.GetCurrcies<Currency[]>("/api/Currencies").subscribe(a=>{
      this.CurrencyData = a;
    });
  }
  NavigateToCreate(){
  
  this.activeRouter.navigate(["currency/Create"]);
  }
  ShowDailog(item, id){
    this.dailogRef.open(DeleteDialogBoxComponent, {data:`${item}`}).afterClosed().subscribe(a=>{
      if(a.typeOfButton === 2){
          console.log(id);
      }
    });
 

  }

}
