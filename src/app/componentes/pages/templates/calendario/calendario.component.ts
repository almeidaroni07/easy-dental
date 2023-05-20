import { Component, ViewChild, TemplateRef, Input, OnInit} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addHours, startOfHour, endOfHour } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { Agenda } from 'src/app/core/model/agenda';
import { ModalCancelarAgendamentoComponent } from '../../modal/agendamento/modal-cancelar-agendamento/modal-cancelar-agendamento.component';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  configModal = {
    backdrop: false,
    ignoreBackdropClick: false,
    size: 'xl',
    centered: true
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Atualizar status',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa-regular fa-xmark"></i>',
      a11yLabel: 'Cancelar Agendamento',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [];

  constructor(private modalService: NgbModal,
              private service: AgendamentoService) {}


  ngOnInit(): void {
    this.updateAgendamentos();
  }


  updateAgendamentos(){
    try {
      this.events = [];
      this.service.getListAgendamento().subscribe(response =>{
        let agenda: Agenda | any = response;

        console.log(JSON.stringify(agenda));

        for (let agendamento of agenda.agendamentos) {
          this.events.push({

            start: startOfHour(new Date(agendamento.inicio)),
            end: endOfHour(new Date(agendamento.fim)),
            title: agendamento.paciente+' - '+agendamento.procedimento,
            color: agendamento.cor,
            actions: this.actions,

          })
        }

      });
    } catch (error) {
      console.error(error);
    }
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const modal = this.modalService.open(ModalCancelarAgendamentoComponent, this.configModal);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
