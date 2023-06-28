import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

interface UserLoginInput {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private http: HttpClient) {}

  public get isLoggedIn(): boolean {
    return false;
  }

  public login(data: UserLoginInput): Subscription {
    return new Subscription();
  }
}
