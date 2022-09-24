import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  categoryForm: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  categoryId: any;
  constructor(
    private apiService: ApiService,
    private modalService: BsModalService,
    public helper: HelperService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildCategoryForm();
    this.getCategories();
  }

  get f() {
    return this.categoryForm.controls;
  }

  buildCategoryForm() {
    this.categoryForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  addCategory() {
    this.submitted = true;
    if (this.categoryForm.invalid) {
      return;
    }
    const data: any = {
      title: this.categoryForm.value.title,
      description: this.categoryForm.value.description
    };
    if (!this.categoryId) {
      this.apiService.addCategory(data).subscribe(
        (res: any) => {
          this.helper.showSuccess(res.message);
          this.getCategories();
          this.modalRef.hide();
        }, (err) => console.log(err)
      );
    } else {
      data.id = this.categoryId;
      this.apiService.updateCategory(data).subscribe(
        (res: any) => {
          this.helper.showSuccess(res.message);
          this.getCategories();
          this.modalRef.hide();
        },
        (err) => console.log(err)
      );
    }
  }

  deleteCategory(id) {
    const data: any = {};
    data.id = id;
    this.apiService.deleteCategory(data).subscribe((res: any) => {
      this.helper.showSuccess(res.message);
      this.getCategories();
    }, err => console.log(err));
  }

  logout() {
    this.helper.clearLocalstorage();
    this.router.navigate(['/login']);
  }

  openCategoryModal(template: TemplateRef<any>, id?, index?) {
    this.categoryId = id ? id : null;
    if (this.categoryId) {
      this.categoryForm.get('title').setValue(this.categories[index].title);
      this.categoryForm.get('description').setValue(this.categories[index].description);
    }
    this.modalRef = this.modalService.show(template);
  }

  closeModel() {
    this.categoryId = null;
    this.modalRef.hide();
  }
}
