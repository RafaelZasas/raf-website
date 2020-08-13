import {Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {
  faJs, faJsSquare,
  faPython
} from '@fortawesome/free-brands-svg-icons';
import {faPhone, faSwimmer} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faFileCode} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  python = faPython;
  javascript = faJsSquare;
  web = faFileCode ;
  constructor(
  ) {
  }

  ngOnInit(): void {
    const elems = document.querySelectorAll('.collapsible');
    const dropdown =  M.Collapsible.init(elems);
  }


}
