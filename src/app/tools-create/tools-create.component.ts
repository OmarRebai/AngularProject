import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsComponent } from '../tools/tools.component';
import { Tool } from 'src/models/tool';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css'],
})
export class ToolsCreateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ToolsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool
  ) {}

  ngOnInit() {
    if (!!this.data) {
      this.form = this.fb.group({
        date: this.fb.control(this.data.date, [Validators.required]),
        source: this.fb.control(this.data.source, [Validators.required]),
        createur: this.fb.control(this.data.createur, [Validators.required]),
      });
    } else {
      this.form = this.fb.group({
        date: this.fb.control(null, [Validators.required]),
        source: this.fb.control(null, [Validators.required]),
        createur: this.fb.control(null, [Validators.required]),
      });
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
