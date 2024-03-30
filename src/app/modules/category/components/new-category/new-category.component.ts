import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  estadoFormulario: string = "";

  constructor(private fb: FormBuilder, private categoryService: CategoryService,
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.estadoFormulario = "Agregar";

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });


    if (data != null) {
      this.updateForm(data);
      this.estadoFormulario = "Actualizar"

    }
  }
  ngOnInit(): void {


  }

  onSave(): void {
    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value,
    }
    if (data != null) {
      //updatea registry
      this.categoryService.UpdateCategory(data, this.data.id)
        .subscribe((data: any) => {
          console.log(data);
          this.dialogRef.close(1);

        }, (error: any) => {
          this.dialogRef.close(2);
          console.log(error);
        })

    } else {
      //save registry
      this.categoryService.saveCategories(data)
        .subscribe((data: any) => {
          console.log(data);
          this.dialogRef.close(1)

        }, (error: any) => {
          this.dialogRef.close(2);
          console.log(error);

        });

    }
  }

  onCancel(): void {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
    });

  };


}
