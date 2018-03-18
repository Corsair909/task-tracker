// internal Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// External Angular Modules
import { ClarityModule } from 'clarity-angular';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponentComponent } from './components/not-found-component/not-found-component.component';
import { CreatingComponent } from './components/creating/creating.component';

// Services
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectComponent } from './components/project/project.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
// Guard
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    NotFoundComponentComponent,
    CreatingComponent,
    ProfileComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule.forRoot(),
    ClarityModule.forRoot(),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'dashboard/project/:id', component: ProjectComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '404', component: NotFoundComponentComponent },
      { path: 'create', component: CreatingComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', redirectTo: '404' }
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
