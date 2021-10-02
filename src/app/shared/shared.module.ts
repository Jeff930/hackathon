import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './layouts/column/column.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CrewComponent } from './components/crew/crew.component';
import { RecordComponent } from './components/record/record.component';
import { ShipComponent } from './components/ship/ship.component';



@NgModule({
  declarations: [
    ColumnComponent,
    HeaderComponent,
    SidemenuComponent,
    CompaniesComponent,
    CrewComponent,
    RecordComponent,
    ShipComponent
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
