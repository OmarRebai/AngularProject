import { Component } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { ArticleService } from 'src/services/article.service';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tab!: number[];
  tabType!: number[];
  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: this.getNumber(),
    },
  ];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {};

  chartDataType: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: this.getTypeNumber(),
    },
  ];
  chartLabelsType: string[] = ['Chercheur', 'Enseignant'];
  chartOptionsType: ChartOptions = {};

  nbMembers: number = 0;
  nbArticles: number = 0;
  nbEvents: number = 0;
  nbTools: number = 0;
  constructor(
    private memberService: MemberService,
    private articleService: ArticleService,
    private toolService: ToolService,
    private eventService: EventService
  ) {
    this.nbMembers = this.memberService.tab.length;
    // this.nbArticles = this.articleService.tab;
    this.nbTools = this.toolService.tab.length;
    this.nbEvents = this.eventService.tabEvent.length;

    for (let i = 0; i < this.nbMembers; i++) {
      this.chartLabels.push(this.memberService.tab[i].name);
    }
  }

  getNumber(): number[] {
    this.memberService.getNbPubMembers().subscribe((nb) => {
      this.tab = nb;
      return nb;
    });
    return this.tab;
  }

  getTypeNumber(): number[] {
    this.memberService.getNbTypeMembers().subscribe((nb) => {
      this.tabType = nb;
      return nb;
    });
    return this.tabType;
  }
}
