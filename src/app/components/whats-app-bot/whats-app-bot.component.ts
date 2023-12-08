import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GroupUseCase } from 'src/app/core/usecase/group/group.usecase';
import { TeansUseCase } from 'src/app/core/usecase/teans/teans.usecase';
import { animateFadeInOut } from 'src/app/shared/util-common';

@Component({
  selector: 'gb-whats-app-bot',
  templateUrl: './whats-app-bot.component.html',
  styleUrls: ['./whats-app-bot.component.scss'],
  animations: [animateFadeInOut()]
})
export class WhatsAppBotComponent implements OnInit, OnDestroy {

  @ViewChild('waMessage', { static: false }) waMessage!: ElementRef;

  private readonly groupSubject: Subject<boolean> = new Subject();
  private readonly unsubsFormSetting: Subject<boolean> = new Subject();
  private readonly unsubsFormSelectStage: Subject<boolean> = new Subject();

  allGroups = [];
  allTeams = [];
  selectedTeams: any = [];
  triggerSelect: boolean = false;
  triggerMessage: boolean = false;
  triggerDirection: boolean = false;
  changeTagClassStartFlow: boolean = false;
  listStage = [
    {
      name: 'Mensagem',
      selected: false,
    },
    {
      name: 'Direcionamento para equipe',
      selected: false,
    }
  ]

  mountMessage: string = '<ul>';
  placeholderCustom: boolean = true;
  // Forms
  public formSettings: FormGroup = this.fb.group({
    configName: ["", Validators.required],
    numberGroup: ["", Validators.required],
  });

  public formSelectStage: FormGroup = this.fb.group({
    selectStage: ["", Validators.required]
  });

  public formMessageDirection: FormGroup = this.fb.group({
    messageField: ["", Validators.required]
  });

  constructor(
    private getAllGroups: GroupUseCase,
    private fb: FormBuilder,
    private getAllTams: TeansUseCase
  ) { }

  ngOnInit(): void {
    this.getGroups();
    this.getTeams();
    this.verifyFormSetting();
    this.verifyFormSelectStage();
    this.verifyFormMessageDirection();
  }

  ngOnDestroy(): void {
    this.groupSubject.next(true);
    this.groupSubject.unsubscribe();

    this.unsubsFormSetting.next(true);
    this.unsubsFormSetting.unsubscribe();

    this.unsubsFormSelectStage.next(true);
    this.unsubsFormSelectStage.unsubscribe();
  }

  autoHeight(el: HTMLElement): void {
    el.style.height = `${el.scrollHeight}px`;
  }

  removePlaceHolderCustom(): void {
    this.placeholderCustom = false;
  }

  getGroups(): void {
    this.getAllGroups.execute()
      .pipe(takeUntil(this.groupSubject))
      .subscribe((e: any) => {
        let mapper = e.map((e: any) => {
          return {
            ...e,
            selected: false
          }
        });

        this.allGroups = mapper;
      });
  }

  getTeams(): void {
    this.getAllTams.execute().subscribe((e: any) => {
      let mapper = e.map((r: any) => {
        return {
          ...r,
          selected: false
        }
      })
      this.allTeams = mapper;
    })
  }

  selectTeam(evt: any) {
    let verifyIfExist = this.selectedTeams.some((e: any) => e.id === evt[0].id);
    if (verifyIfExist) return;

    this.selectedTeams.push({ name: evt[0].name, id: evt[0].id });

    let ulTag = '<ul>';

    this.selectedTeams.forEach((el: any, i: number) => {
      ulTag = ulTag + `<li>${i + 1} - ${el.name} </li>`;
    });

    ulTag = ulTag + '</ul>';

    // Enviar para o form
    this.mountMessage = ulTag;
  }

  remoevTagTeam(i: number) {
    this.selectedTeams.splice(i, 1);
  }

  removeDirection(){
    this.triggerDirection = !this.triggerDirection;
    this.triggerSelect = !this.triggerSelect;
  }

  verifyFormSetting(): void {
    this.formSettings.valueChanges
      .pipe(takeUntil(this.unsubsFormSetting))
      .subscribe(e => {
        if (e.configName !== '' && e.numberGroup !== '') {
          this.triggerSelect = true;
          this.changeTagClassStartFlow = true;
          return;
        }

        this.triggerSelect = false;
        this.changeTagClassStartFlow = false;
      })
  }

  verifyFormSelectStage(): void {
    this.formSelectStage.valueChanges
      .pipe(takeUntil(this.unsubsFormSelectStage))
      .subscribe((e: any) => {
      
        if (e.selectStage && e.selectStage.name === 'Mensagem') {
          this.triggerMessage = true;
          return;
        }

        if (e.selectStage && e.selectStage.name === 'Direcionamento para equipe' && this.triggerMessage && this.formMessageDirection.controls['messageField'].value.length > 0) {
          this.triggerDirection = true;
          this.triggerSelect = false;
          return;
        }
      })
  }

  verifyFormMessageDirection() {
    this.formMessageDirection.valueChanges
      .pipe(takeUntil(this.unsubsFormSelectStage))
      .subscribe((e: any) => {
        console.log(e)
      })
  }

}
