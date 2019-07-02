import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/admin/events/events.model';
import { FMSserviceService } from 'src/app/fmsservice.service';

@Component({
  selector: 'app-events-chart',
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.css']
})
export class EventsChartComponent implements OnInit {

  constructor(private objService: FMSserviceService) { }
  LoadPieChart: any;
  data: any;
  labels: any[] = [];
  chartData: any[] = [];
  backGroundColours: any[] = [];
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    this.objService.GetNoOfEnrollments().subscribe(resp => {
       this.data = resp;
      //this.chartData = new Array();
      ///this.labels = new Array();
      console.log(this.data);
      for (var j = 0; j < this.data.length; j++) {
        this.labels.push(this.data[j]._id);
        this.chartData.push(this.data[j].Count);
        
      } 

      let dynamicColors = function() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
        //return "#FCFCFD"
     };

     for (var i in this.data) {
         this.backGroundColours.push(dynamicColors());
     }


     console.log(this.backGroundColours);
     console.log(this.labels);
     console.log(this.chartData);
      this.data = {
        labels: this.labels,
        datasets: [
          {
            data: this.chartData,
          // data: [300, 50, 100,900,90,800,80,70,90],
            backgroundColor: this.backGroundColours,
           // hoverBackgroundColor: this.backGroundColours
          }]
      };
      console.log('111');
      // console.log('Label----' + this.labels);
      // console.log('value----' + this.chartData);
    })
 
    // this.data = EventObj;
    //console.log(this.Events);

    /*this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      };*/
  }

}
