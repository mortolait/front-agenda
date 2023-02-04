import { SharedService } from './../../../core/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ClientsService } from '../../clients/services/clients.service';
import { ProfessionalService } from '../../professional/service/professional-service.service';
import { AppointmentService } from '../services/appointment.service';
import * as moment from 'moment';
@Component({
  selector: 'app-perfil-appointment',
  templateUrl: './perfil-appointment.component.html',
  styleUrls: ['./perfil-appointment.component.scss']
})
export class PerfilAppointmentComponent {

  perfilAppointmentForm!: FormGroup;
  customValidate = false
  idAppointment!: String;

  constructor(
    private formBuilder: FormBuilder,
    public clientService: ClientsService,
    public profesisonalService: ProfessionalService,
    public appointmentService: AppointmentService,
    private activetedRouter: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.perfilAppointmentForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      professional: new FormControl('', [Validators.required]),
      client: new FormControl('', [Validators.required]),
      service: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getClients()
    this.getProfessional()
    this.getService()
    this.idAppointment = this.activetedRouter.snapshot.params?.['id']
    this.getAppointment()

  }
  getClients() {
    this.clientService.get().subscribe({
      next: (clients) => {
        this.clientService.clients = clients
      },
      error: (err) => console.log('Error', err)
    })
  }

  getProfessional(){
    this.profesisonalService.get().subscribe({
      next: (professional) => {
        this.profesisonalService.professionals = professional
      },
      error: (err) => console.log('Error', err)
    })
  }
  getAppointment() {
    this.appointmentService.getById(this.idAppointment).subscribe({
      next: (appointment) => {
        console.log(appointment)
        appointment.date = moment(new Date(appointment.date)).format('YYYY-MM-DD')
        this.perfilAppointmentForm.patchValue(appointment)
      },
      error: (err) => console.log('Error', err),
    })
  }

  getService() {
    this.appointmentService.getTypeService().subscribe({
      next: (response) => {
        console.log({ response });
        this.appointmentService.typesService = response;
        console.log(this.appointmentService.typesService);
      },
    });
  }
  update() {

  }
}
