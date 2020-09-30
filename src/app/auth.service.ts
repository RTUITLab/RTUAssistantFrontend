import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BackendApiService } from './backend-api.service';

export interface AuthData {
  access_token: string,
  refresh_token: string,
  logged: boolean
};

const protoAuthData: AuthData = {
  access_token: '',
  refresh_token: '',
  logged: false
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: BackendApiService) { }

  public authData: BehaviorSubject<AuthData> = new BehaviorSubject<AuthData>(protoAuthData);


  refreshInterval;
  intervalWorking: boolean;

  login(login: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      this.api.AuthLogin({
        login,
        password
      }).then((response) => {
        if(response.status == 'ok') {
          this.authData.next({
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            logged: true
          });
          this.startRefresher();
        } else {
          console.log('server error: ' + response.error);
          this.authData.next(JSON.parse(JSON.stringify(protoAuthData)));
          this.stopRefresher();
        }
        resolve();
      }, (err) => {
        console.log('http error: ' + err);
        this.authData.next(JSON.parse(JSON.stringify(protoAuthData)));
        this.stopRefresher();
      });
    })
  }

  refresh() {
    return new Promise<void>((resolve, reject) => {
      this.api.AuthRefresh({
        refresh_token: this.authData.value.refresh_token
      }).then((response) => {
        if(response.status == 'ok') {
          this.authData.next({
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            logged: true
          })
        } else {
          console.log('server error: ' + response.error);
          this.authData.next(JSON.parse(JSON.stringify(protoAuthData)));
          this.stopRefresher();
        }
        resolve();
      }, (err) => {
        console.log('http error: ' + err);
        this.authData.next(JSON.parse(JSON.stringify(protoAuthData)));
        this.stopRefresher();
      });
    })
  }


  startRefresher() {
    if(!this.intervalWorking) {
      this.refreshInterval = setInterval(() => {
        console.log('[Refresher] Refreshing...');
        this.refresh().then(() => {
          console.log('[Refresher] Refreshed'); 
        });
        
      }, 1000);
      this.intervalWorking = true;
      console.log('[Refresher] Started')
    }
  }

  stopRefresher() {
    if(this.intervalWorking) {
      clearInterval(this.refreshInterval);
      console.log('[Refresher] Stopped')
    }
  }

}
