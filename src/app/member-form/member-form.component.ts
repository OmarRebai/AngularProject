import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMiniFabAnchor } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  member!: Member;
  constructor(
    private readonly fb: FormBuilder,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!!params['id']) {
        this.memberService.getMemberById(params['id']).subscribe({
          next: (response: Member) => {
            this.member = response;
            this.initFormEdit(response);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      cin: this.fb.control(null, [Validators.required]),
      name: this.fb.control(null, [Validators.required]),
      cv: this.fb.control(null, []),
      type: this.fb.control(null, [Validators.required]),
    });
  }
  initFormEdit(member: Member): void {
    this.form = this.fb.group({
      cin: this.fb.control(member.cin, [Validators.required]),
      name: this.fb.control(member.name, [Validators.required]),
      cv: this.fb.control(member.cv, []),
      type: this.fb.control(member.type, [Validators.required]),
    });
  }

  addMember(): void {
    const member1 = {
      ...this.member,
      ...this.form.value,
    };
    const member2 = {
      ...member1,
      id: member1.id ?? Math.ceil(Math.random() * 1000),
      createdDate: member1.createdDate ?? new Date().toLocaleDateString(),
    };
    this.memberService.addMember(member1).subscribe({
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
