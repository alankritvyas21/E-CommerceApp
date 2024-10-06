import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { playerProfile } from '../models/playerProfile';
import { from, Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Session } from '../models/session';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: playerProfile;
  private authUser: playerProfile;

  constructor(private firebaseAuth: Auth, private firestore: Firestore, private _sharedService: SharedService) {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    password: string
  ): Observable<playerProfile> {
    this.user = new playerProfile(firstName, lastName, email, mobile, address1, address2, city, state, country, pincode, password);

    const encodedPassword = this.btoa(this.user.password);
    this.user.password = encodedPassword;

    return from(
      createUserWithEmailAndPassword(this.firebaseAuth, this.user.email, this.user.password)
        .then(async userCredential => {
          const uid = userCredential.user?.uid;
          const userDocRef = doc(this.firestore, `users/${uid}`);
          const userData = this.user.parse(this.user);

          await setDoc(userDocRef, userData);
          // console.log('User profile saved:', userData);
          return userData;
        })
        .catch(error => {
          console.error('Registration failed:', error);
          this._sharedService.notyf.error('Registration failed');
          throw error;
        })
    );
  }


  login(email: string, password: string): Observable<playerProfile> {
    const encodedPassword = this.btoa(password); 

    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, encodedPassword)
        .then(async userCredential => {
          const uid = userCredential.user?.uid;
          if (uid) {
            const userDocRef = doc(this.firestore, `users/${uid}`);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data() as playerProfile;
              this.createAuthUser(userData);
              return userData;
            } else {
              // console.error("No such user data found in Firestore!");
              this._sharedService.notyf.error("User does not exist");
              throw new Error("User data not found");
            }
          }
          return null; 
        })
        .catch(error => {
          // console.error('Login failed:', error);
          this._sharedService.notyf.error('Login failed');
          throw error;
        })
    );
  }

  logout() {
    sessionStorage.setItem('userSession', ''); 
    this.authUser = null; 
    this._sharedService.notyf.success('Logout successful');
    this._sharedService.hideApiLoader();
    return this.firebaseAuth.signOut();
  }

  private btoa(value: string): string {
    return window.btoa(value);
  }

  private atob(value: string): string {
    return window.atob(value);
  }

  getSession(): Session | null {
    const sessionData = sessionStorage.getItem("userSession");
    return sessionData ? JSON.parse(this.atob(sessionData)) : null;
  }

  createAuthUser(_authUser: playerProfile) {
    const session = this.getSession() || { authUser: null }; 
    session.authUser = _authUser;
    sessionStorage.setItem("userSession", this.btoa(JSON.stringify(session)));
    this.authUser = _authUser; 
  }

  getAuthUser(): playerProfile | null {
    const session = this.getSession();
    if (session && session.authUser) {
      this.authUser = session.authUser;
      return this.authUser;
    }
    return null; 
  }
}
