import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EscolhaPage } from '../escolha/escolha';
import { Carro } from '../../domain/carro/carro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros: Carro[];

   constructor(
     public navCtrl: NavController, 
     private _http: Http, 
     private _loadingCtrl: LoadingController,
     private _alertCtrl: AlertController) {}

    ngOnInit() {
      let loader = this._loadingCtrl.create({
        content: "Searching New Cars. Please Wait...",
      });
      loader.present(); // displays the new loader

      this._http
          .get('https://aluracar.herokuapp.com')
          .map(res => res.json())
          .toPromise()
          .then(carros => {
            this.carros = carros
            loader.dismiss(); // close the loader
          })
          .catch(err => {
            console.log(err);
            loader.dismiss(); 

            let alert = this._alertCtrl.create({
                title: 'Conection Failed!',
                buttons: [{ text: 'OK' }],
                subTitle: 'It was not possible to get the car list. Try again later.' 
            }).present();
          });
    }

    select(carro){
      this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });
    }
}
