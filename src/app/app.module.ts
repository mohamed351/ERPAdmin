import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CurrenciesModule } from './currencies/currencies.module';
import { DeleteDialogBoxComponent } from './delete-dialog-box/delete-dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthModule} from './auth/auth.module';
import {CookieService} from 'ngx-cookie-service';
import { ClientsModule } from './clients/clients.module';
import {MatMenuModule} from '@angular/material/menu';
import { HomeModule } from './home/home.module';

import {TokenInterceptor} from './httpInterceptor/TokenInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DeleteDialogBoxComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    HttpClientModule,
    CommonModule,
    CurrenciesModule,
    MatDialogModule,
    AuthModule,
    ClientsModule,
    MatMenuModule,
    HomeModule,
    

  ],
  providers: [CookieService , { provide:HTTP_INTERCEPTORS , useClass:TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
