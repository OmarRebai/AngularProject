import { Component } from '@angular/core';
import { Member } from 'src/models/member';
import { GLOBAL } from '../app-config';
import { MemberService } from 'src/services/member.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  constructor(private memberService: MemberService) {}
  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'createdDate',
    'cv',
    'type',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.memberService.tab);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetch(): void {
    this.memberService.getAllMembers().subscribe((tab) => {
      this.dataSource = new MatTableDataSource(tab);
    });
  }
  handleButtonClick(id: string): void {
    //lancer la boite
    this.memberService.deleteMemberById(id).subscribe(() => {
      this.fetch();
    });
  }
}
