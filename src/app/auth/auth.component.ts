import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { authResponseData, AuthService } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component'


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

    constructor(private authService: AuthService,
        private router:Router) { }

    isLoginMode = true;
    isLoading = false;
    error: any = null;

    ngOnInit() {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleClose(){
        this.error=null 
    }

    private showErrorAlert(error:string){

    }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObser: Observable<authResponseData>;

        if (this.isLoginMode) {
            authObser = this.authService.login(email, password);
        } else {
            authObser = this.authService.signup(email, password)
        }

        authObser.subscribe(responseData => {
            this.isLoading = false;
            this.router.navigate(['./recipes'])
        }, error => {
            this.isLoading = false;
            this.error = error;
            this.showErrorAlert(this.error);
        })

        form.reset()
    }
}