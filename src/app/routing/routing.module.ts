import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../comps/home/home.component';
import { DialogComponent } from '../comps/dialog/dialog.component';
import { SiginInComponent } from '../comps/sigin-in/sigin-in.component';

const routes: Routes = [

  {path:'home', component:HomeComponent,
     
      children:[
           {path:'sign-in', component:SiginInComponent},
           {path:'', redirectTo:'sign-in', pathMatch:'full'},
      ]},
  
  {path:'', redirectTo:'home', pathMatch:'full'},
  // {path:'**', component:HomeComponent},

]

@NgModule({
  declarations: [],
    imports: [ RouterModule.forRoot(routes)], 
      exports : [RouterModule]
})
export class RoutingModule { }
