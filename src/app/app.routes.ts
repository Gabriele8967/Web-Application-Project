// app.routes.ts
import { Routes } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { ProgressGraphComponent } from './Components/progress-graph/progress-graph.component';
import { SetDatiComponent } from './Components/set-dati/set-dati.component';
import { SetImgProfileComponent } from './Components/set-img-profile/set-img-profile.component';
import { SetPasswordComponent } from './Components/set-password/set-password.component';
import { ReservationsComponent } from './Components/reservations/reservations.component';
import { ReservationHistoryComponent } from './Components/reservation-history/reservation-history.component';
import { AbilitiesComponent } from './Components/abilities/abilities.component';
import { MatchHistoryComponent } from './Components/match-history/match-history.component';
import { BookFieldComponent } from './Components/book-field/book-field.component';
import { BookLessonComponent } from './Components/book-lesson/book-lesson.component';
import { FindOpponentComponent } from './Components/find-opponent/find-opponent.component';
import { MatchmakingComponent } from './Components/matchmaking/matchmaking.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrazioneComponent } from './Components/registrazione/registrazione.component';
import {AuthGuard} from './Services/authGuard';
import {ForgotPasswordComponent} from './Components/forgot-password/forgot-password.component';
import {OtpRequestComponent} from './Components/otp-request/otp-request.component';
import {UpdateLostPasswordComponent} from './Components/update-lost-password/update-lost-password.component';

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "recupera", component: ForgotPasswordComponent},
  { path: "registra", component: RegistrazioneComponent },
  { path: "otp", component: OtpRequestComponent, canActivate: [AuthGuard] },
  { path: "update-pass", component: UpdateLostPasswordComponent, canActivate: [AuthGuard]},
  { path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  { path: "profile", component: ProfileComponent,canActivate: [AuthGuard], children: [
      { path: "set-dati", component: SetDatiComponent },
      { path: "set-img-profile", component: SetImgProfileComponent },
      { path: "set-password", component: SetPasswordComponent },
      { path: "reservations", component: ReservationsComponent },
      { path: "reservation-history", component: ReservationHistoryComponent },
      { path: "abilities", component: AbilitiesComponent },
      { path: "match-history", component: MatchHistoryComponent },
      { path: "progress-graph", component: ProgressGraphComponent }
    ]
  },
  { path: "book-field", component: BookFieldComponent,canActivate: [AuthGuard] },
  { path: "book-lesson", component: BookLessonComponent ,canActivate: [AuthGuard]},
  { path: "find-opponent", component: FindOpponentComponent ,canActivate: [AuthGuard]},
  { path: "matchmaking", component: MatchmakingComponent,canActivate: [AuthGuard] }
];
