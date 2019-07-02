import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from '../../fmsservice.service';
import { FormsModule, FormGroup } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { Events } from './events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private objService: FMSserviceService) { }

  EventName: string;
  EventDate: any;
  Baselocation: string;
  Project: string;
  EventPOCId: number;
  EventPOCName: string;
  Events: any = [];
  cols: any[];
  //clonedEvents: { [s: string]: Events; } = {};
  
  
  delRow;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    this.loadGrid();
    //    this.cols = [
    //     { field: 'EventName', header: 'EventName' },
    //     { field: 'EventDate', header: 'EventDate' },
    //     { field: 'Location', header: 'Location' },
    //     { field: 'Project', header: 'Project' },
    //     { field: 'POCId', header: 'POCId' },
    //     { field: 'POCName', header: 'POCName' }
    // ];

  }

  loadGrid() {
    this.objService.GetAllEvents().subscribe((EventObj: Events[]) => {
      this.Events = EventObj;
      console.log(this.Events);
    },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }
  editRow(row) {
    this.Events.filter(row => row.isEditable).map(r => { r.isEditable = false; return r })
    row.isEditable = true;


  }
  cancelRow(row) {
    this.Events.filter(row => row.isEditable).map(r => { r.isEditable = true; return r })
    row.isEditable = false;


  }

 /* onRowEditInit(evnt: Events) {
    this.clonedEvents[evnt.EventDate] = {...evnt};
}

onRowEditCancel(evnt: Events, index: number) {
  this.Events[index] = this.clonedEvents[evnt.EventId];
  delete this.clonedEvents[evnt.EventId];
}*/



  save(row) {
    var objEvent = new Events();
    objEvent.EventName = row.EventName;
    objEvent.EventDate = row.EventDate;
    objEvent.Baselocation = row.Baselocation;
    objEvent.Project = row.Project;
    objEvent.EventPOCId = row.EventPOCId;
    objEvent.EventPOCName = row.EventPOCName;
    objEvent.EventId = row.EventId;
    console.log(objEvent.EventId);
    if (objEvent.EventName == undefined || objEvent.EventName == '') {
      alert('EventName is required');
      return false;

    }
    if (objEvent.EventDate == undefined || objEvent.EventDate == '') {
      alert('EventDate is required');
      return false;

    }
    if (objEvent.Baselocation == undefined || objEvent.Baselocation == '') {
      alert('Location is required');
      return false;

    }
    if (objEvent.Project == undefined || objEvent.Project == '') {
      alert('Project is required');
      return false;

    }
    if (objEvent.EventPOCId == undefined || objEvent.EventPOCId == 0) {
      alert('EventPOCId is required');
      return false;

    }
    if (objEvent.EventPOCName == undefined || objEvent.EventPOCName == '') {
      alert('EventPOCName is required');
      // return false;

    }
    if (objEvent.EventId == undefined) {
      this.objService.postEvent(objEvent).subscribe(
        res => {
          this.showSucessMessage = true;
          this.loadGrid();
          setTimeout(() => this.showSucessMessage = false, 4000);
          //this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
    else if (objEvent.EventId != undefined) {
      this.objService.editEvent(objEvent).subscribe(
        res => {
          this.showSucessMessage = true;
          this.loadGrid();
          setTimeout(() => this.showSucessMessage = false, 4000);
          //this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
            this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      );
    }
    row.isEditable = false;

  }


  addNew() {
    this.Events.push({
      EventName: '',
      EventDate: '',
      Location: '',
      Project: '',
      POCId: '',
      POCName: ''
    })
    this.Events[this.Events.length - 1].isEditable = true;
  }

  delete(row) {
    console.log(row);
    this.delRow = this.Events.indexOf(row);
    this.Events.splice(this.delRow, 1);
    this.objService.DeleteEvent(row.EventId).subscribe(
      res => {
        this.showSucessMessage = true;
        this.loadGrid();
        setTimeout(() => this.showSucessMessage = false, 4000);
        //this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );

  }
  /* onSubmit()
   {
    var objEvent = new Event();
    objEvent.EventName = this.EventName;
    objEvent.EventDate = this.EventDate;
    objEvent.Location = this.Location;
    objEvent.Project = this.Project;
    objEvent.POCId = this.POCId;
    objEvent.POCName = this.POCName;
     this.objService.postEvent(objEvent).subscribe(
       res => {
         this.showSucessMessage = true;
         setTimeout(() => this.showSucessMessage = false, 4000);
         //this.resetForm(form);
       },
       err => {
         if (err.status === 422) {
           this.serverErrorMessages = err.error.join('<br/>');
         }
         else
           this.serverErrorMessages = 'Something went wrong.Please contact admin.';
       }
     );
    
     //alert(objEvent.POCName);
     //var objEvent = new     
   }*/

}
