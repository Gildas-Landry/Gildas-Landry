import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { Template2Component } from './template2/template2.component';

import { ProductsComponent } from '../pages/products/products.component';
import { SuppliersComponent } from '../pages/suppliers/suppliers.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { PosComponent } from '../pages/pos/pos.component';
import { SalesComponent } from '../pages/sales/sales.component';

const routes=[
  {path:'dashboard/products',component:ProductsComponent},
  {path:'dashboard/suppliers',component:SuppliersComponent},
  {path:'dashboard/categories',component:CategoriesComponent},
  {path:'dashboard/pos',component:PosComponent},
  {path:'dashboard/sales',component:SalesComponent},
];

@NgModule({
  declarations: [
    TemplateComponent,
    Template2Component
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TemplateComponent,
    Template2Component
  ]
})
export class SharedModule { }
