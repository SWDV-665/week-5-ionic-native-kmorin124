import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service'

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(public alertController: AlertController, public groceryService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      header: item ? 'Edit Item...' : 'Add Item...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Saved -', item);
            if (index !== undefined) {
              this.groceryService.editItem(item, index)
            }
            else {
              this.groceryService.addItem(item)
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
