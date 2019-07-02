import { Component, OnInit } from '@angular/core';
import { FMSserviceService } from 'src/app/fmsservice.service';
import { Enrollment } from 'src/app/event-enrollment/enrollment.model';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Events } from 'src/app/admin/events/events.model';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-event-enrollment',
  templateUrl: './event-enrollment.component.html',
  styleUrls: ['./event-enrollment.component.css'],
  providers: [MessageService]
})
export class EventEnrollmentComponent implements OnInit {
  userform: FormGroup;      
  AttendanceStatus: any;     
  Enrollments: any[];
  Events: Events[];
  SelectedEvents: number;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  submitted: boolean;
  constructor(private objService: FMSserviceService,private messageService: MessageService,private fb: FormBuilder,) { }

  ngOnInit() {

    this.userform = this.fb.group({
      'EventId': new FormControl('', Validators.required),
      'EmployeeId': new FormControl('', Validators.required),
      'EmployeeName': new FormControl('', Validators.required),
      'BusinessUnit': new FormControl('',Validators.required),
      'ContactNumber': new FormControl('', Validators.required),
      'MailId': new FormControl('', Validators.required)
  });
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

  Register(value: string)
  {
   
    this.submitted = true;
    var objEnrollment = new Enrollment();
    objEnrollment = this.userform.value;
    this.objService.postEnrollment(objEnrollment).subscribe(
     res => {
      this.showSucessMessage = true;
      alert('Registration Successful!!');
      this.userform.reset();
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
