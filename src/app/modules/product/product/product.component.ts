import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/componentes/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,

  ) { }
  ngOnInit(): void {
    this.getProducts()
  }


  displayedColumns: String[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions']
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
      .subscribe((data: any) => {
        this.processProductResponse(data);
        // console.log("Respuesta de productos", data);

      }, (error: any) => {
        console.log("error al cargar products: ", error);
      })
  }

  processProductResponse(resp: any) {

    const dataProduct: ProductElement[] = [];

    if (resp.metadata[0] = "00") {

      let listProduct = resp.product.products;

      // agregando imagenes y categorias al objeto produco para mostrar
      listProduct.forEach((element: ProductElement) => {
        // element.category = element.category.name;
        // element.picture = 'data:image/jpeg;base64,' + element.picture;
        dataProduct.push(element)
      });
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
    }
  }

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto agregado", "Exitosamente");
        this.getProducts();

      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar el producto", "Error");
      }

    });

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration: 3200 });
  }


  /**
   * edit product
  **/
  edit(id: number, name: string, price: number, account: number, category: any, picture: string) {

    const dialogRef = this.dialog.open(NewProductComponent, {
      data: { id: id, name: name, price: price, account: account, category: category, picture: picture }
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto agregado", "Exitosamente");
        this.getProducts();

      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar el producto", "Error");
      }

    });

  }
  /**
    * Delete product
   **/

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450xp',
      data: { id: id, module: "product" }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Producto eliminado', "Exitosamente");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar el producto", "Error")

      }

    });

  }

  /**
    * Delete product
   **/
  findProduct(name: any) {
    if (name.length === 0) {
      return this.getProducts();
    }
    this.productService.getProductsByName(name)
      .subscribe((resp: any) => {
        this.processProductResponse(resp);
      })

  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: string;
  // picture: any;
}
