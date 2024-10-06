import { ErrorHandler, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export class httpError implements Error {

  constructor(_message: string, _errorCode: number, _name: string) {
    this.name = _name;
    this.errorCode = _errorCode;
    this.message = _message;
  }

  message: string;
  name: string;
  errorCode: number;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(
  ) {
  }

  handleError(error: any) {
    throw error.error;
  }

  catchError(error): any {
    var status = error.status;
    switch (status) {
      case 400:
        return this.handleError(error);
      case 401:
        return throwError(() => new httpError("Invalid sesion !", error.status, "401"));
      case 404:
        return this.handleError(error);
      case 500:
        return throwError(() => new httpError("SERVER ERROR..!", error.status, "500"));
      default:
        return throwError(() => new httpError("SERVER ERROR..!", error.status, "500"));
    }
  }

}
