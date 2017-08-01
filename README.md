# ngx-show-hide-password

## Add a show hide button to password input fields

Add split input button to password or text input. Toggles input type between "text" and "password". 

#### Requires 

* **Angular 4** `>=4.0.0`
* **Bootstrap 4** `v6`

#### Optional Icons

* [fontawesome](http://fontawesome.io/)
* [entypo](http://entypo.com/)

### Installation

```
$ npm install https://github.com/osahner/ngx-show-hide-password.git --save
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
    ShowHidePasswordModule.forRoot(),
    ...
  ],
  ...
})
```

```html
<show-hide-password size="lg" icon="entypo">
  <input type="password" name=... />
</show-hide-password>
```

Password hidden | Password exposed
------------ | -------------
![Hidden password](resources/hidden.png) | ![Exposed password](resources/exposed.png)


### Attributes

* **size**: `sm`, `lg` or nothing
* **icon**: `fontawesome`, `entypo` or empty|nothing (= checkbox)

### LICENCE

MIT
