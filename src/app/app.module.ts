import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngrxStore/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './ngrxStore/auth/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RecipeEffects } from './ngrxStore/recipes/recipe.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([RecipeEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
