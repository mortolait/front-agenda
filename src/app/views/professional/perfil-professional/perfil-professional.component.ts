import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Professional } from '../model/professional.model';
import { ProfessionalService } from '../service/professional-service.service';

@Component({
  selector: 'app-perfil-professional',
  templateUrl: './perfil-professional.component.html',
  styleUrls: ['./perfil-professional.component.scss'],
})
export class PerfilProfessionalComponent {
  idProfessional!: String;
  professional$!: Professional;
  states!: any;
  cities!: any;

  PerfilProfessionalForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activetedRouter: ActivatedRoute,
    public serviceProfessional: ProfessionalService
  ) {}

  ngOnInit() {
    this.PerfilProfessionalForm = this.formBuilder.group({
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

    this.idProfessional = this.activetedRouter.snapshot.params?.['id'];

    this.perfilProfessional()
  }

  perfilProfessional() {
    this.serviceProfessional.getById(this.idProfessional).subscribe({
      next: (response) => {
        console.log(response);
        this.professional$ = response
        this.professional$.birthDate = moment(this.professional$.birthDate).format('YYYY-MM-DD')
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
}
