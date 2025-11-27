import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Banner } from '../models/banner.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  apiService: any = inject(ApiServiceService);

  categories: Category[] = [];
  products: Product[] = [];
  banners: Banner[] = [];

  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.apiService.data.subscribe({
    next: (data:any) => {
        this.categories = data.categories || [];
        this.products = data.products || [];
        this.banners = data.banners || [];

        this.filteredProducts = [...this.products]; // initially show all
        this.loading = false;
      },
      error: (err:any) => {
        console.error('Failed to load store.json', err);
        this.error = 'Could not load store data.';
        this.loading = false;
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
}
