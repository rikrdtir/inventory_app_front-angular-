import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm: FormGroup;
  estadoFormulario: String = "";
  categories: Category[] = [];
  selectedFile: any;
  nameImg: string = "";

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<NewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.estadoFormulario = "Agregar";
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required],
      // picture: ['',],

    })
    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";

    }

  }



  ngOnInit(): void {
    this.getCategories();
    // console.log(this.getCategories());

  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {

        console.log("categorias : ", data);
        // this.categories = data.categoryResponse.category;
        this.categories = data.categoryResponse.categories;

      }, (error: any) => {
        console.log("error", error);
      })


  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.productForm.get('picture')?.value,
      // picture: this.selectedFile
    }
    const upLoadImageData = new FormData();
    // upLoadImageData.append('picture', data.picture.name, data.picture.name);
    upLoadImageData.append('name', data.name);
    upLoadImageData.append('price', data.price);
    upLoadImageData.append('account', data.account);
    upLoadImageData.append('categoryId', data.category);
    upLoadImageData.append('picture', data.picture);

    if (this.data != null) {
      // update Product
      this.productService.updateProduct(upLoadImageData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })


    } else {

      // call service to save product
      this.productService.saveProduct(upLoadImageData)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);

        })

    }
  }
  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: [data.picture, Validators.required],
    })



  }

  onCancel() {

    this.dialogRef.close(3);
  }

  // onFileChanged(event: any) {
  //   this.selectedFile = event.target.files[0];
  //   // console.log(this.selectedFile);
  //   this.nameImg = event.target.files[0].name;
  // }

}

export interface Category {
  id: number;
  description: string;
  name: string;
}


