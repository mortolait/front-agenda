import { NgModule } from '@angular/core';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
// import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { PerfilAppointmentComponent } from './perfil-appointment/perfil-appointment.component';
import { SharedModule } from '../../shared/shared.module';

import { ClientsRoutingModule } from '../clients/clients-routing.module';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';


@NgModule({
  declarations: [
    AppointmentComponent,
    // ListAppointmentComponent,
    PerfilAppointmentComponent,
    NewAppointmentComponent
  ],
  imports: [
    AppointmentRoutingModule,
    ClientsRoutingModule,
  
    SharedModule,

  ],
})
export class AppointmentModule {}
