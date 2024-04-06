import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';



const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  constructor(private http: HttpClient) { }

  //----GET CATEGORIES---//
  getCategories() {

    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  //----POST CATEGORIES---//
  saveCategories(body: any) {

    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);

  }
  //----Update CATEGORIES---//
  UpdateCategory(body: any, id: any) {

    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);

  }
  //----Delete CATEGORIES---//
  deleteCategory(id: any) {

    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);

  }

  //----PUT CATEGORIES---//
  getCategoryById(id: any) {

    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);

  }




}
