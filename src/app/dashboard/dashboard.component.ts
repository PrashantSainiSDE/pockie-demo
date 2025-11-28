import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Banner } from '../models/banner.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgClass,FormsModule]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  apiService: any = inject(ApiServiceService);

  categories: Category[] = [];
  products: Product[] = [];
  banners: Banner[] = [];

  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;

  totalFavouriteItems: number = 5; // Example static value

  // loading = true;
  // error: string | null = null;

  searchText: string = '';
searchCategory: string | null = null;

searchResults: any[] = [];

  ngOnInit() {
    this.apiService.data.subscribe({
    next: (data:any) => {
        this.categories = data.categories || [];

        this.banners = data.banners || [];

        this.products = data.products.map((p:any) => ({
      ...p,
      categoryName: this.categories.find(c => c.id === p.categoryId)?.name
    }));

    this.searchResults = [...this.products];

        this.filteredProducts = [...this.products]; // initially show all

        this.totalFavouriteItems = this.products.filter(p => p.isFavorite).length;

        // this.loading = false;
      },
      error: (err:any) => {
        console.error('Failed to load store.json', err);
      //   this.error = 'Could not load store data.';
      //   this.loading = false;
      }
  });
  }

  selectCategory(catId: number | null) {
    this.selectedCategoryId = catId;
    if (catId === null) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.categoryId === catId);
    }
  }

searchProducts() {
  let filtered = [...this.products];

  // filter by text
  if (this.searchText.trim()) {
    const text = this.searchText.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(text)
    );
  }

  // filter by category
  if (this.searchCategory && this.searchCategory !== 'Category') {
    filtered = filtered.filter(p =>
      p.categoryName?.toLowerCase() === this.searchCategory?.toLowerCase()
    );
  }

  this.searchResults = filtered;
}

}
