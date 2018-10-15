import { Component } from '@angular/core';
import { FormControl, Validators, NgForm} from '@angular/forms';
import { InformationService } from '../information.service';

@Component(
  {
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

  }
)
export class PostCreateComponent {
  enteredName = '';
  enteredMonth = '';
  
  constructor(public informationService: InformationService) {}
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.informationService.addPost(
      form.value.name,
      form.value.month,
    );
    form.resetForm();
  }
}