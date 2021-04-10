import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { HomeComponent } from "./home/home.component";
import { AddKilometersComponent } from "./kilometers/add-kilometers.component";
import { LoginDoneComponent } from "./login-done/login-done.component";
import { MyGearsComponent } from "./my-gears/my-gears.component";
import { AddRouteComponent } from "./routes/add-route/add-route.component";
import { SimpleComponent } from "./routes/add-route/simple/simple.component";
import { RoutesComponent } from "./routes/routes.component";
import { AuthGuard } from "./services/auth-guard-service";
import { GearResolverService } from "./services/gear-resolver.service";
import { KilometersResolverService } from "./services/kilometers-resolver.service";
import { StripeCreateTokenComponent } from "./stripe-create-token/stripe-create-token.component";

const appRoutes: Routes = [
    { path: '', component: AuthComponent},
    { path: 'home', canActivate: [AuthGuard],component: HomeComponent,resolve: [KilometersResolverService, GearResolverService] },
    { path: 'routes', canActivate: [AuthGuard], component: RoutesComponent},
    { path: 'createNewRoute', canActivate: [AuthGuard], component: AddRouteComponent},
    { path: 'simpleWay', canActivate: [AuthGuard], component: SimpleComponent},
    { path: 'kilometers', canActivate: [AuthGuard],component: AddKilometersComponent },
    { path: 'subscription', canActivate: [AuthGuard],component: StripeCreateTokenComponent },
    { path: 'gears', canActivate: [AuthGuard], component: MyGearsComponent },
    { path: 'exchange_token', canActivate: [AuthGuard], component: LoginDoneComponent},
    { path: '**', redirectTo: 'home'}
    

    // http://localhost:4200/strava/exchange_token?state=&code=24cd6fd9c5161544080dfff8f164d49ae8f27c10&scope=read
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}
