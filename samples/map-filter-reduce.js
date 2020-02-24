array : T[]
transform : (T, number) => U
array.map(transform) : U[]
// trasnform = (value, index) => newValue

array : T[]
predicate : (T, number) => bool
array.filter(predicate) : T[]
// predicate = (value, index) => true || false

array : T[]
aggregate : (aggregator: U, value: T, index: number) => U
initialValue : U
array.reduce(aggregate, initialValue) : U
// aggregate = (previousValue, value) => newValue
