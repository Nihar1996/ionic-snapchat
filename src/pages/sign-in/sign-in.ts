import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Snap } from '../snap/snap';
/**
* Generated class for the SignIn page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
    selector: 'page-sign-in',
    templateUrl: 'sign-in.html',
})
export class SignIn {
    snap = Snap;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignIn');
    }

}