import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Marzipano from 'marzipano';
import { GocodeeGallerySupporterService } from './gocodee-gallery-supporter.service';

declare let lightGallery: any;
@Component({
    selector: 'lib-gocodee-gallery-supporter',
    templateUrl: './gocodee-gallery-supporter.component.html',
    styleUrls: ['./gocodee-gallery-supporter.component.css']
})
export class GocodeeGallerySupporterComponent implements OnInit {
    @Input() image;
    @Input() type;

    @ViewChild('lightgallery') xlightgallery: ElementRef;
    @ViewChild('videoGallery') videoGallery: ElementRef;
    @ViewChild('pdfGallery') pdfGallery: ElementRef;

    @ViewChild('imagene') imagene: ElementRef;
    @ViewChild('videone') videone: ElementRef;

    constructor(private gcodeeGallerySupporterService: GocodeeGallerySupporterService) {
        this.gcodeeGallerySupporterService.visible.subscribe(show => {
            if (show) {
                this.open();
            }
        })
    }

    ngOnInit() {
        const that = this;
        setTimeout(() => {
            lightGallery(this.xlightgallery.nativeElement);
            lightGallery(this.videoGallery.nativeElement);
            this.pdfGallery.nativeElement.setAttribute("data-src", this.image);
            lightGallery(document.getElementById('google-map'), {
                selector: 'this'
            });
            // var btn = document.createElement("BUTTON");
            // btn.innerHTML = "CLICK ME";
            // document.body.appendChild(btn)
            // this.pdfGallery.nativeElement['data-src'] = this.image;


            this.xlightgallery.nativeElement.addEventListener('onBeforeSlide', function (event) {
                setTimeout(() => {
                    if (that.type == 'images360' || that.type == 'plans3D') {
                        let imgs = document.querySelectorAll('.lg-outer img');
                        for (let i = 0; i < imgs.length; i++) {
                            let image = imgs[i];
                            var viewer = new Marzipano.Viewer(document.querySelector('.lg-outer .lg-item'));

                            var source = Marzipano.ImageUrlSource.fromString(
                                image['src']
                            );

                            // Create geometry.
                            var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

                            // Create view.
                            var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
                            var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

                            // Create scene.
                            var scene = viewer.createScene({
                                source: source,
                                geometry: geometry,
                                view: view,
                                pinFirstLevel: true
                            });

                            // Display scene.
                            scene.switchTo();
                        }
                    }
                }, 100);

            }, false);
        }, 100);


    }

    open() {

        if (this.type == 'videos') {
            this.videone.nativeElement.click();
        } else if (this.type == 'docs') {
            this.pdfGallery.nativeElement.setAttribute("data-src", this.image);
            lightGallery(document.getElementById('google-map'), {
                selector: 'this'
            });
            const that = this;
            setTimeout(() => {
                that.pdfGallery.nativeElement.click();
            }, 1000);
        } else {
            this.imagene.nativeElement.click();
        }
    }

}
