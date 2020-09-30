import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { BackendApiService } from './backend-api.service';

const protoStatus = {
  busy: false,
  loggedin: false,
  status: 'idle',
};

const protoData = {
  user: {
    id: 0,
    name: ''
  }
};

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  constructor(private auth: AuthService, private api: BackendApiService, private router: Router) { }


  public status: BehaviorSubject<any> = new BehaviorSubject<any>(protoStatus);
  public data: BehaviorSubject<any> = new BehaviorSubject<any>(protoData);

}
