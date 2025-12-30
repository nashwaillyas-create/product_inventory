import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

    constructor(private ps: ProductService){ }
    products:any;

//     listProducts(){
//       this.ps.getproduct().subscribe((data)=>{
//         this.products = data;
//       })
//     }
    ngOnInit() {
  console.log('ngOnInit fired');
  this.listProducts();
}

listProducts() {
  console.log('listProducts called');
  this.ps.getproduct().subscribe({
    next: (data) => {
      console.log('HTTP success, data:', data);
      this.products = [...data];
    },
    error: (err) => {
      console.error('HTTP error:', err);
      alert('Error loading products');
    }
  });
}
pid: string = '';
successMessage: string = '';

removeProduct() {
    if (!this.pid) return;

    this.ps.deleteProduct(this.pid).subscribe({
      next: () => {
        this.successMessage = 'Product deleted successfully!';
        this.listProducts();
        this.pid = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: () => {
        this.successMessage = 'Error deleting product';
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }
  editing = false;
selectedProduct: any = {};

editProduct(p: any) {
  this.selectedProduct = { ...p };  
  this.editing = true;
}

cancelEdit() {
  this.editing = false;
  this.selectedProduct = {};
}

updateProduct() {
  this.ps.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe({
    next: () => {
      alert('Updated successfully');
      this.editing = false;
      this.selectedProduct = {};
      this.listProducts();
    },
    error: () => alert('Error updating product')
  });
}
setDeleteId(id: string) {
  this.pid = id;
}

}
