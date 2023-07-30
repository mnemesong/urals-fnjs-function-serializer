# urals-fnjs-function-serializer
Function serializer, inspired by stackoverfow answer: 
https://stackoverflow.com/questions/7395686/how-can-i-serialize-a-function-in-javascript

## Description
Json serializer able to serialize pure functions

## Example
```typescript
import * as index from "urals-fnjs-function-serializer";

const obj = {
    a: 12,
    b: (x) => x + 2,
    c: [3, 14, (a, b) => (a + b)],
    d: "alsd"
}
const serialized = index.serialize(obj);
const deserialized = index.deserialise(serialized) as any
assert.strictEqual(deserialized.b(4), 6)
assert.strictEqual(deserialized.a, 12)
assert.strictEqual(deserialized.c[0], 3)
assert.strictEqual(deserialized.c[1], 14)
assert.strictEqual(deserialized.c[2](2, 5), 7)
assert.strictEqual(deserialized.d, "alsd")
```

## Author
Anatoly Starodubtsev
tostar74@mail.ru

## Licence
MIT