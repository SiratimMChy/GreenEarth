### 1.What is the difference between var, let, and const?
#var

-Function-scoped.

-Can be redeclared and updated.

-Hoisted,declared at the top of its scope with undefined as initial value.

#let

-Block-scoped.

-Can be updated but cannot be redeclared in the same scope.

-Hoisted but not initialized,temporal dead zone until defined.

#const

-Block-scoped.

-Cannot be reassigned (but objects/arrays declared with const can still be mutated).

-Hoisted but not initialized (same temporal dead zone as let).

-------------------------------------------------------------------------------------------------------------------------------

### What is the difference between map(), forEach(), and filter()?

`map()`

-Transforms each element of an array.

-Returns a new array with modified values.

`forEach()`

-Iterates over each element.

-Doesn’t return anything .

-Usually used for side effects.

`filter()`

-Tests each element against a condition.

-Returns a new array with elements that pass the condition.

-------------------------------------------------------------------------------------------------------------------------------

### 3. What are arrow functions in ES6?
-Arrow functions are a shorter way to write functions,introduced in ES6.

-They use lexical scoping — no own this, arguments, or super.

-They are not hoisted, so they must be defined before use.

-{} and return can be omitted for single-expression functions.

-------------------------------------------------------------------------------------------------------------------------------

### 4. What are arrow functions in ES6?
-Destructuring is a JavaScript feature that allows you to extract values from objects or arrays into distinct variables.

-Variables are matched by position in arrays or by property name in objects.

-It supports defaults, renaming, skipping, rest operator, and nested structures for flexibility.

--------------------------------------------------------------------------------------------------------------------------------

### 5.Explain template literals in ES6. How are they different from string concatenation?
-Template literals in ES6 are strings enclosed in backticks (``) that allow embedded expressions and multi-line strings.
-Unlike traditional string concatenation, they make code cleaner and more readable using `${}` instead of `+`
