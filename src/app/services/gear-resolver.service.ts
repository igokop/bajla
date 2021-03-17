import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "./data-storage-service";
import { Distance } from "../models/distance.model";
import { Gear } from "../models/gear.model";

@Injectable({providedIn: 'root'})
export class GearResolverService implements Resolve<Gear[]>{
    constructor(private dataStorageService: DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataStorageService.getGears();
    }
}