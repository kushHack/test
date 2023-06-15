import {
    HttpErrorResponse,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of } from "rxjs";
import { throwError } from "rxjs/internal/observable/throwError";
import { SpinnerService } from "../utils/spinner.utils";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    spin: any;

    constructor(private spinner: SpinnerService) { }
    action = 'close'
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.spinner.change(false)
                }
                return throwError(error)
            })
        );
    }
}
