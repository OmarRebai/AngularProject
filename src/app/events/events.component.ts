import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  constructor(private eventService: EventService) {}
  displayedColumns: string[] = ['id', 'title', 'dateDebut', 'dateFin', 'lieu'];

  dataSource = new MatTableDataSource(this.eventService.tabEvent);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
