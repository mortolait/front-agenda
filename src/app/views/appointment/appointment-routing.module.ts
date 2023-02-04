import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './appointment.component'
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { PerfilAppointmentComponent } from './perfil-appointment/perfil-appointment.component';
import { ListClientsComponentTypeScript } from './list-clients/list-clients.component';

const routes: Routes = [
  {
    path:'',
    component: AppointmentComponent,
    children:[
      {
        path:'',
        component: ListAppointmentComponent,
        data: {
          title: $localize`Apontamentos`,
        },
      },
      {
        path:'new-appointment',
        component: NewAppointmentComponent,
        data: {
          title: $localize`Novo apontamento`,
        },
      },
      {
        path:'list',
        component: ListClientsComponentTypeScript,
        data: {
          title: $localize`teste`,
        },
      },
      {
        path:':id',
        component: PerfilAppointmentComponent,
        data: {
          title: $localize`Perfil apontamento`,
        },
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
