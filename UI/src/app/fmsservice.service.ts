import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../src/environments/environment.prod';
import {Events} from '../../src/app/admin/events/events.model';
import { Enrollment } from 'src/app/event-enrollment/enrollment.model';
//import { Observable} from'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class FMSserviceService {

  constructor(private httpClient: HttpClient) { }
 
  //Insert Event details 
  postEvent(objEvent: Events)
  {
    return this.httpClient.post(environment.apiBaseUrl+'/createEvent', objEvent);
  }
  editEvent(objEvent: Events)
  {
    return this.httpClient.put(environment.apiBaseUrl+'editEvent/'+objEvent.EventId+'',objEvent);
  }
  GetAllEvents()
  {
    return this.httpClient.get(environment.apiBaseUrl+'/ShowEvents');
  }

  DeleteEvent(EventId)
  {    
    return this.httpClient.delete(environment.apiBaseUrl+'deleteEvent/'+EventId+'');
  }

  //Enrollment
  postEnrollment(objEnrollment: Enrollment)
  {
    return this.httpClient.post(environment.apiBaseUrl+'/createEnrollment', objEnrollment);
  }

  GetEnrollments()
  {
    return this.httpClient.get(environment.apiBaseUrl+'/ShowEnrollment');
  }

  EditEnrollments(objEnrollment: Enrollment, eventId: number)
  {
    return this.httpClient.put(environment.apiBaseUrl+'/editEnrollment/'+ eventId,objEnrollment);
    
  }
                 
  DeleteEnrollments(eventId,empId)
  {
    return this.httpClient.delete(environment.apiBaseUrl+'/deleteEnrollment/'+eventId+'/'+empId);
  }

  GetNoOfEnrollments()
  {
    return this.httpClient.get(environment.apiBaseUrl+ '/getEventEnrollmentsRatio');
  }

  SendMail(EventId)
  {    
    return this.httpClient.get(environment.apiBaseUrl+'sendMail/'+EventId+'');
  }
  GetEventParticipation(){
    return this.httpClient.get(environment.apiBaseUrl+ '/getEventParticipationRatio/' );
  }
  GetEventFeedbackScore(){
    return this.httpClient.get(environment.apiBaseUrl+ '/getEventFeedbackScoreRatio');
  }
}
