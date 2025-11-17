import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.scss',
  imports: [MatDialogClose, MatButton],
})
export class DeleteProductDialog {
  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
}
