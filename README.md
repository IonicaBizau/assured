
# trust

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/trust.svg)](https://www.npmjs.com/package/trust) [![Downloads](https://img.shields.io/npm/dt/trust.svg)](https://www.npmjs.com/package/trust) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Combine promise and callbacks together.

## :cloud: Installation

```sh
$ npm i --save trust
```


## :clipboard: Example



```js
const trust = require("trust");

function foo(cb) {
    cb = trust(cb);
    setTimeout(function() {
        cb(null, 42);
    }, 100);
    return cb._;
}

foo((err, x) => {
    console.log(err || x);
});

foo().then(x => {
    console.log(x);
}).catch(e => {
    console.log(e);
});
```

## :memo: Documentation

### `trust(a, b)`
Combine promise and callbacks together.

#### Params
- **Number** `a`: Param descrpition.
- **Number** `b`: Param descrpition.

#### Return
- **Number** Return description.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
