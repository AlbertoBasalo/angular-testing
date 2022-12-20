# Angular Laboratory

> A sample project for Angular workshop demos

[Repository](https://github.com/AlbertoBasalo/angulab/tree/1-test_basics)

- 🚚 Install dependencies `npm i`

- 🔬 Execute `npm test`

- 🚀 Execute `npm run api` and `npm start` to run the app.

- 📕 Read the `docs` folder content for more info.

## Unit and Integration testing with only Jasmine alone

- **Base Store** `src\app\services\base.store.spec.ts` _Unit_
- **Api Store** `src\app\services\api.store.spec.ts` _Integration_
- **Spec Reporter** `npm install karma-spec-reporter --save-dev` _Add spec reporter_
- **tests** `src\test.spec.ts` _Choose running context_
- **Karma Config** `karma.conf.js` _Configuration_

## Jasmine Spy and test doubles

- **Options Service** `src\app\routes\options\options.service.spec.ts` _Spy calls to Collaborator_
- **Base Store** `src\app\services\base.store.spec.ts` _Spy private methods_
- **Api Store** `src\app\services\api.store.spec.ts` _Spy and stub dependencies_
- **TimeSpan Pipe** `src\app\pipes\time-span\time-span.pipe.spec.ts` _Extract logic from Angular artifacts_

## Test Bed: imports and providers

- **Api Service** `src\app\services\api.service.spec.ts` _HttpClientTestingModule_
- **Utils Service** `src\app\services\utils.service.spec.ts` _inject a mock_
- **Home Service** `src\app\routes\home\home.service.spec.ts` _integrated -> imports vs isolated -> providers_

## Component testing

- **Agencies Component** `src\app\routes\agencies\agencies.component.spec.ts` _integrated controller - isolated template_
- **Bookings Component** `src\app\routes\bookings\bookings.component.spec.ts` _isolated student task_
- **Options List** `src\app\routes\options\options.list.spec.ts` _OnPush / Hosted_
- **Home Component** `src\app\routes\home\home.component.spec.ts` _nested dependencies_
- **Trips Form filling** `src\app\routes\trips\trips.form.spec.ts` _form interaction_

## Component interaction testing

## End to End testing

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
