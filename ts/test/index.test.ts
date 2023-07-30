import assert from "assert";
import { describe, it } from "mocha";
import * as index from "../src/index";

describe("index.test", () => {
    it("test 1", () => {
        const obj = {
            a: 12,
            b: (x) => x + 2,
            c: [3, 14, (a, b) => (a + b)],
            d: "alsd"
        }
        const serialized = index.serialize(obj);
        const deserialized = index.deserialise(serialized) as any
        console.log("serialized:", serialized);
        console.log("deserialized:", deserialized);
        console.log("deserialized.b:", deserialized.b.toString());
        assert.strictEqual(deserialized.b(4), 6)
        assert.strictEqual(deserialized.a, 12)
        assert.strictEqual(deserialized.c[0], 3)
        assert.strictEqual(deserialized.c[1], 14)
        assert.strictEqual(deserialized.c[2](2, 5), 7)
        assert.strictEqual(deserialized.d, "alsd")
    })
})
