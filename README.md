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

### Get and Set
Title | Description | Static?
------------ | ------------- | -------------
getValue(mat,...coordinates) | Grabs a value for `x1,x2,...,xn` from mat. | True
setValue(mat,...coordinates) | Sets the value in mat at `x1,x2,...,xn`. | True

### Display
Title | Description | Static?
------------ | ------------- | -------------
print(verbose?,flat?) | Displays the matricies in the console window. | False

### Reduction
Title | Description | Static?
------------ | ------------- | -------------
max() | Grabs a highest value in matrix. | False
min() | Grabs a smallest value in matrix. | False
sum() | Adds up every value in the matrix. | False
mean() | Determines the arithmetic mean (`mat.sum().div(mat.plain.length)`). | False
stDev() | Determines the population standard deviation (`Math.sqrt(mat.pow(2).sum()-Math.pow(mat.mean(),2))`) | False

### Arithmetic
Title | Description | Static?
------------ | ------------- | -------------
add(mat) | Adds elementwise. | Both
sub(mat) | Subtracts elementwise. | Both
mul(mat) | Multiplies elementwise. | Both
div() | Divides elementwise. | Both
pow(n) | Raises to the power n elementwise. | Both
sqrt() | Takes the square root elementwise. | False
exp() | Raises e to the power of the element(wise). | False
ln() | Takes the natural log elementwise. | False
xrt(n) | Takes the nth root elementwise. | False
abs() | Takes the absolute value elementwise. | False
round() | Rounds elementwise. | False

