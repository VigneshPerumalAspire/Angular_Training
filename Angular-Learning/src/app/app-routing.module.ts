import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicComponent } from './dynamic/dynamic.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'dynamic', component: DynamicComponent},
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
