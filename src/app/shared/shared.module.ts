import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './layouts/column/column.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';



@NgModule({
  declarations: [
    ColumnComponent,
    HeaderComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ColumnComponent
  ]
})
export class SharedModule { }
