import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { map, switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/of';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth:AngularFireAuth, private router:ActivatedRoute, private userService:UserService) {
    this.user$ = afAuth.authState;
   }

  login(){
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log("returnUrl: " +  this.router.snapshot.queryParamMap.get('returnUrl'))
    alert("sdfsdf")
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(switchMap(user =>{
       if (user) return this.userService.get(user.uid).valueChanges();
       return Observable.of(null);
    }));
  }
}
