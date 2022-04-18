import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { sharedModule } from '../shared/shared.module';

//rutas
import { PAGES_ROUTES } from './pages.routes';

//ng2 charts
import { NgChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule } from '@angular/forms';


//Pipes
import { PipesModule } from '../pipes/pipes.module';

//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule ({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        HospitalesComponent,
        ProfileComponent,
        UsuariosComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        sharedModule,
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        NgChartsModule,
        PipesModule
    ]
})
export class pagesModule { }