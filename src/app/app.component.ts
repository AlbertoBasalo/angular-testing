import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <h6>{{ title }}</h6>
      <p>Welcome on board</p>
      <a href="https://twitter.com/albertobasalo">Alberto Basalo</a>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angulab';
}
