import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrencyDataComponent} from '../app/currencies/currency-data/currency-data.component';
import {CurrencyCreateComponent} from '../app/currencies/currency-create/currency-create.component'; 
import {CurrencyEditComponent} from '../app/currencies/currency-edit/currency-edit.component'
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './auth/login/login.component';
import { UnAuthGuardGuard } from './guards/un-auth-guard.guard';
import {HomeComponent} from '../app/home/home/home.component';
import { ClientCreateComponent } from './clients/client-create/client-create.component';
import { ClientDataComponent } from './clients/client-data/client-data.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
const routes: Routes = [
  {path:"", component:HomeComponent, canActivate:[AuthGuardGuard]},
  {path:"login", component:LoginComponent, canActivate:[UnAuthGuardGuard]},
  
  {path:"currency", component:CurrencyDataComponent, canActivate:[AuthGuardGuard]},
  {path:"currency/Create",component:CurrencyCreateComponent , canActivate:[AuthGuardGuard]},
  {path:"currency/Edit/:id", component:CurrencyEditComponent , canActivate:[AuthGuardGuard]},

  {path:"client", component:ClientDataComponent, canActivate:[AuthGuardGuard] },
  {path:"client/Create", component:ClientCreateComponent, canActivate:[AuthGuardGuard]},
  {path:"client/Edit/:id" , component:ClientEditComponent, canActivate:[AuthGuardGuard]}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
