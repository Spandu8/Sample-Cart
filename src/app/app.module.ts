import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { GrowlModule } from 'ngx-growl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';


// import {AppConfig} from '../config/config';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    CartComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    // AppConfig,
    GrowlModule.forRoot({ maxMessages: 1, displayTimeMs: 5000 }),
  ],
  // exports: [
  //   AppConfig
  // ],
  providers: [],
  entryComponents: [LoginComponent, ProductComponent, RegisterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
