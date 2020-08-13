import {Component, OnInit} from '@angular/core';
import {
  faRaspberryPi,
  faTwitter,
  faInstagram,
  faAngular,
  faFontAwesomeFlag,
  faBootstrap,
  faGitkraken,
  faSpotify, faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import {faPhone, faSwimmer} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  gitkraken = faGitkraken;
  bootstrap = faBootstrap;
  fontawesome = faFontAwesomeFlag;
  angular = faAngular;
  swimmer = faSwimmer;
  raspberrypi = faRaspberryPi;
  twitter = faTwitter;
  instagram = faInstagram;
  phone = faPhone;
  email = faEnvelope;
  spotify = faSpotify;
  linkedIn = faLinkedin;

  constructor() {
  }

  ngOnInit(): void {

  }

}
