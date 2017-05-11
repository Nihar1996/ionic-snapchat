import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

/**
* Generated class for the Snap page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-snap',
    templateUrl: 'snap.html',
})
export class Snap {

    constructor(private cameraPreview: CameraPreview, /*private camera: Camera, */public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: 'rear',
            toBack: true,
            tapPhoto: false,
            previewDrag: false,
            alpha: 1
        };

        // start camera
        this.cameraPreview.startCamera(cameraPreviewOpts).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            }
        );

        console.log('ionViewDidLoad Snap');
    }


    /*takePicture() {
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
// imageData is either a base64 encoded string or a file URI
// If it's base64:
let base64Image = 'data:image/jpeg;base64,' + imageData;
alert(base64Image);
}, (err) => {
// Handle error
});
}*/

}
