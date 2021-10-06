import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './shared/components/companies/companies.component';
import { CrewComponent } from './shared/components/crew/crew.component';
import { RecordComponent } from './shared/components/record/record.component';
import { ShipComponent } from './shared/components/ship/ship.component';

const routes: Routes = [
  {path: 'companies', component: CompaniesComponent},
  {path: 'crew', component: CrewComponent},
  {path: 'records', component: RecordComponent},
  {path: 'ship', component: ShipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
