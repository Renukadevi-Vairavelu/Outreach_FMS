import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/admin/events/events.model';
import { FMSserviceService } from 'src/app/fmsservice.service';

@Component({
  selector: 'app-event-feedbackscore-chart',
  templateUrl: './event-feedbackscore-chart.component.html',
  styleUrls: ['./event-feedbackscore-chart.component.css']
})
export class EventFeedbackscoreChartComponent implements OnInit {

  constructor(private objService: FMSserviceService) { }
  
    data: any;
    labels: any[] = [];
    chartData: any[] = [];
    backGroundColours: any[] = [];
    showSuccessMessage: boolean;
    serverErrorMessages: string;
   options:any;
    ngOnInit() {
      this.objService.GetEventFeedbackScore().subscribe(resp => {
        this.data = resp;
        console.log(this.data);
        for (var j = 0; j < this.data.length; j++) {
          this.labels.push(this.data[j]._id);
          this.chartData.push(this.data[j].AverageScore);
  
        }
  
        let dynamicColors = function () {
          let r = Math.floor(Math.random() * 255);
          let g = Math.floor(Math.random() * 255);
          let b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
          //return "#FCFCFD"
        };
  
        for (var i in this.data) {
          this.backGroundColours.push(dynamicColors());
        }
        this.options = {
          legend: {
              display: false
          }
      };
  
        this.data = {
          labels: this.labels,
          datasets: [
           
            {
              data: this.chartData,
              backgroundColor: this.backGroundColours,
              hoverBackgroundColor: this.backGroundColours
            }]
        };
  
      })
  
    }
  
  }
  
