import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from 'src/app/api/currency.service';
import { Accts } from 'src/app/model/Accts';
import { ClientGetViewModel, ClientPostViewModel } from 'src/app/model/ClientsPostViewModel';
import { ContactGroups } from 'src/app/model/ContactsGroup';
import { Countries } from 'src/app/model/Countries';
import { Currency } from 'src/app/model/Currencies';
import { Employees } from 'src/app/model/Employees';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
   id:number = null;
   client:ClientGetViewModel = null;
   public employees:Employees[] = null;
   public Countries:Countries[] = [];
   public currencies:Currency[] = [];
   public contactsGroups:ContactGroups[] = [];
   public Accounts:Accts[] = [];


   imageChangedEvent: any = '';
   croppedImage: any = '';
   IsCropperDivShown:boolean =false;
   imageBase64:string= null;
  public form:FormGroup = new FormGroup({
    ClientName:new FormControl('' ,[Validators.required]),
    Sales:new FormControl('', [Validators.required]),
    ClientPhone:new FormControl('',[Validators.required]),
    ClientPhone2:new FormControl(''),
    TaxCertificate: new FormControl('', [Validators.required]),
    CommercialRegister: new FormControl(''),
    Fax:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.email , Validators.required]),
    ClientAddress:new FormControl(''),
    ClientBillingAddress:new FormControl(''),
    ReferenceContract:new FormControl(''),
    ClientLinesBLAddress:new FormControl(''),
    BankDetails:new FormControl(''),
    WebSite:new FormControl(''),
    CountryID:new FormControl(''),
    PersonalInCharge:new FormArray([]),
    FirstBalance:new FormArray([]),
    NetWork : new FormArray([]),
    PreventClientFromOperation: new FormControl(false),
    ClientCredit:new FormGroup({
      Day:new FormControl(0,[Validators.required]),
      Limit:new FormControl(0,[Validators.required])
    }),
    Accts:new FormControl('',[Validators.required]),
    IsRevalue:new FormControl(false,[Validators.required])

  
  });

  get FirstBalance(){
    return this.form.get("FirstBalance") as FormArray;
  }
  get ClientPhone2(){
    return this.form.get("ClientPhone2");
  }

  get ClientName(){
    return this.form.get("ClientName");
  }
  get Sales(){
    return this.form.get("Sales");
  }
  get ClientPhone(){
    return this.form.get("ClientPhone");
  }

  get Fax(){
    return this.form.get("Fax");
  }

  get Email(){
    return this.form.get("Email");
  }

  get TaxCertificate(){
    return this.form.get("TaxCertificate");
  }

  get ClientAddress(){
    return this.form.get("ClientAddress");
  }
  get ReferenceContract(){
    return this.form.get("ReferenceContract");
  }

  get ClientBillingAddress(){
    return  this.form.get("ClientBillingAddress");
  }
  get ClientLinesBLAddress(){
    return this.form.get("ClientLinesBLAddress");
  }
  get CountryID(){
    return this.form.get("CountryID")
  }
  get BankDetails(){
    return this.form.get("BankDetails");
  }

  get ClientCreditDay(){
    return this.form.get("ClientCredit").get("Day");
  }
  get ClientCreditLimit(){
    return this.form.get("ClientCredit").get("Limit");
  }
  get PersonalInCharge(){
    return this.form.get("PersonalInCharge") as FormArray;
  }
  get NetWork(){
    return this.form.get("NetWork") as FormArray;
  }
  get IsRevalue(){
    return this.form.get("IsRevalue");
  }
  get Accts(){
    return this.form.get("Accts");
  }
  


  constructor(private ActiveRouter:ActivatedRoute ,
    private currrencyService:CurrencyService , 
    private toster:ToastrService , 
    private Router:Router) {
   

  }

  ngOnInit(): void {
     this.ActiveRouter.params.subscribe(a=>{
          this.id = a.id;
          this.currrencyService.GetByID<ClientGetViewModel,number>("/api/Clients/",a.id).subscribe(a=>{
            this.client = a;
            console.log(this.client);
            this.ResetForm();
          });
     });

     this.currrencyService.GetCurrcies<Currency[]>("/api/Currencies").subscribe(a=>{
      this.currencies= a;
    });
    this.currrencyService.GetCurrcies<ContactGroups[]>("/api/ContactGroups").subscribe(a=>{
      this.contactsGroups = a;
    });

    this.currrencyService.GetCurrcies<Accts[]>("/api/Accts").subscribe(a=>{
      this.Accounts = a;
    });

  
   
  }

  AddNewPersonChargeRow(){
    (<FormArray>this.form.get("PersonalInCharge")).push(new FormGroup({
      title:new FormControl('', [Validators.required]),
      name:new FormControl('',[Validators.required]),
      phone1:new FormControl('',[Validators.required]),
      phone2:new FormControl(''),
      email:new FormControl('',[Validators.email])
    }))
  }
  AddFirstBalance(){
    (<FormArray>this.form.get("FirstBalance")).push(new FormGroup({
      contactBalance	:new FormControl('', [Validators.required]),
      balanceCurrency	:new FormControl('',[Validators.required]),
    
    }))
  }

  SelectElement(element){
    this.currrencyService.GetByQueryString<Employees[]>("/api/Employees","?name="+element.term).subscribe(a=>{
      this.employees = a;

    });
  }
  SelectCountry(elemenet){
    this.currrencyService.GetByQueryString<Countries[]>("/api/Countries","?name"+elemenet.term).subscribe(a=>{
     this.Countries = a;
    })
  }

  fileChangeEvent(event){
    this.imageChangedEvent = event;
    this.IsCropperDivShown = true;
    document.getElementById("sidevarContainer").style.display= "none";
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  
  } 
  handleCancelButton(input){
    
    this.IsCropperDivShown = false;
    input.value = null;
    document.getElementById("sidevarContainer").style.display= "block";
    this.croppedImage=null;
  }
  handelOkButton(input){
 
    document.getElementById("sidevarContainer").style.display= "block";
    this.imageBase64 = this.croppedImage;
    this.IsCropperDivShown= false;
    console.log(this.imageBase64 );
  }
  deletePersonInChargeRow(item, index){
   this.PersonalInCharge.removeAt(index)
  }
  deleteFirstBalance(item, index){
    this.FirstBalance.removeAt(index);
  }
  addNetWork(){
    this.NetWork.push(new FormGroup({
      group: new FormControl('',[Validators.required]),
      expireDate:new FormControl(Date.now,[Validators.required])
    }))
  }
  deleteNewWork(item, index){
    this.NetWork.removeAt(index);
  }



  SubmitData(){
     var data = this.form.value;
     data.image ="";
     if (this.imageBase64 != null){
        data.image= this.imageBase64
     }
     this.currrencyService.Post<ClientPostViewModel>("/api/Clients",data).subscribe(a=>{
        this.toster.success("Successfull Adding Client Contact","Successful Adding");
        this.Router.navigate(["/client"]);
     });
  }

  private ResetForm(){
    this.ClientName.setValue(this.client.clientName);
    this.ClientAddress.setValue(this.client.clientAddress);
  
    this.currrencyService.GetByID<Employees,number>("/api/Employees",this.client.sales).subscribe(a=>{
  
       
        this.employees = [];
        this.employees.push(a);
        this.Sales.setValue(this.client.sales);
     
    });
  
    this.ClientPhone.setValue(this.client.clientPhone);
    this.ClientPhone2.setValue(this.client.clientPhone2);
    this.Fax.setValue(this.client.fax);
    this.Email.setValue(this.client.email);
    
    
    
  
  }

 


}
