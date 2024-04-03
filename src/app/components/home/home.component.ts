import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { LoaderComponent } from '../../plugin/loader/loader.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
