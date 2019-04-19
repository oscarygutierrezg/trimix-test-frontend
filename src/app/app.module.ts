import { TipoDocumento } from './model/tipo-documento';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { MaterialModule } from './angular-material/angular-material.module';
import { TablePaginationComponent } from './angular-material/components/table-pagination/table-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PersonaListComponent } from './persona-list/persona-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/tipo-documento.reducer';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { ConfirmDialogComponent } from './angular-material/components/confirm-dialog/confirm-dialog.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    PersonaListComponent,
    PersonaFormComponent,
    TablePaginationComponent,
    ConfirmDialogComponent,
    NumberOnlyDirective,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({
      tipoDocumento: reducer
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

