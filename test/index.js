import { describe, it } from "node:test";
import assert from "node:assert/strict";
import assured from "../lib/index.js";

describe("assured", () => {
    describe("callback interface", () => {
        it("calls the callback with an error", (t, done) => {
            const cb = assured((err) => {
                assert.ok(err instanceof Error);
                assert.equal(err.message, "oops");
                done();
            });
            cb(new Error("oops"));
        });

        it("calls the callback with a value", (t, done) => {
            const cb = assured((err, value) => {
                assert.equal(err, null);
                assert.equal(value, 42);
                done();
            });
            cb(null, 42);
        });

        it("works without a callback function", () => {
            const cb = assured();
            assert.doesNotThrow(() => cb(null, "ok"));
        });
    });

    describe("promise interface", () => {
        it("resolves with the value", async () => {
            const cb = assured();
            cb(null, "hello");
            const result = await cb._;
            assert.equal(result, "hello");
        });

        it("rejects with the error", async () => {
            const cb = assured();
            cb(new Error("fail"));
            await assert.rejects(cb._, /fail/);
        });

        it("resolves with multiple values (first wins)", async () => {
            const cb = assured();
            cb(null, 1, 2, 3);
            const result = await cb._;
            assert.equal(result, 1);
        });
    });

    describe("combined callback + promise", () => {
        it("both callback and promise receive the value", async () => {
            let cbValue;
            const cb = assured((err, value) => { cbValue = value; });
            cb(null, "dual");
            const result = await cb._;
            assert.equal(result, "dual");
            assert.equal(cbValue, "dual");
        });

        it("both callback and promise receive the error", async () => {
            let cbErr;
            const cb = assured((err) => { cbErr = err; });
            cb(new Error("dual-error"));
            await assert.rejects(cb._, /dual-error/);
            assert.ok(cbErr instanceof Error);
        });
    });

    describe("custom promise constructor", () => {
        it("uses the provided promise constructor", async () => {
            let usedCustom = false;
            class MyPromise extends Promise {
                constructor(executor) {
                    super(executor);
                    usedCustom = true;
                }
            }
            const cb = assured(null, MyPromise);
            cb(null, "custom");
            await cb._;
            assert.ok(usedCustom);
        });
    });
});
