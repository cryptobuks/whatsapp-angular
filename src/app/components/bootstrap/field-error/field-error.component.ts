import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from '../../../common/validation-message';

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.css'],
  host: {
    'class': 'valid-feedback'
  }
})
export class FieldErrorComponent implements OnInit {

  @Input()
  field: FormControl;
  @Input()
  label: string;
  @Input()
  messages;

  constructor() {
  }

  ngOnInit() {
  }

  get errorKeys() {
      return Object.keys(this.errors)
  }

  get errors() {
    /*console.log(this.field.errors);*/
    return this.field.errors;
  }

  showError() {
      return this.field.invalid && (this.field.dirty || this.field.touched);
  }

  getMessage(error) {
      let replaceTokens = [this.label];
      if (this.messages && this.messages.hasOwnProperty(error)) {
          if (Array.isArray(this.messages[error])) {
              replaceTokens = replaceTokens.concat(this.messages[error]);
          } else {
              replaceTokens.push(this.messages[error]);
          }
      }
      /*console.log(replaceTokens);*/
      return ValidationMessage.getMessage(error, replaceTokens);
  }


}
