import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PfmDashboardComponent } from './pfm-dashboard/pfm-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DialogCategoriesComponent } from './dialog-categories/dialog-categories.component';
import { MatFormFieldModule } from '@angular/material/form-field';
const routes: Routes = [
  {
    path: 'transactions',
    component: TransactionsComponent,
    
  },
  {
    path:'',
    component: PfmDashboardComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
