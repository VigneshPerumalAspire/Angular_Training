import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Components
import { HomeComponent } from './home/home.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { DetailsTableComponent } from './Shared/details-table/details-table.component';
import { ProductComponent } from './product/product.component';
import { CouponComponent } from './coupon/coupon.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamDetailsComponent,
    DetailsTableComponent,
    ProductComponent,
    CouponComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule, 
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
