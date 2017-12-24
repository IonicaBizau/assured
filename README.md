<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


# assured

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Ask me anything](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/assured.svg)](https://www.npmjs.com/package/assured) [![Downloads](https://img.shields.io/npm/dt/assured.svg)](https://www.npmjs.com/package/assured)

> Combine promises and callbacks together.

## :cloud: Installation

```sh
# Using npm
npm install --save assured

# Using yarn
yarn add assured
```


## :clipboard: Example



```js
const assured = require("assured");

let foo = (age, cb) => {

    // Swap the callback function
    if (typeof age === "function") {
        cb = age;
    }

    // Proxy the callback function
    cb = assured(cb);

    // Validate the age
    if (typeof age !== "number") {
        return cb(new Error("Invalid age."));
    }

    // Do something async
    setTimeout(() => {
        cb(null, `The provided age is ${age}`);
    }, 100);

    // Return the promise
    return cb._;
}

// Callback interface + error
foo(err => console.log(err));
// => [Error: Invalid age.]

// Callback interface + success
foo(42, (err, data) => console.log(err, data));
// => null 'The provided age is 42'

// Promise interface + error
foo().then(x => {
    console.log("Success: ", x);
}).catch(e => {
    console.log("Error: ", e);
    // => Error:  [Error: Invalid age.]
});

// Promise + Success
foo(42).then(x => {
    console.log("Success: ", x);
}).catch(e => {
    console.log("Error: ", e);
});
```



## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:

 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:



## :memo: Documentation


### `assured(fn, p)`
Proxies the callback function.

#### Params

- **Function** `fn`: The callback function to proxy.
- **Promise** `p`: A custom promise constructor (default: the built-in `Promise`).

#### Return
- **Function** The proxied callback function extended with:
 - `resolver` (Function): The promise resolver.
 - `assuredResolve` (Function): The resolve method.
 - `assuredReject` (Function): The reject method.
 - `_` (Promise): The promise object (used to `return` from your function).



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![Buy me a book][badge_amazon]][amazon]—I love books! I will remember you after years if you buy me one. :grin: :book:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`bloggify-plugin-class`](https://github.com/Bloggify/plugin-class#readme) (by Bloggify)—A library for managing plugin objects.
 - [`bloggify-plugin-loader`](https://github.com/Bloggify/plugin-loader#readme) (by Bloggify)—The Bloggify plugin loader.
 - [`fn-result`](https://github.com/IonicaBizau/fn-result#readme)—Take an (a)sync function result and pass it forward.
 - [`scrape-it`](https://github.com/IonicaBizau/scrape-it#readme)—A Node.js scraper for humans.
 - [`tinyreq`](https://github.com/IonicaBizau/tinyreq)—Tiny library for making http(s) requests.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
