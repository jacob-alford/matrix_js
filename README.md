# matrix_js
A simple javascript matrix library

# Matrix Creation
```
let newMatrix = new Matrix([data],[shape]);
```
Here, `[shape]` is an array whose length roughly represents the number of dimensions of the matrix (assuming indecies which aren't one).  Supports vectors: `new Matrix([x1,x2,x3],[3])` is equivalent to `new Matrix([x1,x2,x3],3)` is equivalent to `new Matrix([x1,x2,x3])` is equivalent to `new Matrix([x1,x2,x3],[1,3])`.  All vectors (unless otherwise specified) will contain a shape of `[1,3]`.
