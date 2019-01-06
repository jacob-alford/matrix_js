# **[WIP]** matrix_js
A simple javascript matrix (and vector) library.

## Matrix Creation
```
let newMatrix = new Matrix([data],[shape]);
```
Here, `[shape]` is an array whose length roughly represents the number of dimensions of the matrix (assuming indecies which aren't one). Supports up to 6th dimensional matricies; although many methods do not support all 6.
Does not support 1x1 matricies.

## [WIP] (Current) Matrix Methods
### Management
Title | Description | Static?
------------ | ------------- | -------------
resetData(array,shape) | Allows change to the content of a matrix, and/or reshape it. | False
reshape(newShape) | Macro for resetData() passes new shape to matrix. | False
duplicate(mat) | Returns a new matrix with identical data and structure | True
matFromVecs(...args) | Creates a matrix from row or column vectors. | True
colToVectors() | Returns an array of vectors which are the columns of the matrix | False
rowsToVectors() | Returns an array of vectors which are the rows the matrix | False
matFromMatsByCol() | Concatonates two matricies, column-based. | True
matFromMatsByRow() | Concatonates two matricies, row-based. | True
splitByCol(low,high?) | Returns a new matrix which omits outside of the inclusive (by index) column range low-high | False
splitByRow(low,high?) | Returns a new matrix which omits outside of the inclusive (by index) row range low-high | False
cap(num) | Ensures no value exceeds num in the matrix | False

### Get and Set
Title | Description | Static?
------------ | ------------- | -------------
getValue(mat,...coordinates) | Grabs a value for `x1,x2,...,xn` from mat. | True
setValue(mat,...coordinates) | Sets the value in mat at `x1,x2,...,xn`. | True
getRow(n) | Returns the nth row of a two dimensional matrix. | False
getCol(n) | Returns the nth column of a two dimensional matrix. | False
getSlice(n) | Generalize getRow but for any dimension greater than two. | False
setRow(n,vec) | Set the nth row to vector (matrix) `vec`. | False
setCol(n,vec) | Set the nth column to vector (matrix) `vec`. | False

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
product() | Multiplies every element in the matrix | False

### Statistics
Title | Description | Static?
------------ | ------------- | -------------
mean() | Determines the arithmetic mean (`mat.sum().div(mat.plain.length)`). | False
expVal(a,weights?,probabilities?) | Finds the expected value of a set of data. (`return Matrix.mul(a,weights).sum()`) | True
var(a,weights?,probabilities) |  Finds the population variance of a set of data. (`Matrix.expVal(Matrix.pow(a,2),weights,probabilities) - Math.pow(Matrix.expVal(a,weights),2`)
stDev(a,weights?,probabilities?) | Determines the population standard deviation  (`Math.sqrt(Matrix.var(a,weights,probabilities))`) | True
cov(a,b) | Determines the covariance of two datasets. (`Matrix.mul(a,b).sum()-a.sum()*b.sum()/a.plain.length`) | True
corr(a,b) | Determines the correlation coefficient of two datasets. | True
linReg(a,b,fn?) | Runs a linear regression on two data sets, returns a function object and a coefficient array | True
reg(a,b,degree?,fn?) | Runs a polynomial regression of degree 'n,' returns a coefficient array. | True

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

### Linear Algebra
Title | Description | Static?
------------ | ------------- | -------------
transpose() | Transposes a 2-dimensional matrix. | Both
matMul(a,b) | Performs generic [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication) on two matricies or a matrix and a vector. | True
vecTransform(mat,vec) | Transforms a vector into a different basis based on mat. | True
dot(mat) | Takes the [dot product](https://en.wikipedia.org/wiki/Dot_product) of two vectors. | True
innerProduct(mat) | Takes the [inner product](https://en.wikipedia.org/wiki/Inner_product_space) of two matricies. | Both
outerProduct(a,b) | Takes the [outer product](https://en.wikipedia.org/wiki/Outer_product) of two vectors. | True
trace() | Sums the diagonal of a square matrix. | Both
det() | Computes the determinant of a square (n x n) matrix. | True
gaussElim(mat,upperForm?) | Row reduces a to identity matrix (or upper form if specified), and returns an array which contains both the reduced matrix first, and a list of operations second (as a matrix). | True
invert(a) | Inverts a matrix if it is invertible | True

### Row Reduction Support
Title | Description | Static?
------------ | ------------- | -------------
addRows(r1,r2,c) | Sets `r2` to `c*r1+r2`. | False
subRows(r1,r2,c) | Sets `r2` to `c*r1-r2`. | False
scaleRow(r1,c) | Scales `r1` by `c`. | False
scaleRow(r1,r2) | Swaps `r1` and `r2`. | False

### Trigonometry
Title | Description | Static?
------------ | ------------- | -------------
radToDeg() | Converts elements from radians to degrees. | False
degToRad() | Converts from degrees to radians. | False
sin() | Applies the sine function elementwise. | Both
cos() | Applies the cosine function elementwise. | Both
tan() | Applies the tangeant function elementwise. | Both
asin() | Applies the inverse sine function elementwise. | Both
acos() | Applies the inverse cosine function elementwise. | Both
atan() | Applies the inverse tangeant function elementwise. | Both

## Included Support Functions
### Matrix Constructors
Title | Description | Limits
------------ | ------------- | -------------
mat_indentity(shape) | Returns a two-dimensional square identity matrix. | 2d, square
mat_seq(shape,begin,end) | Returns a matrix whose values are sequential from `begin` to `end`. | NONE
mat_ones(shape) | Returns a matrix filled with ones. | NONE
mat_fixed(shape,value) | Returns a matrix whose sole value is `value`. | NONE
mat_rand(shape,min,max) | Returns a matrix filled with random values between `min` and `max`. | NONE

### Support Functions
Title | Description | Use
------------ | ------------- | -------------
sameArr(arr1,arr2) | Determines if arr1 is equivalent to arr2. | Compares matrix shapes
isAMatrix(mat) | Returns true if provided argument is a matrix, false if not. | Debugging Purposes
flattenArr(arr,shape) | Takes an array (e.g. mat.data) with multiple dimensions, and squishes it to a flat array. | Used to update 'plain' property.

## Vector Creation (extends Matrix)
```
let newVector = new Vector([data]);
```
## [WIP] (Current) Vector Methods
Title | Description | Static?
------------ | ------------- | -------------
norm() | Returns the length of vector. | False
dot(vec) | Dots two vectors | False
cross(a,b) | Takes the cross product of two vectors | True
normalize() | Turns vector into a unit vector | False
setLen(len) | Sets the length of the vector in the same direction. | False
angleBetween(a,b,deg=false) | Finds the angle between two vectors. | True
orthoProject(a,...bases) | Orthographically projects a onto subspace spanned by (vectors) ...bases. | True
