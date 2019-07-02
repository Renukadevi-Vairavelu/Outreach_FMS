import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router';
import {  ReactiveFormsModule, 
  FormsModule 
 } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTableModule,ButtonModule,CalendarModule,MessageModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
//import { ChartsModule } from 'ng2-charts';
//import { char } from 'ng2-charts-schematics'

//import { TableModule } from 'primeng/ble';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DropdownModule} from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EventsComponent } from './admin/events/events.component';
import {InputTextModule} from 'primeng/inputtext';
import { EventEnrollmentComponent } from './event-enrollment/event-enrollment.component';
import { EventsAttendanceComponent } from './admin/events-attendance/events-attendance.component';
import { SendFeedbackComponent } from './admin/send-feedback/send-feedback.component';
import { EventsChartComponent } from './Reports/events-chart/events-chart.component';
import { EventLocationChartComponent } from './Reports/event-location-chart/event-location-chart.component';
import { EventFeedbackscoreChartComponent } from './Reports/event-feedbackscore-chart/event-feedbackscore-chart.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    EventsComponent,
    EventEnrollmentComponent,
    EventsAttendanceComponent,
    SendFeedbackComponent,
    EventsChartComponent,
    EventLocationChartComponent,
    EventFeedbackscoreChartComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    DropdownModule,
    MessageModule,
   // TableModule,
   ChartModule,
   //ChartsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule.forRoot([
      {
        path:'home',
        component:LoginComponent
      },
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'attendance',
        component:EventsAttendanceComponent
      },
      {
          path:'enrollement',
          component: EventEnrollmentComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'eventsEnrollment',
        component:EventsChartComponent
      },
      {
        path: 'eventsParticipation',
        component:EventLocationChartComponent
      },
      {
        path: 'eventsFeedback',
        component:EventFeedbackscoreChartComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'feedback',
        component: SendFeedbackComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
