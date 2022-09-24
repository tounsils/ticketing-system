import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { httpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: any;
  constructor(public httpService: httpService, private helper: HelperService) { }

  signup(data) {
    return this.httpService.postWithoutHeader('/user/sign-up', data);
  }

  login(data) {
    return this.httpService.postWithoutHeader('/user/login', data);
  }

  addCategory(data) {
    const token = this.helper.getLocalstorageValue('token')
    return this.httpService.postWithHeader('/category', data, token);
  }

  getCategories() {
    return this.httpService.getWithHeader('/category', this.helper.getLocalstorageValue('token'));
  }

  updateCategory(data) {
    return this.httpService.putWithHeader('/category/' + data.id, data, this.helper.getLocalstorageValue('token'))
  }

  deleteCategory(data) {
    return this.httpService.deleteWithHeader('/category/' + data.id, this.helper.getLocalstorageValue('token'))
  }

  addContent(data) {
    return this.httpService.postWithHeader('/content', data, this.helper.getLocalstorageValue('token'));
  }

  getContents(categoryId) {
    return this.httpService.getWithHeader('/content/' + categoryId, this.helper.getLocalstorageValue('token'));
  }
}
