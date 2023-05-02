import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerIndexComponent } from './views/customer-index/customer-index.component';
import { CustomerDetailsComponent } from './views/customer-details/customer-details.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CustomerEditComponent } from './views/customer-edit/customer-edit.component';
import { StatisticsComponent } from './views/statistics/statistics.component';
const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
    pathMatch: 'full',
  },
  {
    path: 'customer',
    component: CustomerIndexComponent,
    children: [
      {
        path: 'edit/:id',
        component: CustomerEditComponent,
      },
      {
        path: 'edit',
        component: CustomerEditComponent,
      },
    ],
  },
  {
    path: 'customer/:id',
    component: CustomerDetailsComponent,
  },
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
