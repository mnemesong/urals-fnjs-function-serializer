//Function.prototype.toJSON = function() {
//    var parts = this
//        .toString()
//        .match(/^\s*function[^(]*\(([^)]*)\)\s*{(.*)}\s*$/)
//    ;
//    if (parts == null)
//        throw 'Function form not supported';
//
//    return [
//        'window.Function',
//        parts[1].trim().split(/\s*,\s*/),
//        parts[2]
//    ];
//};

export function optimize(u: any): unknown {
    if((typeof u === "object") && (u !== null)) {
        const res = {}
        Object.keys(u).forEach(k => {
            try {
                res[k] = optimize(u[k])
            } catch (err) {}
        })
        return res
    } else if (typeof u === "function") {
        const parts = u
            .toString()
            .match(/^\s*function[^(]*\(([^)]*)\)\s*{(.*)}\s*$/)
        if (parts == null)
            throw 'Function form not supported'
        return [
            'window.Function',
            parts[1].trim().split(/\s*,\s*/),
            parts[2]
        ]
    } 
    return u
}

export function serialize(u: any): string {
    const opt = optimize(u)
    console.log("Optimized: ", opt)
    return JSON.stringify(opt)
}

export function deoptimize(u: any): unknown {
    if (Array.isArray(u) && (u[0] == 'window.Function')) {
        return new (Function.bind.apply(Function, [Function].concat(u[1], [u[2]])))
    } else if((typeof u === "object") && (u !== null)) {
        const res = {}
        Object.keys(u).forEach(k => {
            try {
                res[k] = deoptimize(u[k])
            } catch (err) {}
        })
        return res
    } 
    return u
}

export function deserialise(u: string): unknown {
    const deser = JSON.parse(u)
    return deoptimize(deser)
}

//Function.deserialise = function(key, data) {
//    return (data instanceof Array && data[0] == 'window.Function') ?
//        new (Function.bind.apply(Function, [Function].concat(data[1], [data[2]]))) :
//        data
//    ;
//};