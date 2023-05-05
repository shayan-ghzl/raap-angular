import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { CategoryComponent } from './category/category.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ArchiveComponent } from './archive/archive.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { HttpClientModule } from '@angular/common/http';
import { uiReducer } from './state/reducers/ui.reducer';
import { basketCalculationReducer, basketReducer } from './state/reducers/basket.reducer';
import { BasketEffects } from './state/effects/basket.effect';
import { EffectsModule } from '@ngrx/effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IdentityEffects } from './state/effects/identity.effect';
import { identityReducer } from './state/reducers/identity.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    BlogComponent,
    LoginComponent,
    CheckoutComponent,
    CategoryComponent,
    SingleProductComponent,
    SinglePostComponent,
    ArchiveComponent,
    ProfileComponent,
    MyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    StoreModule.forRoot({
      isDesktop: uiReducer,
      basket: basketReducer,
      basketCalculation: basketCalculationReducer,
      isLoggedIn: identityReducer
    }),
    EffectsModule.forRoot([BasketEffects, IdentityEffects]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SwiperModule,
    NgxImageZoomModule,
    MatTabsModule,
    CdkAccordionModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }