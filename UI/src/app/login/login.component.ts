import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router'
import {FMSserviceService} from '../../app/fmsservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FMSserviceService]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    
  }

/*onSubmit()
{
  this.router.navigate(['admin']);
//route
}*/
}
