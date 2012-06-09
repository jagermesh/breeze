# Breeze

This repository will grow as soon as source code will be ready to be shared with the community.

Shortly:

- All functinality available via (br) global.
- So far it has no external dependencies (only within Breeze libs).

Most of modern browsers supported:

- Internet Explorer 8+
- Mozilla Firefox 3.5+
- Google Chrome 4+
- Safari 4+
- Opera 10.5+

Usage:

```
<script src="js/breeze.min.js"></script>
```

## br.storage - wrapper for HTML5 local/session storage

Why?

- chaining, yep, neat jQuery thing
- .inc for strings 
- .extend for objects
- .append/.prepend/.takeLast/.takeFirst for arrays

There are two objects:

- br.storage for local storage
- br.session for session storage

Examples:

```
console.log(br.storage.get('foo', 'bar'));
// bar

console.log(br.storage.set('foo', 'bar2').get('foo'));
// bar2

console.log(br.storage.set('boolean', true).get('boolean'));
// true

console.log(br.storage.set('integer', 666).get('integer'));
// 666

console.log(br.storage.set('val', 10).inc('val', 5).inc('val').get('val'));
// 16

console.log(br.storage.set('val', 10).dec('val', 5).dec('val').get('val'));
// 4

console.log(br.storage.set('colors', 'red').inc('colors', 'white').inc('colors', 'blue').get('colors'));
// red, white, blue 

console.log(br.storage.set('tags', 'storage').inc('tags', 'html5', ' ').inc('tags', 'local', ' ').get('tags'));
// storage html5 local 

console.log(br.storage.clear().set('one', 1).set('two', 2).set('three', 3).get(['one', 'two', 'three']));
// { one: 1,  three: 3, two: 2 }

console.log(br.storage.set('array', [1, 2, 3, 4, 5]).get('array'));
// [1, 2, 3, 4, 5]

console.log(br.storage.set({prop1: 'val1', prop2: 'val2' }).get('prop2'));
// val2

console.log(br.storage.remove('prop1').get('prop2'));
// val2

console.log(br.storage.set({prop1: 'val1', prop2: 'val2' }).get(['prop1', 'prop2']));
// { prop1: "val1",  prop2: "val2" }

console.log(br.storage.remove(['prop1', 'prop2']).get('prop1'));
// null

console.log(br.storage.set('object', { prop1: 'one', prop2: 'two' }).get('object'));
// { prop1: "one", prop2: "two" }

console.log(br.storage.set('delicious', true).get('delicious'));
// true

console.log(br.storage.not('delicious').get('delicious'));
// false

console.log(br.storage.set('array', [1, 2, 3]).append('array', 4).get('array'));
// [1, 2, 3, 4] 

console.log(br.storage.set('array', [1, 2, 3]).prepend('array', 4).get('array'));
// [4, 1, 2, 3] 

console.log(br.storage.set('array', [1, 2, 3]).takeLast('array'));
// 3

console.log(br.storage.get('array'));
// [1, 2]

console.log(br.storage.set('array', [1, 2, 3]).takeFirst('array'));
// 1

console.log(br.storage.get('array'));
// [2, 3]

console.log(br.storage.set('array', [1, 2, 3]).getLast('array'));
// 3

console.log(br.storage.get('array'));
// [1, 2, 3]

console.log(br.storage.set('array', [1, 2, 3]).getFirst('array'));
// 1

console.log(br.storage.get('array'));
// [1, 2, 3]

console.log(br.storage.set('object', { prop1: 'one' }).extend('object', { prop2: 'two' }).get('object'));
// { prop1: "one", prop2: "two" }

console.log(br.storage.set('object', { prop1: 'one' }).extend('object', { prop2: 'two', prop3: 'three' }).get('object'));
// { prop1: "one", prop2: "two", prop3: "three" }

br.storage.set('array', [1, 2, 3]).each('array', function(value) { console.log(value); });
// 1
// 2
// 3

console.log(br.storage.set('array', [1, 2, 3]).appendUnique('array', 1).appendUnique('array', 4).get('array'));
// [2, 3, 1, 4] 

console.log(br.storage.set('array', [1, 2, 3]).prependUnique('array', 1).prependUnique('array', 4).get('array'));
// [4, 1, 2, 3] 

console.log(br.storage.set('array', [1, 2, 3]).append('array', 4, 3).get('array'));
// [2, 3, 4]

console.log(br.storage.set('array', [1, 2, 3]).prepend('array', 4, 3).get('array'));
// [4, 1, 2]

console.log(br.storage.all());
// { array: [2, 3]
// , boolean: true
// , colors: "red, white, blue"
// , delicious: false
// , foo: "bar2"
// , integer: 666
// , object: { prop1: "one", prop2: "two", prop3: "three" }
// , one: 1
// , tags: "storage html5 local"
// , three: 3
// , two: 2
// }

```
