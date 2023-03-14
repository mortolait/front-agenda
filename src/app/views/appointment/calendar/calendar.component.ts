import { AppointmentService } from './../services/appointment.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import allLocales from '@fullcalendar/core/locales-all';;
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import * as moment from 'moment-timezone';

// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import bootstrapPlugin from '@fullcalendar/bootstrap';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  today = new Date();
  todayStr: string = this.today.toISOString().replace(/T.*$/, '');
  viewTime = '17:00';
  timezone = 'America/Sao_Paulo';
  liveDemoVisible!:boolean


  events: any = [

  ];

  closeModal(){
    this.liveDemoVisible = false
  }
  handleLiveDemoChange($event:any){
    this.liveDemoVisible = !this.liveDemoVisible
  }
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
      listPlugin,
      timeGridPlugin,
      bootstrap5Plugin
    ],


    themeSystem: 'bootstrap5',
    locales: allLocales,
    locale: 'pt-br',
    timeZone: 'UTC',
    initialDate: this.todayStr,
    weekNumberCalculation: 'ISO',
    height: 'auto',
    contentHeight: 'auto',
    // aspectRatio: 2,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    editable: true,
    selectable: true,
    droppable: true,
    navLinks: true,
    events: this.events,

    // eventDidMount:function(info){
    //   console.log(info.event);
    // },
    dateClick: function (info) {
      //subir modal para cadastro de agendamento
      console.log('Clicked on: ' + info.dateStr);
      console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);

    },
    //event of doroppable
    // eventDragStart(arg) {
    //   console.log(arg.event.startStr);
    // },
    // eventDragStop(arg) {
    //   console.log(arg.event.startStr);
    //   console.log(arg);
    // },
    eventResizeStart(arg) {
      console.log(arg.event.startStr);

    },
    // eventClick(arg) {
    //   console.log("ola mundo")
    // },


    // eventDragMinDistance: 10,

    eventClick: this.handleLiveDemoChange.bind(this),
    // eventMouseEnter: function (info) {
    //   console.log(info.event);
    // },
  };

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendar: any;

  constructor(
    public appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.getAppointments()
  }

  AfterViewInit() {
    const calendarApi = this.calendarComponent.getApi();
    setTimeout(() => {
      calendarApi.updateSize();
    }, 1000);
  }


  getAppointments() {
    console.log(this.events)

    this.appointmentService.get().subscribe({
      next: (appointments) => {
        this.appointmentService.list = appointments

        console.log(this.appointmentService.list[0].date)
        console.log(moment(this.appointmentService.list[0].date).format('YYYY-MM-DD') + 'T' + this.appointmentService.list[0].time)

        this.appointmentService.list.forEach((appointment: any) => {
          console.log(appointment)
          this.calendarComponent.getApi().addEvent({
            title: appointment.service.name,
            extendedProps:{
              id: appointment._id
            },
            start: moment(appointment.date).format('YYYY-MM-DD')+ 'T' + appointment.time,
            color: '#51cc8a',
          })
        }
        )
      },
      error: (err) => console.log('Error', err)
    })

  }
}
