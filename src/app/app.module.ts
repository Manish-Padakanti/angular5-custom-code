import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NguCarouselModule } from '@ngu/carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { MatGridListModule } from '@angular/material';
// import { DynamicModalComponent } from './shared/modal/dynamicModal.component';
import { CustomModalComponent } from './layout/news/components/customModal/custom-modal.component';

import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
// import { ModalService } from './shared/modal/modal.service';
import { ProfileService } from './shared/services/profile.service';
import { ConfirmService } from './shared/modal/confirm-modal-and-service';
import { PendingHomeworkService } from './shared/services/pending-homework.service';
// import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material';
import { MatExpansionModule, MatCardModule } from '@angular/material';
import { ClassService } from './shared/services/class.service';
import { AuthService } from './shared/services/auth.service';
// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
        NguCarouselModule,
        ModalDialogModule.forRoot(),
        MatGridListModule,
        MatExpansionModule,
        MatCardModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [AppComponent, CustomModalComponent],
    providers: [AuthGuard, ProfileService, PendingHomeworkService, ClassService, ConfirmService, AuthService],
    entryComponents: [CustomModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
