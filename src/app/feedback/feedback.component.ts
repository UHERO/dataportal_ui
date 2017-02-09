import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  private feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.feedbackForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'feedback': ['', Validators.required],
      // 'captcha': [Boolean, Validators.required, Validators.requiredTrue]
    });

    this.feedbackForm.valueChanges.subscribe(data => console.log(data));

    this.onValueChanged();
  }

  onValueChanged(data? :any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const message = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'name': '',
    'email': '',
    'feedback': ''
  }

  validationMessages = {
    'name': {
      'required': 'Name is required.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'feedback': {
      'required': 'Feedback is required.'
    }
  }

  resolved(e) {
    console.log('event', e)
  }
}
