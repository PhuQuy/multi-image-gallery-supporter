import { NgModule } from '@angular/core';
import { GocodeeGallerySupporterComponent } from './gocodee-gallery-supporter.component';
import { CommonModule } from '@angular/common';
import { GocodeeGallerySupporterService } from './gocodee-gallery-supporter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GocodeeGallerySupporterComponent],
  exports: [GocodeeGallerySupporterComponent],
  providers: [GocodeeGallerySupporterService]
})
export class GocodeeGallerySupporterModule { }
