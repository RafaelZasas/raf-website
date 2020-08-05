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


  boxSize = [1.4, 1.6, 1.9, 2.2];
  options = {dropdownOptions: this.boxSize};
  elems: any;
  private instance: any;
  surfaceAreaTotal = 10;
  tilesForm: FormGroup;
  public numBoxes: number;
  public userClicked = false;
  public remainder: string;


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
      this.remainder = (this.numBoxes - (formData.surfaceArea / formData.boxSize)).toFixed(2);

      this.tilesForm.reset();

      // if the user tries entering nothing
    } else {
      M.toast({html: 'Please fil entire form before submitting.', classes: 'rounded red'});
    }
  }

}
