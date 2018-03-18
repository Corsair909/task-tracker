import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creating',
  templateUrl: './creating.component.html',
  styleUrls: ['./creating.component.css']
})
export class CreatingComponent implements OnInit {
  creatingForm = new FormGroup({
    projectName: new FormControl(),
    description: new FormControl,
    topics: new FormArray([])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCreateSubmit(value) {
    let project = {
      projectName: value.projectName,
      description: value.description,
      topics: value.topics
    };

    this.authService.registerProject(project).subscribe(data => {
      this.router.navigate(['/dashboard']);
    });
  }

  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }

  removeTopic(topic: FormControl) {
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  get topics() {
    return this.creatingForm.get('topics') as FormArray;
  }

  preventDefault() {
    
  }
}
