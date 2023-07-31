"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialise = exports.deoptimize = exports.serialize = exports.optimize = void 0;
function optimize(u) {
    if ((typeof u === "object") && (u !== null)) {
        var res_1 = {};
        Object.keys(u).forEach(function (k) {
            try {
                res_1[k] = optimize(u[k]);
            }
            catch (err) { }
        });
        return res_1;
    }
    else if (typeof u === "function") {
        var parts = u
            .toString()
            .match(/^\s*function[^(]*\(([^)]*)\)\s*{(.*)}\s*$/);
        if (parts == null)
            throw 'Function form not supported';
        return [
            'window.Function',
            parts[1].trim().split(/\s*,\s*/),
            parts[2]
        ];
    }
    return u;
}
exports.optimize = optimize;
function serialize(u) {
    var opt = optimize(u);
    return JSON.stringify(opt);
}
exports.serialize = serialize;
function deoptimize(u) {
    if (Array.isArray(u) && (u[0] == 'window.Function')) {
        return new (Function.bind.apply(Function, [Function].concat(u[1], [u[2]])));
    }
    else if ((typeof u === "object") && (u !== null)) {
        var res_2 = {};
        Object.keys(u).forEach(function (k) {
            try {
                res_2[k] = deoptimize(u[k]);
            }
            catch (err) { }
        });
        return res_2;
    }
    return u;
}
exports.deoptimize = deoptimize;
function deserialise(u) {
    var deser = JSON.parse(u);
    return deoptimize(deser);
}
exports.deserialise = deserialise;
