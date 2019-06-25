import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";

import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
  MatListModule
} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule,MatListModule
  ],
  exports: [
    MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatInputModule, MatDividerModule, MatGridListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule,
    MatExpansionModule, MatTabsModule,MatListModule
  ]
})
export class MaterialModule {}
