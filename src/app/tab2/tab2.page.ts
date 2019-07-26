import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogService } from '../input-dialog.service';
import { ModalController } from '@ionic/angular';
import { PromptModalPage } from '../prompt-modal/prompt-modal.page'
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title = "Grocery List"

  constructor(public toastController: ToastController, public alertController: AlertController, public groceryService: GroceriesServiceService, public dialogService: InputDialogService, public modalController: ModalController) {}

  loadItems() {
    return this.groceryService.getItems();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PromptModalPage
    });
    return await modal.present();
  }
  
  async removeItem(item, index) {
    console.log("Removing Item - ", index, item)
    const toast = await this.toastController.create({
      message: 'Removing ' + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.groceryService.removeItem(index)
  }

  async addItem() {
    console.log("Adding Item -");
    this.dialogService.showPrompt()
  }

  async editItem(item, index) {
    console.log("Editing Item -");
    const toast = await this.toastController.create({
      message: 'Editing ' + item.name + "...",
      duration: 3000
    });
    toast.present();
    this.dialogService.showPrompt(item, index)
  }
}
