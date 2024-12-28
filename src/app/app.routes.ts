import { Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ReservationHistoryComponent} from './reservation-history/reservation-history.component';
import {FindOpponentComponent} from './find-opponent/find-opponent.component';
import {UsersComponent} from './users/users.component';
import {SingleUserComponent} from './single-user/single-user.component';
import {FieldsComponent} from './fields/fields.component';
import {SingleFieldComponent} from './single-field/single-field.component';
import {BookingComponent} from './booking/booking.component';
import {PartialBookingComponent} from './partial-booking/partial-booking.component';
import {TotalBookingComponent} from './total-booking/total-booking.component';
import {LessonBookingComponent} from './lesson-booking/lesson-booking.component';
import {PartialMatchmakingComponent} from './partial-matchmaking/partial-matchmaking.component';

export const routes: Routes = [

  {path: "", component: HomeComponent},
  {path: "home", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "users", component: UsersComponent},
  {path: 'fields/:date', component: FieldsComponent },
  {path: "find-opponent", component: FindOpponentComponent},
  {path: 'users/:id', component: SingleUserComponent },
  {path: 'fields/:date/:id', component: SingleFieldComponent },
  {path: 'fields/:date/:id/:time', component: BookingComponent },
  {path: 'fields/:date/:id/:time/partial', component: PartialBookingComponent },
  {path: 'fields/:date/:id/:time/total', component: TotalBookingComponent},
  {path: 'fields/:date/:id/:time/lesson', component: LessonBookingComponent},
  {path: 'fields/:date/:id/:time/partial-matchmaking', component: PartialMatchmakingComponent}





];
