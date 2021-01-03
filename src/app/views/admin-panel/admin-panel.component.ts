import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {AuthService} from '../../services/Auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  // controls
  getUsersSpinner: boolean;

  constructor(public adminService: AdminService, public authService: AuthService) {
  }

   ngOnInit(): void {
    this.getUsersSpinner = true;
    this.adminService.getAllUsers();
    this.getUsersSpinner = false;

  }

}
