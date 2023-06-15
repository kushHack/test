import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private TYPES = {
        REMIND_ADMIN: 'remind_admin',
        REMIND_RPM: 'remind_rpm',
    }
    
    private _url = environment.base_url;

    constructor(private http: HttpClient) {}

    remindAdmin(id: string) {
        return this.http.post<any>(`${this._url}/email/emailForWorkflow`, {id, type: this.TYPES.REMIND_ADMIN});
    }
    remindRpm(id: string) {
        return this.http.post<any>(`${this._url}/email/emailForWorkflow`, {id, type: this.TYPES.REMIND_RPM});
    }

}