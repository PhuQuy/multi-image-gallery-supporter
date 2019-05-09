import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Marzipano from 'marzipano';

@Component({
    selector: 'gocodee-360-viewer',
    template: `<div class="position-relative w-100 h-100vh">
    <div #imageAAA id="pano"></div>
</div>`,
    styleUrls: ['./gocodee-gallery-supporter.component.css']
})
export class GocodeeGallerySupporterComponent implements OnInit {
    @Input() imageURL;
    @ViewChild('imageAAA') asds: ElementRef;
    constructor() { }

    ngOnInit() {
        var viewer = new Marzipano.Viewer(document.getElementById('pano'));
        var viewer = new Marzipano.Viewer(this.asds.nativeElement);

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
