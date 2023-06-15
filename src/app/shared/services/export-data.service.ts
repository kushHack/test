import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ExportDataService {

    private _url = environment.base_url;

    constructor(private http: HttpClient) { }

    getPDF(data: { fileType: string, summaryType:number }) {
        return this.http.get<any>(`${this._url}/export/summary/pdf?fileType=${data.fileType}&summaryType=${data.summaryType}`);
    }

    getMRI(version:any, community:string){
        return this.http.get<any>(`${this._url}/export/mri?version=${version}&community=${community}`);
    }

}