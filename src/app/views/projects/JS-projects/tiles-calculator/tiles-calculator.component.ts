import {AfterViewInit, Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tokenReference} from '@angular/compiler';


@Component({
  selector: 'app-tiles-calculator',
  templateUrl: './tiles-calculator.component.html',
  styleUrls: ['./tiles-calculator.component.css']
})
export class TilesCalculatorComponent implements OnInit {


  boxSize = [1.28, 1.44, 1.62, 1.92, 2.16, 2.88];
  options = {dropdownOptions: this.boxSize};
  elems: any;
  private instance: any;
  surfaceAreaTotal = 10;
  tilesForm: FormGroup;
  public numBoxes: number; // number of boxes required to fulfill order
  public userClicked = false; // when the user submits the form -> show the table
  public totalOrderArea: any; // size of the total area required to fulfill the order
  public tileGlue: any; // price of the tile glue
  public tileGrout: any;  // grout for tiles. 100 sqm = 2 bags of 20kg
  public deliveryCost: any; // cost of delivery -> R480/ 50 sqm of tiles
  public tileSpacers: number;
  public registrationReady: boolean; // whether student has been advised or not


  constructor() {
  }


  ngOnInit(): void {

    // INITIALIZE THE FORM GROUP
    this.tilesForm = new FormGroup({
      surfaceAreaTotal: new FormControl('', [Validators.required]),
      selectedBox: new FormControl('', Validators.required)
    }); // init the form

    this.elems = document.querySelectorAll('select');
    this.instance = M.FormSelect;
    this.instance.init(this.elems, this.options); // for the dropdown menu
  }


  onSubmit() {

    this.userClicked = true;

    if (this.tilesForm.valid) { // check if the form is valid
      const formData = {
        surfaceArea: this.tilesForm.value.surfaceAreaTotal,
        boxSize: this.tilesForm.value.selectedBox
      };

      // clear the form once submitted

      this.numBoxes = Math.ceil((formData.surfaceArea / formData.boxSize));
      this.totalOrderArea = (this.numBoxes * formData.boxSize).toFixed(2);
      this.tileGlue = Math.ceil((this.totalOrderArea / 2));
      this.tileGrout = Math.ceil(this.totalOrderArea / 50);
      this.deliveryCost = (Math.ceil(this.totalOrderArea / 50) * 480).toFixed(2);
      this.tileSpacers = Math.ceil(this.totalOrderArea / 20);


      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fil entire form before submitting.', classes: 'rounded red'});
    }
  }

}
