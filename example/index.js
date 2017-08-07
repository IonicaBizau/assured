"use strict";

var assured = require("../lib");

var foo = function foo(age, cb) {

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
    setTimeout(function () {
        cb(null, "The provided age is " + age);
    }, 100);

    // Return the promise
    return cb._;
};

// Callback interface + error
foo(function (err) {
    return console.log(err);
});
// => [Error: Invalid age.]

// Callback interface + success
foo(42, function (err, data) {
    return console.log(err, data);
});
// => null 'The provided age is 42'

// Promise interface + error
foo().then(function (x) {
    console.log("Success: ", x);
}).catch(function (e) {
    console.log("Error: ", e);
    // => Error:  [Error: Invalid age.]
});

// Promise + Success
foo(42).then(function (x) {
    console.log("Success: ", x);
}).catch(function (e) {
    console.log("Error: ", e);
});