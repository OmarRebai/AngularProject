import { Component } from '@angular/core';
import { Member } from 'src/models/member';
import { GLOBAL } from '../app-config';
const ELEMENT_DATA: Member[] = GLOBAL._DB.members;

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  displayedColumns: string[] = [
    'id',
    'cin',
    'name',
    'createdDate',
    'cv',
    'type',
    'edit',
  ];
  dataSource = ELEMENT_DATA;
}
