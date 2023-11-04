import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  isloggedin:boolean;
  constructor(private router:Router){
    this.isloggedin=false;
  }
  canActivate():boolean
  {
    if(this.isloggedin){
      return true;
    }
      else{
        this.router.navigate(['/login']);
        return false;
      }
  }
}
