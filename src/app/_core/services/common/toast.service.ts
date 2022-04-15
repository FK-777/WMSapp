import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message, header='', duration = 2000) {
    const toast = await this.toastController.create({
      header,
      message,
      duration
    });
    toast.present();
  }
}
