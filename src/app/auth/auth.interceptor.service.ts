import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take} from "rxjs/operators";
import { AuthentService } from "./authen.service";

@Injectable()
export class AuthInteceptorService implements HttpInterceptor{
    constructor(private authentService:AuthentService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authentService.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.getToken())
                });
                return next.handle(modifiedReq);
            })
        );
    ;}
        
    
}