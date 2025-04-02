// src/app/shared/material.module.ts

import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
  exports: [
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
