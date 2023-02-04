import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client, Clients } from '../model/client.model';

import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
})
export class ListClientsComponent {
  visible:boolean =  false
  itemSelectd!:Client

  columns = [
    {
      key: 'name',
      label: 'Nome',
      _style: { width: '40%' },
    },
    { key: 'email', label: 'Email', filter: true, sorter: true },
    { key: 'cellFone', label: 'Contato', _style: { width: '20%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
    },
  ];

  constructor(public serviceClients: ClientsService, private router: Router) {}

  ngOnInit() {
    this.listClients();
  }

  listClients() {
    this.serviceClients.get().subscribe({
      next: (response) => {
        this.serviceClients.clients = response;
        this.serviceClients.clients.forEach((item)=>{
          item.id = item._id
        })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  checkSelected($event: any) {
    console.log($event);
  }


  getBadge(status: string) {
    switch (status) {
      case 'Adimplente':
        return 'success';
      case 'Inadimplente':
        return 'warning';
      default:
        return 'primary';
    }
  }
  getItem(item: any) {
    return Object.keys(item);
  }

  details_visible = Object.create({});

  toggleDetailst(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }

  deleteItem(id: String,_id:number){
    this.serviceClients.delete(id).subscribe({
      next: response => {
       this.serviceClients.clients.filter(item => item.id != id)
      },
      error: err =>{
        console.log(err)
      }
    })
  }

  handleLiveDemoChange(item:Client){
    this.itemSelectd = item
    this.serviceClients.visibleModalConfirm = !this.serviceClients.visibleModalConfirm
  }

  perfilClient(client: Client){
    this.router.navigate(['/clients/'+ client.id])
  }
}
