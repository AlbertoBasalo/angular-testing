import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'book/:tripId',
    loadChildren: () =>
      import('./routes/book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'agencies',
    loadChildren: () =>
      import('./routes/agencies/agencies.module').then((m) => m.AgenciesModule),
  },
  { path: 'bookings', loadChildren: () => import('./routes/bookings/bookings.module').then(m => m.BookingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
