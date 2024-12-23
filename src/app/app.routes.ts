import { Routes } from '@angular/router';
import {ProfileComponent} from './Components/profile/profile.component';
import {HomeComponent} from './Components/home/home.component';
import {ProgressGraphComponent} from './Components/progress-graph/progress-graph.component';
import {SetDatiComponent} from './Components/set-dati/set-dati.component';
import {SetImgProfileComponent} from './Components/set-img-profile/set-img-profile.component';
import {SetPasswordComponent} from './Components/set-password/set-password.component';
import {ReservationsComponent} from './Components/reservations/reservations.component';
import {ReservationHistoryComponent} from './Components/reservation-history/reservation-history.component';
import {AbilitiesComponent} from './Components/abilities/abilities.component';
import {MatchHistoryComponent} from './Components/match-history/match-history.component';
import {BookFieldComponent} from './Components/book-field/book-field.component';
import {BookLessonComponent} from './Components/book-lesson/book-lesson.component';
import {FindOpponentComponent} from './Components/find-opponent/find-opponent.component';
import {MatchmakingComponent} from './Components/matchmaking/matchmaking.component';

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
  {path: "find-opponent", component: FindOpponentComponent},
  {path: "matchmaking", component: MatchmakingComponent}




];
