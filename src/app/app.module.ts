import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { DetailComponent, getUrl, URL_TOKEN } from './product/detail/detail.component';
import { ViewComponent } from './product/view/view.component';
import { ApiService } from './api.service';
import { KeepValueComponent } from './keep-value/keep-value.component';
import { FirstFormComponent } from './keep-value/first-form/first-form.component';
import { SecondFormComponent } from './keep-value/second-form/second-form.component';
import { LimitInputDirective } from './decimal-input.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { DecimalNumberMaskDirective } from './decimal-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DetailComponent,
    ViewComponent,
    KeepValueComponent,
    FirstFormComponent,
    SecondFormComponent,
    LimitInputDirective,
    DecimalNumberMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideAnimationsAsync(),
    {
      provide: URL_TOKEN,
      useFactory: getUrl,
      deps: [ApiService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
