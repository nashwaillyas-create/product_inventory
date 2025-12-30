import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  products: any[] = [];

  product: any = {
    _id: '',
    productName: '',
    category: '',
    price: 0
  };

  constructor(private ps: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.ps.getproduct().subscribe(data => {
      this.products = data;
    });
  }

  selectProduct(p: any) {
    this.product = { ...p }; 
  }

  addProduct() {
    this.ps.addproduct(this.product).subscribe({
      next: () => {
        alert('Product added');
        this.clearForm();
        this.loadProducts();
      },
      error: () => alert('Error adding product')
    });
  }

  updateProduct() {
    if (!this.product._id) {
      alert('Select a product to update');
      return;
    }

    this.ps.updateProduct(this.product._id, this.product).subscribe({
      next: () => {
        alert('Product updated');
        this.clearForm();
        this.loadProducts();
      },
      error: () => alert('Error updating product')
    });
  }

  clearForm() {
    this.product = {
      _id: '',
      productName: '',
      category: '',
      price: 0
    };
  }
}
