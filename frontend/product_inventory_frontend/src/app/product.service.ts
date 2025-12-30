import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string ='http://localhost:5050/api/product';

  constructor(private http:HttpClient) { }
      getproduct(){
      return this.http.get<any[]>(this.url);
    }
    
    addproduct(product:any){
      return this.http.post<any[]>(this.url,product);
    }

      getproductbyid(id:string){
      return this.http.get<any[]>(`${this.url}/${id}`);
    }
    deleteProduct(id: string) {
    return this.http.delete(`${this.url}/${id}`);
    }
    updateProduct(id: string, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
    }
    


}
