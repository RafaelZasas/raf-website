import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/Auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidator} from '../../form-validators/authentication.validator';
import {Router} from '@angular/router';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import * as firebase from 'firebase/app';
// Add the Performance Monitoring library
import 'firebase/performance';
import {AngularFirestore} from '@angular/fire/firestore';
import {Angular2MaterializeV1Service} from 'angular2-materialize-v1';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  google = faGoogle;
  perf = firebase.performance(); // initializes the firebase performance module
  screenTrace: firebase.performance.Trace; // tracks how long the screen has been opened
  updateUserDataForm: FormGroup;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private angular2MaterializeService: Angular2MaterializeV1Service) {
  }

  ngOnInit(): void {
    this.screenTrace = this.perf.trace('aboutMeScreen'); // trace name = loginScreen for tracking in FB
    this.screenTrace.start(); // start the timer

    // FORM GROUP FOR THE USER DATA
    const userData = this.fb.group({
      username: new FormControl('', [Validators.minLength(4)],
        [CustomValidator.usernameAvailability(this.afs)]),
      profilePhoto: new FormControl('')

    });

    this.updateUserDataForm = this.fb.group({
      userData, //   user data form group
    });

  }

  ngAfterViewInit(): void {
    this.angular2MaterializeService.initSelect('select');
  }


  ngOnDestroy(): void {
    this.screenTrace.stop();
  }

  async navigateToLogin() {
    await this.router.navigate(['/login']);
  }


  /*
  GETTERS SECTION FOR ACCESSING INDIVIDUAL FORM ELEMENTS WITHIN THE DOM
   */

  get username() {
    return this.updateUserDataForm.get('userData.username');
  }


  get profilePhoto() {
    return this.updateUserDataForm.get('userData.profilePhoto');
  }


  updateUserData() {

    if (this.updateUserDataForm.valid) { // check if the form is valid
      // provide credentials for email login service
      try {
        this.angular2MaterializeService.toast({
          html: `Updated Profile Information`,
          classes: 'rounded blue'});
      } catch (e) {
        this.angular2MaterializeService.toast({
          displayLength: 4000,
          html: `Error updating Profile Information\n${e.code}`,
          classes: 'rounded red'
        });
        console.log(`Error updating Profile Information\n${e.code}\n${e.message}`);
      }
    }
  }

}
