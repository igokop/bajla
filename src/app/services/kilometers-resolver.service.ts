import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "./data-storage-service";
import { Distance } from "../models/distance.model";

@Injectable({providedIn: 'root'})
export class KilometersResolverService implements Resolve<Distance[]>{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataStorageService.getKilometers();
    }
}