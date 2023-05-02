import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { CustomerIndexComponent } from './views/customer-index/customer-index.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { CustomerListComponent } from './cmps/customer-list/customer-list.component';
import { CustomerPreviewComponent } from './cmps/customer-preview/customer-preview.component';
import { FilterComponent } from './cmps/filter/filter.component';
import { CustomerDetailsComponent } from './views/customer-details/customer-details.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { InfoGridComponent } from './cmps/info-grid/info-grid.component';
import { CocktailRecipeComponent } from './cmps/cocktail-recipe/cocktail-recipe.component';
import { CustomerEditComponent } from './views/customer-edit/customer-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CustomerIndexComponent,
    CustomerListComponent,
    CustomerPreviewComponent,
    FilterComponent,
    CustomerDetailsComponent,
    HomepageComponent,
    InfoGridComponent,
    CocktailRecipeComponent,
    CustomerEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
