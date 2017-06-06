import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthProvider } from '../../providers/auth-service/auth-service';
  import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
  import { User} from '../../model/user'
  import { EmailValidator } from '../../validators/email';
  import { Storage } from '@ionic/storage';

  @IonicPage()
  @Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
  })
  export class SignUp {
    public signupForm: FormGroup;
    users: FirebaseListObservable<User[]>;
    loading: Loading;
    private storage: Storage;


    constructor(public navCtrl: NavController, public authProvider: AuthProvider,
      public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
      public alertCtrl: AlertController, angularfire: AngularFireDatabase, private storage: Storage) {
      this.users = angularfire.list('/users');
      this.signupForm =  formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        name: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
      this.storage = storage;
    }

    signupUser(){
      if (!this.signupForm.valid){
        console.log(this.signupForm.value);
      } else {
        this.authProvider.signupUser(this.signupForm.value.email,
          this.signupForm.value.password)
        .then(() => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot('Snap');
          });
        }, (error) => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
              ]
            });
            alert.present();
          });
        });
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        this.registerUser(this.signupForm.value.email,this.signupForm.value.name,this.signupForm.value.lastname);
      }
    }


    registerUser(login:string,name:string,lastname:string){
      var result = this.users.push({
        name: name,
        lastname: lastname,
        login: login,
        score: 0,
      });
      this.storage.set('userId',result.key);
    }

  }
