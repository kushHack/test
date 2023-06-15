import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SpinnerService } from "../utils/spinner.utils";

@Injectable({
    providedIn: 'root'
})
export class ForecastService {

    private _url = environment.base_url;
    public formData: any;

    constructor(private http: HttpClient, private spinner: SpinnerService) { }

    getData(workflowId: string) {
        return this.http.get<any>(`${this._url}/forecast/data/get?workflow=` + workflowId);
    }

    saveData(data: any, workflowId: string) {
        return this.http.post<any>(`${this._url}/forecast/data/save?workflow=` + workflowId, data);
    }

    getForecast(workflowId: string, communityId: string, formData: any) {
        return this.http.post<any>(`${this._url}/forecast/generate?workflowId=${workflowId}&community=${communityId}`, { formData });
    }

    getRevenueInputNumbers(data: any, workflow:any) {
        return this.http.post<any>(`${this._url}/forecast/revenue/generate?communityId=${workflow.community}&workflow=${workflow._id}`, data);
    }

}