import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/admin/events/events.model';
import { FMSserviceService } from 'src/app/fmsservice.service';

@Component({
  selector: 'app-event-location-chart',
  templateUrl: './event-location-chart.component.html',
  styleUrls: ['./event-location-chart.component.css']
})
export class EventLocationChartComponent implements OnInit {

  constructor(private objService: FMSserviceService) { }

  data: any;
  labels: any[] = [];
  chartData: any[] = [];
  backGroundColours: any[] = [];
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  options:any;
  ngOnInit() {
    console.log("hi");
    this.objService.GetEventParticipation().subscribe(resp => {
      this.data = resp;
      console.log(this.data);
      for (var j = 0; j < this.data.length; j++) {
        this.labels.push(this.data[j]._id);
        this.chartData.push(this.data[j].Enrollments);

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
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 2,
              beginAtZero: true
            }
          }]
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
