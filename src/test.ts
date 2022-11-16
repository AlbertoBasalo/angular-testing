// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// ! added to use fakeAsync
import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp
  ): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  { teardown: { destroyAfterEach: false } } // ! added to render the component on karma browser
);

// Then we find all the tests.
// ! different context for easy launch partial tests
const storeContext = require.context('./', true, /store.spec\.ts$/);
const servicesContext = require.context('./', true, /service.spec\.ts$/);
const pipesContext = require.context('./', true, /pipe.spec\.ts$/);
const componentsContext = require.context('./', true, /component.spec\.ts$/);
const formsContext = require.context('./', true, /form.spec\.ts$/);
const fullContext = require.context('./', true, /\.spec\.ts$/);
const context = componentsContext;
// And load the modules.
context.keys().forEach(context);
