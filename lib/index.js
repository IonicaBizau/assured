import noop from "noop6";

/**
 * assured
 * Proxies the callback function.
 * @name assured
 * @function
 * @param {Function} fn The callback function to proxy.
 * @param {Promise} p A custom promise constructor (default: the built-in `Promise`).
 * @returns {Function} The proxied callback function extended with:
 *
 *  - `resolver` (Function): The promise resolver.
 *  - `assuredResolve` (Function): The resolve method.
 *  - `assuredReject` (Function): The reject method.
 *  - `_` (Promise): The promise object (used to `return` from your function).
 */
export default function assured (fn, p = Promise) {
    fn = fn || noop;

    let res = function (err, ...args) {
        fn.apply(res, [err, ...args]);
        if (err) {
            res.assuredReject(err);
        } else {
            res.assuredResolve(...args);
        }
        return res._;
    };

    res.resolver = function (resolve, reject) {
        res.assuredResolve = resolve;
        res.assuredReject = reject;
    };

    res._ = new p(res.resolver);
    res._.catch(noop);
    return res;
}
