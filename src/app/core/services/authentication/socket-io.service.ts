import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import openSocket from "socket.io-client";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor() { }

    connectToSocket() {
        return openSocket(`${environment.URLBase}`);
    }
}
