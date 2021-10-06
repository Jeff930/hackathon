import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public apisrvc: ApiService) { }

  ngOnInit(): void {
  }

  register(){
    this.apisrvc.updateUserDetails().subscribe(res => {
      console.log(res);
    });
  }
}


