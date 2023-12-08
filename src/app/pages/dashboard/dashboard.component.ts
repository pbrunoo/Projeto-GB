import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { TeansUseCase } from 'src/app/core/usecase/teans/teans.usecase';
import { DashboardDataTicketUseCase } from 'src/app/core/usecase/dashboard/dashboard-data-ticket.usecase';
import { AverageTimeModel, DashBoardTicketModel, TicketUser } from 'src/app/core/model/dashboard/dashboard-ticket-data.model';
import { DashboardDataTicketTeamUseCase } from 'src/app/core/usecase/dashboard/dashboard-data-ticket-team.usecase';
import { DashboardDataAverageTimeTicketUseCase } from 'src/app/core/usecase/dashboard/dashboard-data-averagetime-ticket.usecase';
import { DashboardDataChart2UseCase } from 'src/app/core/usecase/dashboard/dashboard-data-chart2.usecase';
import { DashboardTicketUserUseCase } from 'src/app/core/usecase/dashboard/dashboard-data-ticket-user.usecase';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'gb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // Usar QueryList quando houver mais de um gráfico na tela
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  @ViewChild('chartA', { static: true }) chartA!: ElementRef;
  @ViewChild('chartB', { static: true }) chartB!: ElementRef;

  private newLabel?= 'New label';
  canvasA: any;
  canvasB: any;
  lineChartDataA: ChartConfiguration['data'] | any;
  lineChartOptionsA: ChartConfiguration['options'];
  lineChartTypeA: ChartType = 'line';

  lineChartDataB: ChartConfiguration['data'] | any;
  lineChartOptionsB: ChartConfiguration['options'];
  lineChartTypeB: ChartType = 'line';

  teamsChart1: any;
  teamsChart2: any;
  teams: any;
  listUserTicket: TicketUser[] | any = [];

  attendaceData: DashBoardTicketModel[] | any;
  averageTime: AverageTimeModel[] | any;

  dateToday: any = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(',');
  objDateToChart2: any;

  levelUser: Observable<any> = new Observable<any>();

  constructor(
    private getAllTeams: TeansUseCase,
    private getTicketData: DashboardDataTicketUseCase,
    private getTicketDataTeam: DashboardDataTicketTeamUseCase,
    private getAverage: DashboardDataAverageTimeTicketUseCase,
    private chart2Data: DashboardDataChart2UseCase,
    private getTicketFromUser: DashboardTicketUserUseCase) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.drawCanvasChart();
    this.getTeams();
    this.getTicketDataChart2();
    this.getAverageTime();
    this.getAllTicketUsers();

    let start = this.dateToday[0].split('/');
    this.getChart2Data(`${start[2]}-${start[1]}-${start[0]}`, `${start[2]}-${start[1]}-${start[0]}`);

    // Atualiza o gráfico a cada 10 minutos
    setInterval(() => {
      this.getChart2Data(`${start[2]}-${start[1]}-${start[0]}`, `${start[2]}-${start[1]}-${start[0]}`);
    }, 600000);


    this.levelUser = new Observable<any>(e => e.next(JSON.parse(sessionStorage.getItem('info-user') || '{}').type));

  }

  drawCanvasChart() {
    // DRAW CANVAS CHART A
    this.canvasA = this.chartA.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 240);
    this.canvasA.addColorStop(0, 'rgba(25, 128, 56, 0)');
    this.canvasA.addColorStop(1, 'white');

    // DRAW CANVAS CHART B
    this.canvasB = this.chartB.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 240);
    this.canvasB.addColorStop(0, 'rgba(11, 80, 193, 0)');
    this.canvasB.addColorStop(1, 'white');


    this.lineChartDataA = {
      datasets: [

        {
          data: [180, 480, 770, 90, 1000, 270, 400, 1, 10, 10],
          label: '',
          yAxisID: 'y1',
          backgroundColor: this.canvasA,
          borderColor: '#0F9D58',
          borderWidth: '2',
          pointBackgroundColor: '#FFF',
          pointBorderColor: '#0F9D58',
          pointHoverBackgroundColor: '#FFF',
          pointHoverBorderColor: '#0F9D58',
          fill: 'origin',
        }
      ],
      labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h']
    };

    this.lineChartOptionsA = {
      elements: {
        line: {
          tension: 0.4
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        y:
        {
          position: 'left',
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y1: {
          position: 'left',
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          border: {
            display: false
          }
        }
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          xAlign: 'center',
          yAlign: 'bottom',
          backgroundColor: 'rgba(231, 239, 254, 1)',
          bodyColor: '#0F9D58',
          titleColor: '#0F9D58',
          titleAlign: 'center',
          bodyAlign: 'center',
          displayColors: false
        }
      }
    };

    this.lineChartOptionsB = {
      elements: {
        line: {
          tension: 0.4
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        y:
        {
          position: 'left',
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y1: {
          position: 'left',
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          border: {
            display: false
          }
        }
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          xAlign: 'center',
          yAlign: 'bottom',
          backgroundColor: 'rgba(231, 239, 254, 1)',
          bodyColor: '#0F9D58',
          titleColor: '#0F9D58',
          titleAlign: 'center',
          bodyAlign: 'center',
          displayColors: false
        },
      }
    };
  }

  // EVENTOS PARA O GRAFICO A
  public chartClickedA({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  // EVENTOS PARA O GRAFICO B
  public chartClickedB({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  /**** */

  getTeams() {
    this.getAllTeams.execute().subscribe((r: any) => {

      let mapper;
      let mapper2;
      let mapper3;

      mapper = r.map((el: any) => {
        return {
          ...el,
          selected: false
        }
      });

      mapper2 = r.map((el: any) => {
        return {
          ...el,
          selected: false
        }
      });

      mapper3 = r.map((el: any) => {
        return {
          ...el,
          selected: false
        }
      });

      this.teams = mapper;
      this.teamsChart1 = mapper2;
      this.teamsChart2 = mapper3;
    })
  }

  selectedTeamChart2(evt: any) {
    if (evt.id === 1) {
      this.getTicketDataChart2();
      return
    }

    this.getTicketDataByTeam(evt.id);
  }

  selectedTeam(evt: any) {
    console.log(evt);
  }

  selectedTeamToList(evt: any) {
    this.getTicketFromUser.execute(evt.id).subscribe(e => {
      this.listUserTicket = e;
    })
  }

  getTicketDataChart2() {
    this.getTicketData.execute().subscribe(e => {
      this.attendaceData = e;
    })
  }

  getTicketDataByTeam(id: number) {
    this.getTicketDataTeam.execute(id).subscribe(r => {
      this.attendaceData = r;
    })
  }

  getAverageTime() {
    this.getAverage.execute().subscribe(r => {
      this.averageTime = r;
    })
  }

  filterDateChart2(evt: any) {

    if (evt && evt.control !== 'clear') {
      let today = evt.today?.length > 0 ? `${evt.today[0].split('/')[2]}-${evt.today[0].split('/')[1]}-${evt.today[0].split('/')[0]}` : null;
      let choose = evt.dateChoose ? `${evt.dateChoose[0].split('/')[2]}-${evt.dateChoose[0].split('/')[1]}-${evt.dateChoose[0].split('/')[0]}` : null;
      let dtaStart = evt.dateStart?.day !== 0 ? new Date(evt.dateStart?.year, evt.dateStart?.month - 1, evt.dateStart.day).toISOString().split('T')[0] : null;
      let dtaEnd = evt.dateEnd?.day !== 0 ? new Date(evt.dateEnd?.year, evt.dateEnd?.month - 1, evt.dateEnd.day).toISOString().split('T')[0] : null;

      if (today && (!choose && !dtaStart && !dtaEnd)) {
        let objDateToday = {
          dataStart: today,
          dataEnd: today
        }
        this.getChart2DataOnFilter(objDateToday);
        return;
      }

      if ((today && choose) && (!dtaStart && !dtaEnd)) {
        let objDateChoose = {
          dataStart: choose,
          dataEnd: today
        }
        this.getChart2DataOnFilter(objDateChoose);
        return;
      }

      if ((today && !choose) && (dtaStart && dtaEnd)) {
        let objDateStartEnd = {
          dataStart: dtaStart,
          dataEnd: dtaEnd
        }
        this.getChart2DataOnFilter(objDateStartEnd);
        return;
      }
    }
  }

  getChart2Data(datestart: any, dateEnd: any) {

    let objDate = {
      dataStart: datestart,
      dataEnd: dateEnd
    }

    this.chart2Data.execute(objDate).subscribe((e: any) => {

      this.objDateToChart2 = this.getDataToChart(e);

      // Plota os dados do gráfico Volume de tickets
      this.lineChartDataB = {
        datasets: [

          {
            data: this.objDateToChart2.dataTicket,
            label: '',
            yAxisID: 'y1',
            backgroundColor: this.canvasB,
            borderColor: '#0B50C1',
            borderWidth: '2',
            pointBackgroundColor: '#FFF',
            pointBorderColor: '#0B50C1',
            pointHoverBackgroundColor: '#FFF',
            pointHoverBorderColor: '#0B50C1',
            fill: 'origin',
          }
        ],
        labels: this.objDateToChart2.dataDay
      };

    })
  }

  getChart2DataOnFilter(dataObj: any) {
    this.chart2Data.execute(dataObj).subscribe((e: any) => {

      this.objDateToChart2 = this.getDataToChart(e);

      // Plota os dados do gráfico Volume de tickets
      this.lineChartDataB = {
        datasets: [

          {
            data: this.objDateToChart2.dataTicket,
            label: '',
            yAxisID: 'y1',
            backgroundColor: this.canvasB,
            borderColor: '#0B50C1',
            borderWidth: '2',
            pointBackgroundColor: '#FFF',
            pointBorderColor: '#0B50C1',
            pointHoverBackgroundColor: '#FFF',
            pointHoverBorderColor: '#0B50C1',
            fill: 'origin',
          }
        ],
        labels: this.objDateToChart2.dataDay
      };

      this.charts.forEach((child: any) => {
        child.chart.update()
      });
    })
  }

  getDataToChart(dta: any) {
    let dataTicket: any = [];
    let dataDay: any = [];

    dta.forEach((el: any) => {
      if (el.tickets_day) {
        dataTicket.push(el.tickets_day)
      }

      if (el.day) {
        dataDay.push(`${el.day.split('-')[2]}/${el.day.split('-')[1]}`)
      }
    });

    return {
      dataTicket,
      dataDay
    }
  }

  getAllTicketUsers() {
    this.getTicketFromUser.execute().subscribe(e => {
      this.listUserTicket = e;
    })
  }

}
