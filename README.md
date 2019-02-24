# ngx-show-hide-password

> Add split input button to password or text input. Toggles input type between "text" and "password".

[![Build Status](https://travis-ci.org/osahner/ngx-show-hide-password.svg?branch=master)](https://travis-ci.org/osahner/ngx-show-hide-password)
[![npm version](https://badge.fury.io/js/ngx-show-hide-password.svg)](https://badge.fury.io/js/ngx-show-hide-password)

## Installation

```sh
npm install ngx-show-hide-password --save
npm install @fortawesome/angular-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons --save
```

## Integration

```ts
// app.module.ts
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
// no need to import @fortawesome/angular-fontawesome
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

The element must have a valid **id** attribute.

#### Directive: showHideTrigger

| type     | description                              |
| -------- | ---------------------------------------- |
| _string_ | id of the input element. **\* required** |

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
| **id**           | _string_  | id of the input element. **\* required**                               |
| **show**         | _string_  | optional class/material icon identifier. default: `'visibility'`       |
| **hide**         | _string_  | optional class/material icon identifier. default: `'visibility_off'`   |
| **materialIcon** | _boolean_ | if true updates innerHTML instead of class attribute. default: `false` |

## Release History

- 2.0.3
  - add directives: **showHideInput**, **showHideTrigger** and **showHideStatus**
- 2.0.0
  - switchted to @angular/cli and ng-packagr,
  - requires @angular/core v7 and @fortawesome/angular-fontawesome, uses Font Awesome Eye/EyeSlash Icon
- 1.2.5
  - add new attributes: `btnStyle` and `btnOutline`
  - bootstrap 4.0.0
- 1.2.1
  - requires Angular v5, for Angular v4 use `@1.1.0` instead
- 1.1.0
  - initial release

## LICENCE

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
