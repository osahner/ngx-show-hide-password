# ng2-show-hide-password

## Angular 2 Add show hide button to text/password input fields

Add split input button to password or text input. Toggles input type between "text" and "password". 

#### :warning: Requires 
* **Angular 2** `>=4.0.0`
* **Bootstrap 4** `v6`

#### Optional 
* [fontawesome](http://fontawesome.io/) or [entypo](http://entypo.com/)

### Installation

```
$ npm install https://github.com/osahner/ng2-show-hide-password.git --save
```

### Basic Example

```ts
// app.module.ts
import { ShowHidePasswordModule } from 'ng2-show-hide-password';
...
@NgModule({
  ...
  imports: [
    ShowHidePasswordModule,
  ],
  ...
})
```

```html
<show-hide-password size="sm|lg" icon="entypo|fontawesome">
  <input type="password" name=... />
</show-hide-password>
```

### Attributes

* **size**: `sm`, `lg` or nothing
* **icon**: `fontawesome`, `entypo` or nothing (= checkbox)

### LICENCE

MIT
