import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 /*  showloader: boolean = false;
  constructor() { }
  showLoader(){
    this.showloader = true;
  }
  hideLoader(){
    this.showloader = false;
  } */

  constructor() { }

  private isLoadingVal: boolean = false;
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  isLoading$: Observable<boolean> = this.isLoading.asObservable(); 

  show() {
    this.updateLoader(true);
  }

  hide() {
    this.updateLoader(false);
  }

  updateLoader(value: boolean){ 
    this.isLoadingVal = value;
    this.isLoading.next(value);
  }
}
