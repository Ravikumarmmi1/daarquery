import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
// import { UserService } from "./user.service";
import { Encription } from '../../utils/encription';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    Router: Router = inject(Router);
    crypt = inject(Encription);
    login(){
        if(localStorage.getItem('_userEncDetails')){
            let dec = this.crypt.decryptUsingAES256(localStorage.getItem('_userEncDetails'));
            dec = JSON.parse(dec)
            if(dec.jtoken==localStorage.getItem('_jtoken')){
                this.Router.navigate(['/dashboard']);
                return
            }
        }else{
            this.Router.navigate(['/login']);
        }
    }
    logout(){
        if(localStorage.getItem('_userEncDetails')){
            localStorage.removeItem('_jtoken');
            localStorage.removeItem('_userEncDetails');
            localStorage.removeItem('_userName');
            localStorage.removeItem('_profilePicture');
            localStorage.removeItem('_fa');
        }
        this.Router.navigate(['/login']);
    }

    IsAuthenticated():Boolean{
        if(localStorage.getItem('_userEncDetails')){
            let dec = this.crypt.decryptUsingAES256(localStorage.getItem('_userEncDetails'));
            dec = JSON.parse(dec)
            if(dec.jtoken==localStorage.getItem('_jtoken')){
                return true
            }
        }
        return false
    }
}
	