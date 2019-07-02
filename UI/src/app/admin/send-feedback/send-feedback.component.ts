import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from 'src/app/fmsservice.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Events } from 'src/app/admin/events/events.model';
@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent implements OnInit {
  
  Events: Events[];
  SelectedEvents: number;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  selectedEvents: string;
  constructor(private objService: FMSserviceService) { }

  ngOnInit() {

   
    this.objService.GetAllEvents().subscribe((EventObj: Events[]) => {
      this.Events = EventObj;
     // console.log(this.Events);
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

  SentFeedback(value: string)
  {
    console.log(this.selectedEvents);
    this.objService.SendMail( this.selectedEvents).subscribe(
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
  }

}

