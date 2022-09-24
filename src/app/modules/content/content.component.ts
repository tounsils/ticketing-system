import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  contents: any = [];
  contentForm: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  public categoryId = '';
  content: string;
  constructor(
    private apiService: ApiService,
    private modalService: BsModalService,
    public helper: HelperService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.categoryId = this.route.snapshot.params.id;
    this.getContents();

  }

  ngOnInit(): void {
    this.buildContentForm();
  }

  buildContentForm() {
    this.contentForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['']
    });
  }

  get f() {
    return this.contentForm.controls;
  }

  getContents() {
    this.apiService.getContents(this.categoryId).subscribe(
      (res: any) => {
        this.contents = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addContent() {
    this.submitted = true;
    if (this.contentForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('categoryId', this.categoryId);
    formData.append('title', this.contentForm.get('title').value);
    formData.append('description', this.contentForm.get('description').value);
    formData.append('image', this.contentForm.get('image').value);
    this.apiService.addContent(formData).subscribe(
      (res: any) => {
        this.helper.showSuccess(res.message);
        this.getContents();
        this.modalRef.hide();
        this.contentForm.reset();
      },
      (err) => console.log(err)
    );
  }

  openContentModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModel() {
    this.modalRef.hide();
  }

  handleFileInputData(event) {
    this.contentForm.patchValue({
      image: event.target.files[0]
    });
  }

}
