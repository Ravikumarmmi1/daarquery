import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoaderService } from '../../services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{
 
  constructor(private loaderService: LoaderService) {}
    isLoading: boolean = false;
    subscription: Subscription = new Subscription;
  
    ngOnInit(){
      this.subscription = this.loaderService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    }
}
