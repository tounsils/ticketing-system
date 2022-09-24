import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastrService: ToastrService) {
  }

  setLocalstorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalstorageValue(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalstorageString(key, value) {
    localStorage.setItem(key, value);
  }

  clearLocalstorage() {
    return localStorage.clear();
  }

  checkAuthorizedUser() {
    if (this.getLocalstorageValue('token')) {
      return true;
    } else {
      return false;
    }
  }

  showSuccess(message) {
    this.toastrService.success(message);
  }

  showError(message) {
    this.toastrService.error(message);
  }
}
