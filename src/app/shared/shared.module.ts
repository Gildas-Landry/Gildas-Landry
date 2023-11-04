import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { Template2Component } from './template2/template2.component';

import { ProductsComponent } from '../pages/products/products.component';
import { SuppliersComponent } from '../pages/suppliers/suppliers.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { PosComponent } from '../pages/pos/pos.component';
import { SalesComponent } from '../pages/sales/sales.component';
import { PurchaseComponent } from '../pages/purchase/purchase.component';
import { AuthGuard } from '../auth.guard';
import { ProductsSuppliedComponent } from '../products-supplied/products-supplied.component';
import { DeleteComponent } from './delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes=[
  {path:'dashboard/products',component:ProductsComponent},
  {path:'dashboard/suppliers',component:SuppliersComponent,canActivate:[AuthGuard]},
  {path:'dashboard/categories',component:CategoriesComponent,canActivate:[AuthGuard]},
  {path:'dashboard/pos',component:PosComponent,},
  {path:'dashboard/sales',component:SalesComponent,canActivate:[AuthGuard]},
  {path:'dashboard/purchase', component:PurchaseComponent,canActivate:[AuthGuard]},
  {path:'dashboard/ps', component:ProductsSuppliedComponent,canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    TemplateComponent,
    Template2Component,
    DeleteComponent,

  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ],
  exports: [
    TemplateComponent,
    Template2Component,

  ]
})
export class SharedModule { }
