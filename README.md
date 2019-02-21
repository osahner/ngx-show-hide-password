# ngx-show-hide-password

## Add a show hide button to password input fields

Add split input button to password or text input. Toggles input type between "text" and "password".

[![Build Status](https://travis-ci.org/osahner/ngx-show-hide-password.svg?branch=master)](https://travis-ci.org/osahner/ngx-show-hide-password)

#### Requires

* **Angular** `^7`
* **Bootstrap** `^4.1`

### Installation

```
$ npm install ngx-show-hide-password --save
```

```
$ yarn add ngx-show-hide-password
```

### Example

```ts
// app.module.ts
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
...
@NgModule({
  ...
  imports: [
    BrowserModule,
    FormsModule,
    ShowHidePasswordModule,
    ...
  ],
  ...
})
```

```html
<show-hide-password size="lg" btnStyle="primary" [btnOutline]="false">
  <input type="password" name=... >
</show-hide-password>
```

Password hidden | Password exposed
------------ | -------------
![Hidden password](resources/hidden.png) | ![Exposed password](resources/exposed.png)

Demo on [stackblitz](https://stackblitz.com/edit/angular-okrmdi?embed=1&file=src/app/app.component.html)

### Attributes

* **btnOutline**: boolean. default: `true`
* **btnStyle**: `primary`, `secondary`, `success`, `warning`, `danger` or `info`. default: `secondary`
* **size**: `sm`, `lg` or nothing

### Changelog

* v2.0.0 switchted to @angular/cli and ng-packagr, requires @angular/core v7, includes Font Awesome Eye/EyeSlash Icon
* v1.2.5 add 2 new attributes, btnStyle and btnOutline
* v1.2.3 bootstrap 4.0.0
* v1.2.2 update jquery ~> 3.0.0
* v1.2.1 requires Angular v5, for Angular v4 use `@1.1.0` instead
* v1.2.0 update components
* v1.1.0 initial release

### LICENCE

MIT © [Oliver Sahner](mailto:osahner@gmail.com)
