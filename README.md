# Contextual Promise
An ES6 Promsie subclass with context support.

Context can be accessed as "this" parameter in any callback in the promise chain 
like `executor` in `new Promise(executor)`, and `onResolve`/`onReject` in 
`.then(onResolve, onReject)`.

Context can be set either in the constructor as the secound argument, or using the 
`promise.bind(context)` function.
