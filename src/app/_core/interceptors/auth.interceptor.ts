import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/common/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastController: ToastController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone();
        return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    AuthService.removeLoggedUser();
                    this.router.navigate(['/login']);
                } else if (err.status == 0 || err.statusText == 'Unknown Error') {
                    this.presentToast('No internet connection!');
                }
            }
        }));
    }

    async presentToast(message: string, header?: string) {
        const toast = await this.toastController.create({
          message,
          header,
          position: 'bottom',
          duration: 4000
        });
        toast.present();
      }
}
