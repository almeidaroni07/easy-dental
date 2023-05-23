import { Component, ViewChild, TemplateRef, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth, addHours, startOfHour, endOfHour } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { AgendamentoService } from 'src/app/core/agendamento/agendamento.service';
import { Agenda } from 'src/app/core/model/agenda';
import { ModalStatusAgendamentoComponent } from '../../modal/agendamento/modal-status-agendamento/modal-status-agendamento.component';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Output() passMessage: EventEmitter<any> = new EventEmitter();

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

  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Atualizar status',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        const modal = this.modalService.open(ModalStatusAgendamentoComponent, this.configModal);
          modal.componentInstance.id = event.id;
          modal.componentInstance.passMessage.subscribe((response: Response) => {
          this.passMessage.emit(response);
        })
      },
    }
  ];


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
        for (let agendamento of agenda.agendamentos) {
          this.events.push({

            start: startOfHour(new Date(agendamento.inicio)),
            end: endOfHour(new Date(agendamento.fim)),
            title: '<h6 class="">'+agendamento.paciente+'</h6><br>'+agendamento.procedimento,
            color: {
              primary: agendamento.cor.primary,
              secondary: agendamento.cor.primary
            },
            id: agendamento.agendamentoID,
            actions: this.actions,
            cssClass: ''
          })
        }

      });
    } catch (error) {
      console.error(error);
    }
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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

}
