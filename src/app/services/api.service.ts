import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  signupUser() {
   // var hashedPassword = JSON.stringify(Md5.hashStr(formData.password));
    const body = new HttpParams()
      .set('firstname', "Test")
      .set('lastname',"Test")
      .set('email', "Test")
      .set('password',"Test")
    return this.http.post<any>('http://localhost:3000/user-signup', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  loginUser() {
    var form = {
        email:"Test",
        password:"Test",
    }
    return this.http.get<any>('http://localhost:3000/user-login/'+JSON.stringify(form));
  }

  getUserDetails() {
    return this.http.get<any>('http://localhost:3000/user-details/9');
  }

  updateUserDetails() {
    const body = new HttpParams()
      .set('firstname', 'test-edit')
      .set('userId', 7)
      .set('ratingId', '1')
      .set('crewId', '1')
    return this.http.post<any>('http://localhost:3000/update-user-details', body.toString(),
     { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }
}
