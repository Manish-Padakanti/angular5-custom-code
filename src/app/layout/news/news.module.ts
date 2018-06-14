import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselModule } from '@ngu/carousel';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {MatGridListModule,MatCardModule,MatButtonModule} from '@angular/material';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { CustomModalComponent } from './components/customModal/custom-modal.component';
import { StatModule } from '../../shared';
import { DynamicModalModule } from '../../shared/modal/dynamicModal.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NguCarouselModule,
        NewsRoutingModule,
        StatModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        DynamicModalModule
    ],
    declarations: [
        NewsComponent,
    ]
})
export class NewsModule {}
