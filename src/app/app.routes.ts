import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { QueryBuilderComponent } from './components/query-builder/query-builder.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EntityConnectionComponent } from './components/entity-connection/entity-connection.component';
import { EntityContractComponent } from './components/entity-contract/entity-contract.component';
import { DataCatlogComponent } from './components/data-catlog/data-catlog.component';
import { authGuard, authGuardChild } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },{
        path:'login',
        component:LoginComponent
    },{
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard]
    }, {
        path:'query-builder',
        component:QueryBuilderComponent,
        canActivate:[authGuard]
    },{
        path:'entity-connection',
        component:EntityConnectionComponent,
        canActivate:[authGuard]
    },{
        path:'entity-contract',
        component:EntityContractComponent,
        canActivate:[authGuard]
    },{
        path:'data-catlog',
        component:DataCatlogComponent,
        canActivate:[authGuard]
    },
      {
        path: '**',
        component: PagenotfoundComponent
      }
];
