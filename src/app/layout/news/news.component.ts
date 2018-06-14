import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NguCarousel } from '@ngu/carousel';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatGridListModule, MatCardModule} from '@angular/material';
import { CustomModalComponent } from './components/customModal/custom-modal.component';
import { ConfirmService } from '../../shared/modal/confirm-modal-and-service';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

interface Carousel {
    id: number;
    imagePath: string;
    label: string;
    text: string;
  }

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    animations: [routerTransition()]
})
export class NewsComponent implements OnInit {
    public alerts: Array<any> = [];
    public carouselOne: NguCarousel;
    public sliders: Array<any> = [];
    public tiles: Array<any> = [];
    public news: object = {};
    public section: object = {};

    constructor(private modalService: ModalDialogService, private confirmService: ConfirmService,private http: HttpClient) {}

    ngOnInit() {
        this.carouselOne = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
            slide: 1,
            speed: 400,
            interval: 8000,
            point: {
                visible: true
            },
            load: 2,
            touch: true,
            loop: true,
            custom: 'banner'
        }
        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );

         this.getCarousel().subscribe(data =>{
            this.sliders = data;
         });

         this.getSections().subscribe(data =>{
             console.log(data);
            this.tiles = data;
         });
    }

    public getCarousel (){
        return this.http
        .get('.../../../assets/mock-data/carousel.json')
        .pipe(
          map(({ results }: { results: Carousel[] }) => {
            return results;
          }));
    }

    public getSections(){
        return this.http
        .get('.../../../assets/mock-data/newsSections.json')
        .pipe(
          map(({ results }: { results: Carousel[] }) => {
            return results;
          })); 
    }

    public initDataFn(event: Event) {
        console.log(event);
    }

    public carouselTileLoad(event: Event) {
        // carouselLoad will trigger this funnction when your load value reaches
        // it is helps to load the data by parts to increase the performance of the app
        // must use feature to all carousel
        console.log(Event);
        console.log(typeof (event));
        console.log(this.sliders['event']);
        this.news['currentTile'] = this.sliders['event'];
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
     // opens dialog to edit/delete a Carousel
     openEditDialog() {
        this.news = {};
        this.news['type'] = 'edit';
        this.news['sliders'] = this.sliders;
        this.confirmService.open({
            title: 'Edit or Delete News Carousel', message: 'Você tem certeza que deseja excluir o cliente ', data: this.news,
        }).then(
            () => {

            },
            () => {
                //console.log('not deleting...');
            });
    }
//opens dialog to add a Carousel
    openAddNewDialog() {
        this.news = {};
        this.news['type'] = 'add';
        this.news['sliders'] = this.sliders;
        this.confirmService.open({
            title: 'Add News Carousel', message: 'Você tem certeza que deseja excluir o cliente ', data: this.news,
        }).then(

            () => {
            },
            () => {
                //console.log('not deleting...');
            });
    }
//opens dialog to add a news section
    openAddSectionDialog(){
        this.section = {};
        this.section['type'] = 'add';
        this.section['sliders'] = this.tiles;
        this.confirmService.open({
            title: 'Add News Section', message: 'Você tem certeza que deseja excluir o cliente ', data: this.section,
        }).then(

            () => {
            },
            () => {
                //console.log('not deleting...');
            });  
    }
//opens dialog to edit/delete a news section
    openEditSectionDialog(){
        this.section = {};
        this.section['type'] = 'edit';
        this.section['sliders'] = this.tiles;
        this.confirmService.open({
            title: 'Edit Or Delete News Section', message: 'Você tem certeza que deseja excluir o cliente ', data: this.section,
        }).then(

            () => {
            },
            () => {
                //console.log('not deleting...');
            });   
    }
}
