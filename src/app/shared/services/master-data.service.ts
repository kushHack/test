import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddCommunity } from "../interfaces/community.model";
import { SpinnerService } from "../utils/spinner.utils";

@Injectable({
    providedIn: 'root'
})
export class MasterDataService {

    private _url = environment.base_url;

    constructor(private http: HttpClient, private spinner: SpinnerService) { }

    getMasterConfig() {
        return this.http.get<any>(`${this._url}/master/config/get`)
    }

    updateMasterConfig(configData: any, id: string) {
        configData.id = id;
        this.http.post<any>(`${this._url}/master/config/update`, configData)
            .subscribe(response => {
                this.spinner.change(false)
                if (response.code === 200) {
                    this.spinner.showAlert(response.message, "success")
                }
            })
    }

    getAllCommunities() {
        return this.http.get<Response>(`${this._url}/community/getAll`)
    }

    addCommunity(community: AddCommunity) {
        this.spinner.change(true);
        return this.http.post<any>(`${this._url}/community/add`, community)

    }
    updateCommunity(community: AddCommunity) {
        this.spinner.change(true);
        return this.http.post<any>(`${this._url}/community/update`, community)
    }

    getPDF(){
        return this.http.get<any>(`${this._url}/master/get/pdf`);
    }

}