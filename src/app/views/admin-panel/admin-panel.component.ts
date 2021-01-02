import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  // controls
  getUsersSpinner: boolean;

  constructor(public adminService: AdminService) {
  }

  async ngOnInit(): Promise<void> {
    this.getUsersSpinner = true;
    await this.adminService.getAllUsers();
    this.getUsersSpinner = false;

  }

}
