import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth} from 'angularfire2/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login();
  }
}
