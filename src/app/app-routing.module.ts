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
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedInGuard]
  },
    {
    path: 'register',
    component: LoginComponent,
    canActivate: [IsLoggedInGuard]
  },
 {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'post',
        component: SinglePostComponent,
      },
      {
        path: 'product/:id',
        component: SingleProductComponent,
        resolve: { product: ProductResolver }
      },
      {
        path: 'product/:id/:seo',
        component: SingleProductComponent,
        resolve: { product: ProductResolver }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
