import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { BlogComponent } from './blog/blog.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProfileComponent } from './profile/profile.component';
import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { ProductResolver } from './shared/services/product.resolver';
import { SinglePostComponent } from './single-post/single-post.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'archive',
    component: LayoutComponent,
    children: [
      { path: '', component: ArchiveComponent }
    ]
  },
  {
    path: 'profile',
    component: LayoutComponent,
    children: [
      { path: '', component: ProfileComponent }
    ]
  },
  {
    path: 'my-account',
    component: LayoutComponent,
    children: [
      { path: '', component: MyAccountComponent }
    ]
  },
  {
    path: 'post',
    component: LayoutComponent,
    children: [
      { path: '', component: SinglePostComponent }
    ]
  },
  {
    path: 'product/:id',
    component: LayoutComponent,
    children: [
      { path: '', component: SingleProductComponent, resolve: { product: ProductResolver } }
    ]
  },
  {
    path: 'product/:id/:seo',
    component: LayoutComponent,
    children: [
      { path: '', component: SingleProductComponent, resolve: { product: ProductResolver } }
    ]
  },
  {
    path: 'category',
    component: LayoutComponent,
    children: [
      { path: '', component: CategoryComponent }
    ]
  },
  {
    path: 'blog',
    component: LayoutComponent,
    children: [
      { path: '', component: BlogComponent }
    ]
  },
  {
    path: 'checkout',
    component: LayoutComponent,
    children: [
      { path: '', component: CheckoutComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedInGuard]
  },
  { path: 'register', component: LoginComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
