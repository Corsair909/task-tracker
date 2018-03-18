import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Project } from './projects';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[];

  constructor(private authService: AuthService) {
    this.authService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  ngOnInit() {
  }

}
