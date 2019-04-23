import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as Marzipano from 'marzipano';

@Component({
    selector: 'lib-gocodee-gallery-supporter',
    template: `
  <div #image></div>
  `,
    styleUrls: ['./gocodee-gallery-supporter.component.css']
})
export class GocodeeGallerySupporterComponent implements OnInit {
    @Input() imageURL;
    @ViewChild('image') image: ElementRef;
    constructor() { }

    ngOnInit() {
        var viewer = new Marzipano.Viewer(this.image.nativeElement);
        var source = Marzipano.ImageUrlSource.fromString(
            this.imageURL
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
