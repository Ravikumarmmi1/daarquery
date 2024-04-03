import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';
// import { QueryBuilderComponent } from '../../pages/query-builder/query-builder.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: any = '';
  featuresNo:any;
  featurespath:any;
  filteredFeaturesPath:any;
  constructor(private router: Router, private loginService: LoginService) {
    /* console.log(this.decData) */
  }
  toggle: boolean = false;

  showHeader: boolean = false;

  handleLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  ngDoCheck() {
    this.user = localStorage.getItem('_userName');
    this.featuresNo=localStorage.getItem('_fa');
    this.featuresNo=JSON.parse(this.featuresNo);
    this.featurespath=environment.featurespath;
    if(this.featuresNo){
      this.filteredFeaturesPath = this.featurespath.filter((feature: { no: any; }) => this.featuresNo.includes(feature.no));
    }
    if (localStorage.getItem('_jtoken')) {
      this.showHeader = true;
      return;
    }
    
  }

  toggleSideNav() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      document.querySelector('.middleContainer')?.classList.add('SlideLeft');
      document.querySelector('.rightSection')?.classList.remove('left');
    } else {
      document.querySelector('.middleContainer')?.classList.remove('SlideLeft');
      document.querySelector('.rightSection')?.classList.add('left');
    }
  }
    
}
