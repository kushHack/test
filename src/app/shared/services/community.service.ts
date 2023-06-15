import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddCommunity } from "../interfaces/community.model";
import { SpinnerService } from "../utils/spinner.utils";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommunityService {

    private _url = environment.base_url;

    rpmList = new BehaviorSubject<any>([])

    constructor(private http: HttpClient, private spinner: SpinnerService) { }

    getRPM() {
        return this.http.get<any>(`${this._url}/user/getRPM`);
    }

    getCommunitiesRPM(rpmEmail: string) {
        const query = `?rpmEmail=${rpmEmail}`;
        return this.http.get<any>(`${this._url}/community/by_rpm` + query)
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

}