import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

import { Client } from '../model/client.model';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-perfil-clients',
  templateUrl: './perfil-clients.component.html',
  styleUrls: ['./perfil-clients.component.scss'],
})
export class PerfilClientsComponent {
  idClient!: String;
  client$!: Client;
  states!: any;
  cities!: any;

  PerfilClientForm!: FormGroup;

  typePerson = [
    {
      type: 'Física',
      value: 'F',
    },
    {
      type: 'Jurídica',
      value: 'J',
    },
  ];

  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
  
    this.PerfilClientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      typePerson: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      city: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      address: ['', [Validators.required]],
      district: ['', [Validators.required]],
      number: ['', [Validators.required]],
      telFone: [''],
      cellFone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      profession: [''],
      complement: [''],
      obs: [''],
    });

    this.idClient = this.activatedRoute.snapshot.params?.['id'];
    this.getStates()
  }

  perfilClient() {
    this.clientService.getClientById(this.idClient).subscribe({
      next: (response) => {
        this.client$ = response;
        this.client$.birthDate = moment(this.client$.birthDate).format('YYYY-MM-DD')
        console.log(this.client$);
        this.selectedState(this.client$?.uf);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getStates() {
    this.clientService.getStates().subscribe({
      next: (response) => {
        console.log(response);
        this.states = response;
        this.perfilClient()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  selectedState(state: any) {
    this.cities = [];
    let sigla = state;
    this.clientService.getCities(sigla).subscribe({
      next: (response) => {
        this.cities = response[0];
        console.log(this.cities);
      },
      error: (err) => {
        console.log({ err: err });
      },
    });
  }
  update() {}
}
