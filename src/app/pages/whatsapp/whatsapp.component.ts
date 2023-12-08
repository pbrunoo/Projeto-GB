import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalTransferComponent } from 'src/app/components/modal-transfer/modal-transfer.component';
import { FadeIn, FadeInOut } from 'src/app/shared/util-common';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as moment from "moment";
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'gb-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
  animations: [FadeIn(200), FadeInOut(200, 250, true)]
})

export class WhatsappComponent implements OnInit {

  @ViewChild('canvaWave', { static: false }) canvaWave!: ElementRef<HTMLCanvasElement>;
  @ViewChild(ModalTransferComponent) showModalConfirm!: ModalTransferComponent;


  iconMessageType: boolean = false;
  recording: boolean = false;
  showHideTextField: boolean = true;
  micActive: boolean = true;
  abaSelectedOne: boolean = true;
  abaSelectedTwo: boolean  = false;

  // Audio recorder
  gumStream: any; 				
  recorder: any; 				
  chunks: any = [];				
  extension: any;
  audioCtx: any;
  canvasCtx: any;
  canvaEl: any;
  private interval: any;
  private startTime: any;
  private _recordingTime = new Subject<string>();
  showTime: any;

  constructor(
    private ref: ChangeDetectorRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer) {

    this.getRecordedTime().subscribe(e => {
      this.showTime = e;
    })
  }
  
  dataPriority = [

    {
      option: 'Prioridade',
      class: 'prioridade',
      selected: true,
    },
    {
      option: 'Baixo',
      class: 'baixo',
      selected: false,
    },
    {
      option: 'Médio',
      class: 'medio',
      selected: false,
    },
    {
      option: 'Alto',
      class: 'alto',
      selected: false,
    },
    {
      option: 'Urgente',
      class: 'urgente',
      selected: false,
    }
  ]

  ngOnInit(): void {
    setTimeout(() => {
      //this.showModalConfirm.open('ticket')
    }, 800);

  }

  getSelectedPerson(event: any) {

  }

  getPriority(event: any) {

  }

  changeIconMessageType(el: string) {
    if (el) {
      this.iconMessageType = true;
      return
    }
    this.iconMessageType = false;
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  startRecord() {
    this._recordingTime.next('00:00');
    this.recording = true;
    this.showHideTextField = false;
    this.micActive = false;

    if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
      this.extension = "webm";
    } else {
      this.extension = "ogg"
    }

    let constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

      this.gumStream = stream;

      this.visualize(stream);

      let options = {
        audioBitsPerSecond: 256000,
        videoBitsPerSecond: 2500000,
        bitsPerSecond: 2628000,
        mimeType: 'audio/' + this.extension + ';codecs=opus'
      }

      this.recorder = new MediaRecorder(stream, options);
      this.startTime = moment();
      this.interval = setInterval(
        () => {
          const currentTime = moment();
          const diffTime = moment.duration(currentTime.diff(this.startTime));
          const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
          this._recordingTime.next(time);
        },
        500
      );

      this.recorder.ondataavailable = (e: any) => {
        console.log("recorder.ondataavailable:" + e.data);

        console.log("recorder.audioBitsPerSecond:" + this.recorder.audioBitsPerSecond)
        console.log("recorder.videoBitsPerSecond:" + this.recorder.videoBitsPerSecond)
        console.log("recorder.bitsPerSecond:" + this.recorder.bitsPerSecond)

        this.chunks.push(e.data);

        if (this.recorder.state == 'inactive') {
          const blob = new Blob(this.chunks, { type: 'audio/' + this.extension });
          this.createDownloadLink(blob)
        }
      };

      this.recorder.onerror = (e: any) => {
        console.log(e.error);
      }

      this.recorder.start(1000);

      //recorder.start();
    }).catch(function (err) {
      //enable the record button if getUserMedia() fails
      //recordButton.disabled = false;
      //stopButton.disabled = true;
      //pauseButton.disabled = true
    });
  }

  stopRecord() {
    this.recording = false;
    this.showHideTextField = true;
    this.micActive = true;

    this.recorder.stop();
    this.gumStream.stop();
    this.gumStream.getAudioTracks()[0].stop();

    clearInterval(this.interval);
    this.startTime = null;
  }

  pauseRecording() {
    console.log("pauseButton clicked recorder.state=", this.recorder.state);
    if (this.recorder.state == "recording") {
      //pause
      this.recorder.pause();
    } else if (this.recorder.state == "paused") {
      //resume
      this.recorder.resume();
    }
  }

  visualize(stream: any) {
    this.canvaEl = this.canvaWave.nativeElement;

    this.canvasCtx = this.canvaWave.nativeElement.getContext("2d");

    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }

    const source = this.audioCtx.createMediaStreamSource(stream);

    const analyser = this.audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    const draw = () => {
      const WIDTH = this.canvaEl.width
      const HEIGHT = this.canvaEl.height;

      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      this.canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      this.canvasCtx.lineWidth = 0.7;
      this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      this.canvasCtx.beginPath();

      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      console.log(sliceWidth)

      for (let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT / 2;

        if (i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.canvasCtx.lineTo(this.canvaEl.width, this.canvaEl.height / 2);
      this.canvasCtx.stroke();
    }

    draw();
  }

  createDownloadLink(blob: Blob) {
    let url = URL.createObjectURL(blob);
    let au = document.createElement('audio');
    let li = document.createElement('li');
    let link = document.createElement('a');

    //add controls to the <audio> element
    au.controls = true;
    au.src = url;

    //link the a element to the blob
    link.href = url;
    link.download = new Date().toISOString() + '.' + this.extension;
    link.innerHTML = link.download;

    //add the new audio and a elements to the li element
    li.appendChild(au);
    li.appendChild(link);

    //add the li element to the ordered list
    let el: any = document.getElementById('recordingsList');
    el.appendChild(li);

    this.chunks = [];

  }

  toString(value: any) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  selectAba(index: number): void{
    if(index === 1){
      this.abaSelectedOne = true;
      this.abaSelectedTwo = false;
      return
    }

    this.abaSelectedOne = false;
    this.abaSelectedTwo = true;
  }  
}
