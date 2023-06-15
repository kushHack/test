import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { SpinnerService } from "../utils/spinner.utils";

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {

    private _url = environment.base_url;

    constructor(private http: HttpClient, private spinner: SpinnerService, private router: Router) { }

    getBudgetSheetData(workflowDetails: any) {
        const data = {
            communityId: workflowDetails.community,
            year: workflowDetails.year
        }
        return this.http.post<any>(`${this._url}/workflow/getBudgetData`, data)
    }

    createWorkflow(data: Object) {
        this.spinner.change(true);
        this.http.post<any>(`${this._url}/workflow/initiate/new`, data)
            .subscribe(response => {
                if (response.code === 200) {
                    this.router.navigate(['/dashboard/workflow/task-queue']);
                }
                if (response.code === 401) {
                    this.spinner.change(false);
                    this.spinner.showAlert(response.message, "error");
                }
            })
    }

    getWorkflowById(id: string) {
        return this.http.get<any>(`${this._url}/workflow/getById?id=${id}`);
    }

    checkCommunityFileExists(communityId: string) {
        return this.http.get<any>(`${this._url}/workflow/getbycommunity?communityId=` + communityId)
    }

    getAllWorkflow() {
        return this.http.get<any>(`${this._url}/workflow/get`);
    }

    getWorkflowByRPM(rpm: string) {
        this.spinner.change(true);
        return this.http.get<any>(`${this._url}/workflow/getbyrpm?rpm=` + rpm);
    }

    startWorkflow(data: any) {
        this.spinner.change(true);
        this.http.post<any>(`${this._url}/workflow/start`, data)
            .subscribe(res => {
                if (res.code === 200) {
                    this.spinner.showAlert(res.message, 'success')
                    this.router.navigate(['/dashboard/forecast/revenue-input'])
                }
                if (res.code === 401) {
                    this.spinner.change(false);
                    this.spinner.showAlert(res.message, 'error')
                }
            })
    }

    sendForReviewWorkflow(data: any) {
        return this.http.post<any>(`${this._url}/workflow/sendReview`, data);
    }

    reviewWorkflow(data: any) {
        this.spinner.change(true);
        
        this.http.post<any>(`${this._url}/workflow/review`, data)
            .subscribe(res => {
                if (res.code === 200) {
                    this.spinner.showAlert(res.message, 'success')
                    this.router.navigate(['/dashboard/forecast/revenue-input'])
                }
                if (res.code === 401) {
                    this.spinner.change(false);
                    this.spinner.showAlert(res.message, 'error')
                }
            })
    }

    finalizeWorkflow(currWorkflowId:any,finalWorkflowId:any){
        return this.http.post<any>(`${this._url}/workflow/finalize`, currWorkflowId)
    }

    approveWorkflow(workflow: any) {
        return this.http.post<any>(`${this._url}/workflow/approve`, workflow)
    }

    getStartedWorkflow(rpm: string) {
        return this.http.get<any>(`${this._url}/workflow/getStart?rpm=` + rpm);
    }

    getReviewWorkflow(email: string) {
        return this.http.get<any>(`${this._url}/workflow/getReview?email=` + email);
    }

    getApprovedWorkflowRPM(email: string, version: number, year: number) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/rpm?rpm=${email}&version=${version}&year=${year}`);
    }

    getApprovedWorkflow(version: number, year: number) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/all?version=${version}&year=${year}`);
    }

    getAllCommunityNames(year: number) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/communties?year=${year}`);
    }

    getAllCommunityNamesRPM(rpm: string, year: number) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/rpm/communties?rpm=${rpm}&year=${year}`);
    }

    getApprovedVersions() {
        return this.http.get<any>(`${this._url}/workflow/getApproved/versions`);
    }

    getApprovedYears() {
        return this.http.get<any>(`${this._url}/workflow/getApproved/years`);
    }

    getApprovedYearsByRPM(email: string) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/years?email=${email}`);
    }

    getApprovedVersionByCommunity(community: string, year: number) {
        return this.http.get<any>(`${this._url}/workflow/getApproved/versions/community?community=${community}&year=${year}`);
    }

    rejectWorkflow(id: string) {
        this.http.get<any>(`${this._url}/workflow/reject?id=${id}`)
            .subscribe(res => {
                if (res.code === 200) {
                    this.spinner.showAlert(res.message, 'success');
                    this.router.navigate(['/dashboard/workflow/task-queue']);
                }
                else {
                    this.spinner.showAlert(res.message, 'error');
                }
            })
    }

    getBudgetAndForecastSheets(workflows: any, year: number) {
        let workflowIds: any = [];
        let communityIds: any = [];
        workflows.forEach((el: any) => {
            workflowIds.push(el._id);
            communityIds.push(el.community);
        })
        return this.http.post<any>(`${this._url}/workflow/budget-actual-forecast?year=${year}`, { workflowIds, communityIds });
    }

    getForeact_ForecastSheet(workflows: any, year: number) {
        let workflowIds: any = [];
        workflows.forEach((el: any) => {
            workflowIds.push(el._id);
        })
        return this.http.post<any>(`${this._url}/workflow/foreact-forecast?year=${year}`, { workflowIds });
    }

    getWorkflowByCommunity(id: string, version: number) {
        return this.http.get<any>(`${this._url}/workflow/community?id=${id}&version=${version}`)

    }
}