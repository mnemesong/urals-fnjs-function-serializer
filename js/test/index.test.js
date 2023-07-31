"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var mocha_1 = require("mocha");
var index = __importStar(require("../src/index"));
(0, mocha_1.describe)("index.test", function () {
    (0, mocha_1.it)("test 1", function () {
        var obj = {
            a: 12,
            b: function (x) { return x + 2; },
            c: [3, 14, function (a, b) { return (a + b); }],
            d: "alsd"
        };
        var serialized = index.serialize(obj);
        var deserialized = index.deserialise(serialized);
        console.log("serialized:", serialized);
        console.log("deserialized:", deserialized);
        console.log("deserialized.b:", deserialized.b.toString());
        assert_1.default.strictEqual(deserialized.b(4), 6);
        assert_1.default.strictEqual(deserialized.a, 12);
        assert_1.default.strictEqual(deserialized.c[0], 3);
        assert_1.default.strictEqual(deserialized.c[1], 14);
        assert_1.default.strictEqual(deserialized.c[2](2, 5), 7);
        assert_1.default.strictEqual(deserialized.d, "alsd");
    });
    (0, mocha_1.it)("test 2", function () {
        var obj = {
            a: function (a) { return Math.max.apply(Math, a.map(function (el) { return el.id; })) + 1; }
        };
        var serialized = index.serialize(obj);
        var deserialized = index.deserialise(serialized);
        console.log("serialized:", serialized);
        console.log("deserialized:", deserialized);
        console.log("deserialized.a:", deserialized.a.toString());
        assert_1.default.strictEqual(deserialized.a([{ id: 3 }, { id: 5 }]), 6);
    });
    (0, mocha_1.it)("test 3", function () {
        var f = function (a) { return Math.max.apply(Math, a.map(function (el) { return el.id; })) + 1; };
        var serialized = index.serialize(f);
        var deserialized = index.deserialise(serialized);
        console.log("serialized:", serialized);
        console.log("deserialized:", deserialized);
        console.log("deserialized toString:", deserialized.toString());
        assert_1.default.strictEqual(deserialized([{ id: 3 }, { id: 5 }]), 6);
    });
});
