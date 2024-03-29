import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumn: string[] = ['id', 'name', 'desciption', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  //-----List categories------//
  getCategories() {
    this.categoryService.getCategories()
      .subscribe((data: any) => {

        console.log("categorias :", data);
        this.processCategoryResponse(data);

      }, (error: any) => {
        console.log("error", error);
      })
  }

  processCategoryResponse(resp: any) {

    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code = "00") {

      let listCategories = resp.categoryResponse.categories;

      listCategories.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);

    }
  }

  //-----Save categories------//
  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoría agregada", "Exitosamente");
        this.getCategories();

      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar categoría", "Error");

      }

    });

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 3200 });


  }



}
export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
