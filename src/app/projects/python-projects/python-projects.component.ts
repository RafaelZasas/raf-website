import {Component, OnInit} from '@angular/core';
import M from 'materialize-css';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-python-projects',
  templateUrl: './python-projects.component.html',
  styleUrls: ['./python-projects.component.css']
})
export class PythonProjectsComponent implements OnInit {

  options = {};
  elems: any;
  readonly ROOT_URL = 'http://34.72.115.208/password?pwd_length=10&use_symbols=true';
  // 'http://jsonplaceholder.typicode.com/posts';
  passwords: any;


  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {

    this.elems = document.querySelectorAll('select');
    M.FormSelect.init(this.elems, this.options); // for the dropdown menu
  }

  getPassword() {
    const headers = new HttpHeaders()
      .set('Accept', '*');
    this.passwords = this.http.get(this.ROOT_URL, {headers});
    console.log(this.passwords);
  }

}
