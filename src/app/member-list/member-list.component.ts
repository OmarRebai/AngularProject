import { Component } from '@angular/core';
import { Member } from 'src/models/member';
import { GLOBAL } from '../app-config';
import { MemberService } from 'src/services/member.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

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
        this.memberService.deleteMemberById(id).subscribe(() => {
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
