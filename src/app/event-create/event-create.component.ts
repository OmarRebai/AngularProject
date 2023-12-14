import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/models/evenement';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent implements OnInit {
  form!: FormGroup;
  event!: Evenement;
  constructor(
    private readonly fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!!params['id']) {
        this.eventService.getEventById(params['id']).subscribe({
          next: (response: Evenement) => {
            this.event = response;
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
      title: this.fb.control(null, [Validators.required]),
      dateDebut: this.fb.control(<Date | null>null, [Validators.required]),
      dateFin: this.fb.control(<Date | null>null, [Validators.required]),
      lieu: this.fb.control(null, [Validators.required]),
    });
    // start: new FormControl<Date | null>(null),
    // end: new FormControl<Date | null>(null),
  }
  initFormEdit(event: Evenement): void {
    this.form = this.fb.group({
      title: this.fb.control(event.title, [Validators.required]),
      dateDebut: this.fb.control(event.dateDebut, [Validators.required]),
      dateFin: this.fb.control(event.dateFin, [Validators.required]),
      lieu: this.fb.control(event.lieu, [Validators.required]),
    });
  }

  addEvent(): void {
    // console.log(this.form.value);
    const event1 = {
      ...this.event,
      ...this.form.value,
    };
    const event2 = {
      ...event1,
      id: event1.id ?? Math.ceil(Math.random() * 1000),
      dateDebut: event1.dateDebut ?? new Date().toLocaleDateString(),
      dateFin: event1.dateFin ?? new Date().toLocaleDateString(),
    };
    this.eventService.addEvent(event1).subscribe({
      next: (response: Evenement) => {
        console.log(response);
        this.router.navigate(['/events']);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
