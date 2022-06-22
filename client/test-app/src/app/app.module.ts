import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersoaneComponent } from './persoane/persoane.component';
import { MasiniComponent } from './masini/masini.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersModalComponent } from './persoane/pers-modal/pers-modal.component';
import { MasiniModalComponent } from './masini/masini-modal/masini-modal.component';

const appRoutes: Routes = [
  { path: 'persoane', component: PersoaneComponent},
  { path: 'masini', component: MasiniComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    PersoaneComponent,
    MasiniComponent,
    PersModalComponent,
    MasiniModalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
