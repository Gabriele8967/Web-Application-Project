import { Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {ProgressGraphComponent} from './progress-graph/progress-graph.component';
import {SetDatiComponent} from './set-dati/set-dati.component';
import {SetImgProfileComponent} from './set-img-profile/set-img-profile.component';
import {SetPasswordComponent} from './set-password/set-password.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ReservationHistoryComponent} from './reservation-history/reservation-history.component';
import {AbilitiesComponent} from './abilities/abilities.component';
import {MatchHistoryComponent} from './match-history/match-history.component';
import {BookFieldComponent} from './book-field/book-field.component';
import {BookLessonComponent} from './book-lesson/book-lesson.component';
import {FindOpponentComponent} from './find-opponent/find-opponent.component';

export const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent, children: [
    {path: "set-dati", component: SetDatiComponent},
      {path: "set-img-profile", component: SetImgProfileComponent},
      {path: "set-password", component: SetPasswordComponent},
      {path: "reservations", component: ReservationsComponent},
      {path: "reservation-history", component: ReservationHistoryComponent},
      {path: "abilities", component: AbilitiesComponent},
      {path: "match-history", component: MatchHistoryComponent},
      {path: "progress-graph", component: ProgressGraphComponent}
    ],
  },
  {path: "book-field", component: BookFieldComponent},
  {path: "book-lesson", component: BookLessonComponent},
  {path: "find-opponent", component: FindOpponentComponent}




];
