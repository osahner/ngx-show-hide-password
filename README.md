# ngx-show-hide-password

> Add split input button to password or text input. Toggles input type between "text" and "password".

[![Build Status](https://travis-ci.org/osahner/ngx-show-hide-password.svg?branch=master)](https://travis-ci.org/osahner/ngx-show-hide-password)
[![npm version](https://badge.fury.io/js/ngx-show-hide-password.svg)](https://badge.fury.io/js/ngx-show-hide-password)
[![codecov](https://codecov.io/gh/osahner/ngx-show-hide-password/branch/master/graph/badge.svg)](https://codecov.io/gh/osahner/ngx-show-hide-password/branch/master)

## Installation

For an up-to-date angular project (version 10):
```sh
npm install ngx-show-hide-password --save
npm install @fortawesome/angular-fontawesome \
    @fortawesome/fontawesome-svg-core \
    @fortawesome/free-solid-svg-icons --save
```
:exclamation: For previous Angular releases please check the compatibility table of [ngx-show-hide-password](#compatibility-chart) **and** [@fortawesome/angular-fontawesome](https://github.com/FortAwesome/angular-fontawesome#compatiblity-table)!

:white_check_mark: e.g. for angular version 8:
```sh
npm install ngx-show-hide-password@~2.1.0 --save
npm install @fortawesome/angular-fontawesome@^0.5 \
    @fortawesome/fontawesome-svg-core \
    @fortawesome/free-solid-svg-icons --save
```

## Integration

```ts
// app.module.ts
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
// no need to import @fortawesome/angular-fontawesome for the component
...
@NgModule({
  ...
  imports: [
    BrowserModule,
    ShowHidePasswordModule,
    ...
  ],
  ...
})
```

### as component ...

```html
<show-hide-password size="lg" btnStyle="primary" [btnOutline]="false">
  <input type="password" name="..." >
</show-hide-password>
```

### or with directives ...

```html
<mat-form-field>
  <input id="mysecretpassword" type="password" placeholder="Password" matInput showHideInput>
  <i matSuffix
    class="material-icons"
    showHideTrigger="mysecretpassword"
    [showHideStatus]="{ materialIcon: true, id: 'mysecretpassword' }"
  ></i>
</mat-form-field>
```

| Password hidden                          | Password exposed                           |
| ---------------------------------------- | ------------------------------------------ |
| ![Hidden password](resources/hidden.png) | ![Exposed password](resources/exposed.png) |


### How to customize and some examples how to use the directives & service

- [example on stackblitz](https://stackblitz.com/edit/angular-dvy758?embed=1&file=src/app/app.component.html).
- some more [basic examples here](https://github.com/osahner/ngx-show-hide-password/tree/master/src/app/app.component.html).


## Documentation

### Component: show-hide-password
> Demo on [stackblitz](https://stackblitz.com/edit/angular-okrmdi?embed=1&file=src/app/app.component.html)

| attribute      | type      | description                                                                                          |
| -------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| **btnOutline** | _boolean_ | default: `true`                                                                                      |
| **btnStyle**   | _string_  | `'primary'`, `'secondary'`, `'success'`, `'warning'`, `'danger'` or `'info'`. default: `'secondary'` |
| **size**       | _string_  | `'sm'`, `'lg'`. default: nothing.                                                                    |

### Directive: showHideInput
> Demo on [stackblitz](https://stackblitz.com/edit/angular-2srzhs?embed=1&file=src/app/app.component.html)

:information_source: All directives (and the service) are bound to the same unique **id**. This can be the attribute **id** of the HTML input element or you can enter a synthetic ID.

| attribute      | type     | description                              |
| -------------- | -------- | ---------------------------------------- |
| **id** | _string_ | unique id. |

#### Directive: showHideTrigger

| type     | description                              |
| -------- | ---------------------------------------- |
| _string_ | unique id. **\* required** |

#### Directive: showHideStatus

```ts
export interface ShowHideStatusConfig {
  id: string;
  show?: string;
  hide?: string;
  materialIcon?: boolean;
}
```

| attribute        | type      | description                                                            |
| ---------------- | --------- | ---------------------------------------------------------------------- |
| **id**           | _string_  | unique id. **\* required**                               |
| **show**         | _string_  | optional class/material icon identifier. default: `'visibility'`       |
| **hide**         | _string_  | optional class/material icon identifier. default: `'visibility_off'`   |
| **materialIcon** | _boolean_ | if true updates innerHTML instead of class attribute. default: `false` |

### Service: ShowHideService

- _function_ **getObservable**
> return _Observable_ for input with _id_
```ts
getObservable(id: string): Observable<boolean>
```
- _function_ **setShow**
> set Status for input with _id_
```ts
setShow(id: string, show: boolean): void
```
- _function_ **toggleShow**
> toggles Status for input with _id_
```ts
toggleShow(id: string): void
```

## Release History
- 2.3.0
  - update @angular/cli and @angular/core to v10, @fortawesome/angular-fontawesome v0.7, @fortawesome/free-solid-svg-icons v5.14
- 2.2.4
  - ShowHideInputDirective no longer needs an Input Attribute ID. ID is now an `Input()`. Thanks to @aboodz
- 2.2.2
  - update @angular/cli and @angular/core to v9
- 2.1.0
  - dependencies updated
- 2.0.5
  - update @angular/cli and @angular/core to v8
- 2.0.3
  - add directives: **showHideInput**, **showHideTrigger** and **showHideStatus**
- 2.0.0
  - switched to @angular/cli and ng-packagr,
  - requires @angular/core v7 and @fortawesome/angular-fontawesome, uses Font Awesome Eye/EyeSlash Icon
- 1.2.5
  - add new attributes: `btnStyle` and `btnOutline`
  - bootstrap 4.0.0
- 1.2.1
  - requires Angular v5, for Angular v4 use `@1.1.0` instead
- 1.1.0
  - initial release

### compatibility chart
| local version | angular version |
| ------------- | --------------- |
| `@^2.3.0`     | v10              |
| `@^2.2.3`     | v9              |
| `@~2.1.0`     | v8              |
| `@~2.0.3`     | v7              |
| `@~1.2.5`     | v5 and v6       |
| `@~1.1.0`     | v4              |


## LICENCE

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
