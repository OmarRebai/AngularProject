import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  constructor(private eventService: EventService) {}
  displayedColumns: string[] = [
    'id',
    'title',
    'dateDebut',
    'dateFin',
    'lieu',
    'actions',
  ];

  dataSource = new MatTableDataSource(this.eventService.tabEvent);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetch(): void {
    this.eventService.getAllEvents().subscribe((tab) => {
      this.dataSource = new MatTableDataSource(tab);
    });
  }

  handleButtonClick(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService.deleteEventById(id).subscribe(() => {
          this.fetch();
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
