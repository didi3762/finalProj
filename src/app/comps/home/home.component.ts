import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SiginInComponent} from '../sigin-in/sigin-in.component';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  openDialog(butt) {

    console.log(butt);
    
    const dialogRef = this.dialog.open(SiginInComponent,{
      // data:{
      //    component: [SiginInComponent]
      // },

      // width: '250px',
    });
     
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 20px)"
    );
    if (isSmallScreen) {
      nav.toggle();
    }
  }

}
