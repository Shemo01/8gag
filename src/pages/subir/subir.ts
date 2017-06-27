import { Component } from '@angular/core';
import { ViewController, ToastController, Platform } from "ionic-angular";

//plugins
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';


@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo:string = "";
  imgPreview:string = null;
  img:string = null;

  constructor( private viewCtrl:ViewController,
               private camera: Camera,
               private imagePicker: ImagePicker,
               private toastCtrl:ToastController,
               private platform:Platform) {}

  mostrar_camara(){

    if( !this.platform.is("cordova")){

      this.mostrar_toast("Error: No estamos en un celular");
      return;
    }

    const options: CameraOptions = {
        quality: 40,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       this.imgPreview = 'data:image/jpeg;base64,' + imageData;
       this.img = imageData;
       console.log( "IMAGEN DE LA CAMARA: " , this.img );
      }, (err) => {
       // Handle error
        this.mostrar_toast(" Error: " + err );
        console.error( "Error en la camara" + err );

      });
  }

  seleccionar_fotod(){

    if( !this.platform.is("cordova")){

      this.mostrar_toast("Error: No estamos en un celular");
      return;
    }

    let opciones:ImagePickerOptions = {
      maximumImagesCount:1,
      quality:40,
      outputType:1
    };

    this.imagePicker.getPictures(opciones).then((results) => {

      for( let img of results ) {
        this.imgPreview =  'data:image/jpeg;base64,' + img
        this.img = img;
        // this.imgPreview = img;

        console.log( "IMAGEN DEL PICKER: " , img );

        break;
      }

    }, (err) => {

        this.mostrar_toast("Error seleccion: " + err );
        console.error( "Error en seleccion: " + JSON.stringify( err ));
    });

  }


  mostrar_toast( texto:string ){

    this.toastCtrl.create({
      message:texto,
      duration:2500
    }).present();

  }

}
