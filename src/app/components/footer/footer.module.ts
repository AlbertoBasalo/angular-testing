import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinkModule } from '@components/link/link.module';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, LinkModule],
  exports: [FooterComponent],
})
export class FooterModule {}
