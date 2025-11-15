import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', canActivate: [authGuard], component: HomeComponent},
    {path: 'about', canActivate: [authGuard],component: AboutComponent},
    {path: 'products', canActivate: [authGuard],component: ProductsComponent},
    {path: 'categories',canActivate: [authGuard], component: CategoriesComponent},
    {path: 'cart',canActivate: [authGuard], component: CartComponent},
    {path: 'favorites', canActivate: [authGuard],component: FavoritesComponent},
    {path: 'productDetails/:id', canActivate: [authGuard],component: ProductDetailsComponent},
    
    
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    
    {path: '**', component: NotfoundComponent}
];
