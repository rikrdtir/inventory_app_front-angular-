import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private productSerice: ProductService,
  ) { }

  //// Clic
  onNotCLick() {
    this.dialogRef.close(3);
  }

  //// Delete
  delete() {
    if (this.data != null) {
      if (this.data.module = "category") {
        this.categoryService.deleteCategory(this.data.id)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error: any) => {
            this.dialogRef.close(2);
          })
      } else if (this.data.module = "product") {
        this.productSerice.deleteProduct(this.data.id)
        this.categoryService.deleteCategory(this.data.id)
          .subscribe((data: any) => {
            this.dialogRef.close(1);
          }, (error: any) => {
            this.dialogRef.close(2);
          })

      }

    } else {
      this.dialogRef.close(2);
    }

  }
}
