import { trigger, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations'
import { TranslationWidth } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct, NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { isArray } from 'util';

export function logout() {
  sessionStorage.clear();
  window.location.reload();
}

export function clearTabs() {
  window.dispatchEvent(new Event('CLEAR_TABS'));

}

// ANIMATIONS - in Whatapp page
export function FadeIn(timingIn: number): AnimationTriggerMetadata  {
  return trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 , height: 0 }),
      animate(timingIn, style({ opacity: 1, height: 'fit-content' })),
    ]),
  ]);
}

export function FadeInOut(timingIn: number, timingOut: number, height: boolean = false): AnimationTriggerMetadata  {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 , height: 0 }),
      animate(timingIn, style({ opacity: 1, height: 'fit-content' })),
    ]),
    transition(':leave', [
      animate( timingOut, style({ opacity: 0, height: 0 })),
    ])
  ]);
}

export function animateFadeInOut(){
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 , with: 0 }), 
      animate('100ms', style({ opacity: 1, with: 300 })),
    ]),
    transition(':leave', [
      animate( '100ms', style({ opacity: 0, with: 0 })),
    ])
  ])
}

//*** */


// TRADUZIR DATAPICKER
const I18N_VALUES: any = {
	pt: {
		weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
		months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
	},
};

@Injectable()
export class I18n {
  language = 'pt';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
	constructor(private _i18n: I18n) {
		super();
	}

	getWeekdayLabel(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	}

	override getWeekLabel(): string {
		return I18N_VALUES[this._i18n.language].weekLabel;
	}

	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].months[month - 1];
	}

	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}
  
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}


function padNumber(value: number) {
  if (isNumber(value)) {
      return `0${value}`.slice(-2);
  } else {
      return '';
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDatePTParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | any {
      if (value) {
          const dateParts = value.trim().split('/');
          if (dateParts.length === 1 && isNumber(dateParts[0])) {
              return  {year: toInteger(dateParts[0]), month: null, day: null};
          } else if (dateParts.length === 2 && isNumber(dateParts[0])
              && isNumber(dateParts[1])) {
              return   {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
          } else if (dateParts.length === 3 && isNumber(dateParts[0])
              && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
              return   {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
          }
      }
      return null      
  }

  format(date: NgbDateStruct): string {
      let stringDate: string = '';
      if (date) {
          stringDate += isNumber(date.day) ? padNumber(date.day) + '/' : '';
          stringDate += isNumber(date.month) ? padNumber(date.month) + '/' : '';
          stringDate += date.year;
      }
      return stringDate;
  }
}


// FORMAT TIMEPICKER
const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
	fromModel(value: string | null): NgbTimeStruct | null {
		if (!value) {
			return null;
		}
		const split = value.split(':');
		return {
			hour: parseInt(split[0], 10),
			minute: parseInt(split[1], 10),
			second: parseInt(split[2], 10),
		};
	}

	toModel(time: NgbTimeStruct | null): string | null {
		return time != null ? `${pad(time.hour)}:${pad(time.minute)}` : null;
	}
}

// CHARTS

export class CreateChart {
  private newLabel?= 'New label';
  private lineChartData: ChartConfiguration['data'];
  private chart: any;

  constructor(lineChart: ChartConfiguration['data'], chart: any){
    this.lineChartData = lineChart;
    this.chart = chart;
  }

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = CreateChart.generateNumber(i);
      }
    }

    this.chart.forEach((child: any) => {
      child.chart.update()
    });
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x: any, i: any) => {
      const num = CreateChart.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

    this.chart.forEach((child: any) => {
      child.chart.update()
    });
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart.forEach((child: any) => {
      child.chart.update()
    });
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart.forEach((child: any) => {
      child.chart.update()
    });
  }
}
