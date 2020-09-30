import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

export interface AuthLoginRequest{
  login:string;
  password:string;
}

export interface AuthLoginResponse{
  status: string;
  error?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface AuthRefreshRequest{
  refresh_token: string;
}

export interface AuthRefreshResponse{
  status: string;
  error?: string;
  access_token?: string;
  refresh_token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  private serverURL: string = "https://349b322c82d0.ngrok.io";
  

  async AuthLogin(request: AuthLoginRequest): Promise<AuthLoginResponse> {
    return new Promise<AuthLoginResponse>((resolve, reject) => {
      this.http.post<AuthLoginResponse>(this.serverURL + '/auth/login', request).subscribe(response => resolve(response), (err: HttpErrorResponse) => reject(err))
    });
  }
 
  async AuthRefresh(request: AuthRefreshRequest): Promise<AuthRefreshResponse> {
    return new Promise<AuthRefreshResponse>((resolve, reject) => {
      this.http.post<AuthRefreshResponse>(this.serverURL + '/auth/refresh-token', request).subscribe(response => resolve(response), (err: HttpErrorResponse) => reject(err))
    });
  }
}
