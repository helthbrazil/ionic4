import { Component } from '@angular/core';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { Brightness } from '@ionic-native/brightness/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  brilho = 80;

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  constructor(private brightness: Brightness) { }

  atualizarBrilho() {
    console.log(this.brilho);
    this.brightness.setBrightness(this.brilho / 100);
  }
}
