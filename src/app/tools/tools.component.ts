import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolsCreateComponent } from '../tools-create/tools-create.component';
import { ToolService } from 'src/services/tool.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Tool } from 'src/models/tool';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent {
  constructor(private dialog: MatDialog, private toolService: ToolService) {}

  displayedColumns: string[] = ['id', 'createur', 'date', 'source'];

  dataSource = new MatTableDataSource(this.toolService.tab);

  //tebda lenna

  tool!: Tool;

  addTool(tool: Tool): void {
    const tool1 = {
      ...this.tool,
      ...tool,
    };
    const tool2 = {
      ...tool1,
      id: tool1.id ?? Math.ceil(Math.random() * 1000),
      date: tool1.date ?? new Date().toLocaleDateString(),
    };
    this.toolService.addTool(tool1).subscribe({
      next: (response: Tool) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  //toufa lenna

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ToolsCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.addTool(data);
      this.fetch();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetch(): void {
    this.toolService.getAllTools().subscribe((tab) => {
      this.dataSource = new MatTableDataSource(tab);
    });
  }
  handleButtonClick(id: string): void {
    //lancer la boite
    this.toolService.deleteToolById(id).subscribe(() => {
      this.fetch();
    });
  }
}
