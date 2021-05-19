import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresapageRoutingModule } from './empresapage-routing.module';
import { EmpresapageComponent } from './empresapage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';


@NgModule({
  declarations: [EmpresapageComponent, EmpresaFormComponent],
  imports: [
    CommonModule,
    EmpresapageRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresapageModule { }
