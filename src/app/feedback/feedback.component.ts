import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public feedbackForm: FormGroup;
  public successMsg: string;
  public errorMsg: string;
  private hideAlert: Boolean = true;
  constructor(private fb: FormBuilder, private http: Http) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.feedbackForm = this.fb.group({
      'name': [''],
      'email': [''],
      'feedback': ['', Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  reset() {
    this.successMsg = '';
    this.errorMsg = '';
  }

  onSubmit() {
    this.hideAlert = false;
    const headers = new Headers();
    headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
    const requestOptionsArgs = { headers: headers };
    const feedback = { data: { name: '', email: '', feedback: '' }, 'g-recaptcha-response': '' };
    feedback.data.name = this.feedbackForm.value.name;
    feedback.data.email = this.feedbackForm.value.email;
    feedback.data.feedback = this.feedbackForm.value.feedback;
    feedback['g-recaptcha-response'] = this.feedbackForm.value.captcha;
    return this.http.post('https://api.uhero.hawaii.edu/v1/feedback', JSON.stringify(feedback), requestOptionsArgs)
      .map((res: Response) => res.json())
      .subscribe(
      data => this.successMsg = 'Submission successful.',
      error => this.errorMsg = 'Something went wrong. Try again.',
      () => {
        setTimeout(() => {
          this.hideAlert = true;
        }, 3000);
      });
  }
}
