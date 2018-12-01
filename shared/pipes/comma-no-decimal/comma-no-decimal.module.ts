import { NgModule } from '@angular/core';
import { CommaNoDecimalPipe } from '@shared/pipes/comma-no-decimal/comma-no-decimal';

@NgModule({
  imports: [],
  exports: [CommaNoDecimalPipe],
  declarations: [CommaNoDecimalPipe],
  providers: []
})
export class CommaNoDecimalModule {}
