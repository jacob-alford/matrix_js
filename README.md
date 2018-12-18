# matrix_js
A simple javascript matrix library

## Matrix Creation
```
let newMatrix = new Matrix([data],[shape]);
```
Here, `[shape]` is an array whose length roughly represents the number of dimensions of the matrix (assuming indecies which aren't one).  
Supports vectors: `new Matrix([x1,x2,x3],[3])` is equivalent to `new Matrix([x1,x2,x3],3)` is equivalent to `new Matrix([x1,x2,x3])` is equivalent to `new Matrix([x1,x2,x3],[1,3])`.  All vectors (unless otherwise specified) will contain a shape of `[1,n]` for the number of entries in `[data]`.
Supports up to 6th dimensional matricies; although many methods do not support all 6.
Does not support 1x1 matricies.

## [WIP] (Current) Matrix Methods
### Management
Title | Description | Static?
------------ | ------------- | -------------
resetData(array,shape) | Allows to change the content of a matrix, and/or reshape it. | False
reshape(newShape) | Macro for resetData() passes new shape to matrix. | False
duplicate(mat) | Returns a new matrix with identical data and structure | True
concat(array,newShape) | **[WIP]** Concatonates two matricies | True
