import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryMenuComponent } from './components/primary-menu/primary-menu.component';
import { RouterModule } from '@angular/router';
import { CollapseCtrlDirective } from './directives/collapse-ctrl.directive';
import { CollapseContentDirective } from './directives/collapse-content.directive';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownCtrlDirective } from './directives/dropdown-ctrl.directive';
import { PromotionOfferComponent } from './components/promotion-offer/promotion-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PasswordToggleCtrlDirective } from './directives/password-toggle-ctrl.directive';
import { PasswordToggleDirective } from './directives/password-toggle.directive';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { ProductCounterComponent } from './components/product-counter/product-counter.component';
import { IRCurrencyPipePipe } from './pipes/ircurrency-pipe.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ProductCardPlaceholderComponent } from './components/product-card-placeholder/product-card-placeholder.component';
import { PageTitleTabsComponent } from './components/page-title-tabs/page-title-tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CommentsComponent } from './components/comments/comments.component';
import { EmptyMessageComponent } from './components/empty-message/empty-message.component';
import { CategoryCardPlaceholderComponent } from './components/category-card-placeholder/category-card-placeholder.component';
import { CheckoutItemPlaceholderComponent } from './components/checkout-item-placeholder/checkout-item-placeholder.component';
import { CheckoutItemCardComponent } from './components/checkout-item-card/checkout-item-card.component';
import { CheckoutInvoicePlaceholderComponent } from './components/checkout-invoice-placeholder/checkout-invoice-placeholder.component';
import { CheckProductCountPipe } from './pipes/check-product-count.pipe';
import { LogoSpinnerComponent } from './components/logo-spinner/logo-spinner.component';
import { CircleSpinnerComponent } from './components/circle-spinner/circle-spinner.component';
import { CountdownPipe } from './pipes/countdown.pipe';

@NgModule({
  declarations: [
    PrimaryMenuComponent,
    CollapseCtrlDirective,
    CollapseContentDirective,
    AccessibilityComponent,
    DropdownDirective,
    DropdownCtrlDirective,
    PromotionOfferComponent,
    SearchFormComponent,
    FooterComponent,
    BottomNavigationComponent,
    PageTitleComponent,
    PasswordToggleCtrlDirective,
    PasswordToggleDirective,
    FormGeneratorComponent,
    ProductCounterComponent,
    IRCurrencyPipePipe,
    ProductCardComponent,
    PostCardComponent,
    CategoryCardComponent,
    ProductCardPlaceholderComponent,
    PageTitleTabsComponent,
    PaginationComponent,
    CommentsComponent,
    EmptyMessageComponent,
    CategoryCardPlaceholderComponent,
    CheckoutItemPlaceholderComponent,
    CheckoutItemCardComponent,
    CheckoutInvoicePlaceholderComponent,
    CheckProductCountPipe,
    LogoSpinnerComponent,
    CircleSpinnerComponent,
    CountdownPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTabsModule,
    FormsModule
  ],
  exports: [
    PrimaryMenuComponent,
    AccessibilityComponent,
    PromotionOfferComponent,
    FooterComponent,
    BottomNavigationComponent,
    PageTitleComponent,
    ProductCounterComponent,
    FormGeneratorComponent,
    IRCurrencyPipePipe,
    ProductCardComponent,
    PostCardComponent,
    CategoryCardComponent,
    ProductCardPlaceholderComponent,
    PageTitleTabsComponent,
    CommentsComponent,
    EmptyMessageComponent,
    CategoryCardPlaceholderComponent,
    CheckoutItemPlaceholderComponent,
    CheckoutItemCardComponent,
    CheckoutInvoicePlaceholderComponent,
    CheckProductCountPipe,
    LogoSpinnerComponent,
    CircleSpinnerComponent,
    CountdownPipe,
    PasswordToggleCtrlDirective,
    PasswordToggleDirective
  ]
})
export class SharedModule { }
