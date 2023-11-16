import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      cin: this.fb.control(null, [Validators.required]),
      name: this.fb.control(null, [Validators.required]),
      cv: this.fb.control(null, []),
      type: this.fb.control(null, [Validators.required]),
    });
  }

  addMember(): void {
    const member = {
      ...this.form.value,
      id: Math.ceil(Math.random() * 1000),
      createdDate: new Date().toLocaleDateString(),
    };
    this.memberService.addMember(member).subscribe({
      next: (response: Member) => {
        console.log(response);
        this.router.navigate(['/members']);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
