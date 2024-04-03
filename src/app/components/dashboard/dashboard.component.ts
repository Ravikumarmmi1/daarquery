import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private loaderService: LoaderService ){}
  

  ngOnInit(){
    /* setTimeout(() => {
      this.loaderService.show();
    }, 2000);
    setTimeout(() => {
      this.loaderService.hide();
    }, 5000); */
  }
}
