import { Component, ViewChild, OnInit } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  imagens: Array<any>;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    cameraDirection: this.camera.Direction.FRONT,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    allowEdit: true,
    targetWidth: 400,
    targetHeight: 400,
    mediaType: this.camera.MediaType.PICTURE
  };

  mostrar = false;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  slideOpts = {
    initialSlide: 1,
    speed: 300,
    autoplay: true
  };

  constructor(private faio: FingerprintAIO, private camera: Camera, private sanitizer: DomSanitizer) {
    this.imagens = new Array<any>();
    // tslint:disable-next-line:max-line-length
    this.imagens.push('assets/images/futebol.jpg', 'assets/images/handbol.jpg', 'assets/images/mata.jpg', 'assets/images/run.jpg', 'assets/images/time.jpg');
    console.log(this.imagens);

  }

  doReorder(ev: any) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  ionViewDidEnter() {

    if (!this.mostrar) {
      if (this.faio.isAvailable()) {
        this.faio.show({
          clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
          clientSecret: 'o7aoOMYUbyxaD23oFAnJ'//Necessary for Android encrpytion of keys. Use random secret key.
        })
          .then((result: any) => {
            this.mostrar = true;
          })
          .catch((error: any) => {
            this.mostrar = false;
          });
      }
    }
  }

  baterFoto() {
    console.log('teste');
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
      this.imagens.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }
}
