// --- Global Variables ---
let currentMat = mat_fixed([3,4],0);
let matStack = [];
// --- Classes ---
const Controller = {

}
class Func{
  constructor(req,fn){
    this.requires=req;
    this.fn = fn;
  }
}
// --- Support Functions ---
const control = fn => {
  resetDisplay();
  if(matStack.length == 2){
    if(Controller[fn].requires.includes("s")){
      if($("#scalarInput").val() != ""){
        let sInput = Number($("#scalarInput").val());
        if(Controller[fn].requires.includes("v")){
          if(isAVector(matStack[0]) && isAVector(matStack[1])){
            if(Controller[fn].requires.includes("d")){
              if(sameArr(matStack[0].shape,matStack[1].shape)){
                Controller[fn].fn(sInput);
              }else{
                display("The two vectors must have the same shape!");
              }
            }else{
              Controller[fn].fn(sInput);
            }
          }else{
            display(`${fn} requires two vectors!`);
          }
        }else{
          if(Controller[fn].requires.includes("d")){
            if(sameArr(matStack[0].shape,matStack[1].shape)){
              Controller[fn].fn(sInput);
            }else{
              display("The two matricies must have the same shape!");
            }
          }else{
            Controller[fn].fn(sInput);
          }
        }
      }else{
        display(`${fn} requires a scalar value specified!`);
      }
    }else{
      if(Controller[fn].requires.includes("v")){
        if(isAVector(matStack[0]) && isAVector(matStack[1])){
          if(Controller[fn].requires.includes("d")){
            if(sameArr(matStack[0].shape,matStack[1].shape)){
              Controller[fn].fn();
            }else{
              display("The two vectors must have the same shape!");
            }
          }else{
            Controller[fn].fn();
          }
        }else{
          display(`${fn} requires two vectors!`);
        }
      }else{
        if(Controller[fn].requires.includes("d")){
          if(sameArr(matStack[0].shape,matStack[1].shape)){
            Controller[fn].fn();
          }else{
            display("The two matricies must have the same shape!");
          }
        }else{
          Controller[fn].fn();
        }
      }
    }
  }else if(matStack.length == 1){
    if(!Controller[fn].requires.includes("2")){
      if(Controller[fn].requires.includes("s")){
        if($("#scalarInput").val() != ""){
          let sInput = Number($("#scalarInput").val());
          if(Controller[fn].requires.includes("v")){
            if(isAVector(matStack[0])){
              Controller[fn].fn(sInput);
            }else{
              display(`${fn} requires a vector!`);
            }
          }else{
            Controller[fn].fn(sInput);
          }
        }else{
          display(`${fn} requires a scalar value specified!`);
        }
      }else{
        if(Controller[fn].requires.includes("v")){
          if(isAVector(matStack[0])){
            Controller[fn].fn();
          }else{
            display(`${fn} requires a vector!`);
          }
        }else{
          Controller[fn].fn();
        }
      }
    }else{
      display(`${fn} requires at least two matricies present!`);
    }
  }else{
    display("You need at least one matrix in the stack!","red");
  }
  $("#scalarInput").val("");
}
const display = (str,color="black") => {
  $("#display").css("color","white");
  $("#display").html(str);
}
const resetDisplay = () => {
  display(0);
}
const displayStack = () => {
  $("#matDisplay").html("");
  matStack.forEach((c,index) => {
    $("#matDisplay").append(`
      <div class="col">
        <table class="table table-bordered table-dark text-center my-3">
          <tbody id="matDisplayBody_${index}">
          </tbody>
        </table>
      </div>
      `);
      for(let i=0;i<c.shape[0];i++){
        $(`#matDisplayBody_${index}`).append(`<tr id="mat_${index}-row_${i}">`);
        for(let j=0;j<c.shape[1];j++){
          $(`#mat_${index}-row_${i}`).append(`<td>${c.data[i][j]}</td>`);
        }
      }
  });
}
// --- Function Creation ---
// Arithmetic
Controller["add"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let tempMat = mat_fixed(matStack[0].shape,Number($("#scalarInput").val()));
    if(Matrix.add(tempMat,matStack[0]) !== false){
      matStack[0].add(tempMat);
      displayStack();
    }else{
      display("Unable to perform operation!");
    }
  }else{
    if(matStack.length == 2){
      let tempMat = Matrix.add(matStack[0],matStack[1]);
      if(tempMat){
        matStack = [];
        matStack.push(tempMat);
        displayStack();
      }else{
        display("Unable to perform the operation!");
      }
    }else{
      display("Addition requires at least two matricies or a scalar input!");
    }
  }
});
Controller["sub"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let tempMat = mat_fixed(matStack[0].shape,Number($("#scalarInput").val()));
    if(Matrix.sub(tempMat,matStack[0]) !== false){
      matStack[0].sub(tempMat);
      displayStack();
    }else{
      display("Unable to perform operation!");
    }
  }else{
    if(matStack.length == 2){
      let tempMat = Matrix.sub(matStack[0],matStack[1]);
      if(tempMat){
        matStack = [];
        matStack.push(tempMat);
        displayStack();
      }else{
        display("Unable to perform the operation!");
      }
    }else{
      display("Subtract requires at least two matricies or a scalar input!");
    }
  }
});
Controller["mul"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let tempMat = mat_fixed(matStack[0].shape,Number($("#scalarInput").val()));
    if(Matrix.mul(tempMat,matStack[0]) !== false){
      matStack[0].mul(tempMat);
      displayStack();
    }else{
      display("Unable to perform operation!");
    }
  }else{
    if(matStack.length == 2){
      let tempMat = Matrix.mul(matStack[0],matStack[1]);
      if(tempMat){
        matStack = [];
        matStack.push(tempMat);
        displayStack();
      }else{
        display("Unable to perform the operation!");
      }
    }else{
      display("Multiplication requires at least two matricies or a scalar input!");
    }
  }
});
Controller["div"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let tempMat = mat_fixed(matStack[0].shape,Number($("#scalarInput").val()));
    if(Matrix.div(tempMat,matStack[0]) !== false){
      matStack[0].div(tempMat);
      displayStack();
    }else{
      display("Unable to perform operation!");
    }
  }else{
    if(matStack.length == 2){
      let tempMat = Matrix.div(matStack[0],matStack[1]);
      if(tempMat){
        matStack = [];
        matStack.push(tempMat);
        displayStack();
      }else{
        display("Unable to perform the operation!");
      }
    }else{
      display("Divide requires at least two matricies or a scalar input!");
    }
  }
});
Controller["pow"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let scalar = Number($("#scalarInput").val());
    if(Matrix.pow(matStack[0],scalar) !== false){
      matStack[0].pow(scalar);
      displayStack();
    }else{
      display("Unable to perform operation!");
    }
  }else{
    display("Power requires a scalar input!");
  }
});
Controller["sqrt"] = new Func("",() => {
      matStack[0].sqrt();
      displayStack();
});
Controller["exp"] = new Func("",() => {
      matStack[0].exp();
      displayStack();
});
Controller["ln"] = new Func("",() => {
      matStack[0].ln();
      displayStack();
});
Controller["xrt"] = new Func("",() => {
  if($("#scalarInput").val() != ""){
    let scalar = Number($("#scalarInput").val());
    matStack[0].xrt(scalar);
    displayStack();
  }else{
    display("Xth-Root requires a scalar input!");
  }
});
Controller["abs"] = new Func("",() => {
      matStack[0].abs();
      displayStack();
});
Controller["round"] = new Func("",() => {
      matStack[0].round();
      displayStack();
});
// Trigonometry
Controller["sin"] = new Func("",() => {
      matStack[0].sin();
      displayStack();
});
Controller["cos"] = new Func("",() => {
      matStack[0].cos();
      displayStack();
});
Controller["tan"] = new Func("",() => {
      matStack[0].tan();
      displayStack();
});
Controller["asin"] = new Func("",() => {
      matStack[0].asin();
      displayStack();
});
Controller["acos"] = new Func("",() => {
      matStack[0].acos();
      displayStack();
});
Controller["atan"] = new Func("",() => {
      matStack[0].atan();
      displayStack();
});
Controller["rad2Deg"] = new Func("",() => {
      matStack[0].radToDeg();
      displayStack();
});
Controller["deg2Rad"] = new Func("",() => {
      matStack[0].degToRad();
      displayStack();
});
// Reduction
Controller["max"] = new Func("",() => {
      let output = matStack[0].max();
      display(output);
});
Controller["min"] = new Func("",() => {
      let output = matStack[0].min();
      display(output);
});
Controller["sum"] = new Func("",() => {
      let output = matStack[0].sum();
      display(output);
});
Controller["product"] = new Func("",() => {
      let output = matStack[0].product();
      display(output);
});
// Statistics
Controller["mean"] = new Func("",() => {
      let out = matStack[0].mean();
      display(out);
});
Controller["expVal"] = new Func("2d",() => {
    if(Matrix.expVal(matStack[0],matStack[1]) !== false){
      let temp = Matrix.expVal(matStack[0],matStack[1]);
      display(temp);
    }else{
      display("Unable to perform operation!");
    }
});
Controller["var"] = new Func("2d",() => {
    if(Matrix.var(matStack[0],matStack[1]) !== false){
      let temp = Matrix.var(matStack[0],matStack[1]);
      display(temp);
    }else{
      display("Unable to perform operation!");
    }
});
Controller["stDev"] = new Func("2d",() => {
    if(Matrix.stDev(matStack[0],matStack[1]) !== false){
      let temp = Matrix.var(matStack[0],matStack[1]);
      display(temp);
    }else{
      display("Unable to perform operation!");
    }
});
Controller["cov"] = new Func("2d",() => {
  let temp = Matrix.cov(matStack[0],matStack[1]);
  display(temp);
});
Controller["corr"] = new Func("2d",() => {
  let temp = Matrix.corr(matStack[0],matStack[1]);
  display(temp);
});
Controller["linReg"] = new Func("2d",() => {
  let temp = Matrix.linReg(matStack[0],matStack[1]);
  display(`y=${temp[0].toFixed(3)}+${temp[1].toFixed(3)}x`);
});
Controller["reg"] = new Func("2sd",val => {
  let temp = Matrix.reg(matStack[0],matStack[1],val);
  let outString = `y=${temp[0].toFixed(3)}`;
  temp.forEach((c,i) => {
    if(i>0) outString += `${(temp[i]<0)?"-":"+"}${Math.abs(temp[i].toFixed(3))}x^${i}`;
  });
  display(outString);
});
// Vectors
Controller["dot"] = new Func("2vd",() => {
      let output = matStack[0].dot(matStack[1]);
      display(output);
});
Controller["norm"] = new Func("v",() => {
      let output = matStack[0].norm();
      display(output);
});
Controller["cross"] = new Func("2v",() => {
      let output = Vector.cross(matStack[0],matStack[1]);
      if(matStack.shape.includes(3) && matStack.shape.includes(3)){
        if(output !== 'false'){
          display(output);
        }else{
          display('There was an error!');
        }
      }else{
        display("Vectors must be three dimensional!");
      }
});
Controller["normalize"] = new Func("v",() => {
          matStack[0].normalize();
          displayStack();
});
Controller["setLen"] = new Func("sv",val => {
          matStack[0].setLen(val);
          displayStack();
});
Controller["angleBetween"] = new Func("2vd",val => {
          let temp = Vector.angleBetween(matStack[0],matStack[1]);
          display(temp);
});
Controller["outerProduct"] = new Func("2v",() => {
      let output = Matrix.outerProduct(matStack[0],matStack[1]);
        if(output !== false){
          matStack = [];
          matStack.push(output);
          displayStack();
        }else{
          display('There was an error!');
        }
});
// Linear Algebra
Controller["transpose"] = new Func("",() => {
      let output = Matrix.transpose(matStack[0]);
        if(output !== false){
          matStack[0].transpose();
          displayStack();
        }else{
          display('There was an error!');
        }
});
Controller["matMul"] = new Func("2",() => {
      let output = Matrix.matMul(matStack[0],matStack[1]);
        if(output !== false){
          matStack = [];
          matStack.push(output);
          displayStack();
        }else{
          display('There was an error!');
        }
});
Controller["innerProduct"] = new Func("2d",() => {
      let output = Matrix.innerProduct(matStack[0],matStack[1]);
        if(output !== false){
          display(output);
        }else{
          display('There was an error!');
        }
});
Controller["trace"] = new Func("",() => {
      let output = matStack[0].trace();
        if(output !== false){
          display(output);
        }else{
          display('There was an error, check that the matrix is square!');
        }
});
Controller["det"] = new Func("",() => {
      let output = Matrix.det(matStack[0]);
        if(output !== false){
          display(output);
        }else{
          display('There was an error, check that the matrix is square!');
        }
});
Controller["rowRed"] = new Func("",() => {
      let output = Matrix.gaussElim(matStack[0])[0];
        if(output !== false){
          matStack = [];
          matStack.push(output);
          displayStack();
        }else{
          display('There was an error!');
        }
});
Controller["invert"] = new Func("",() => {
      let det = Matrix.det(matStack[0]);
      if(det !== false){
        if(det != 0){
          let output = Matrix.invert(matStack[0]);
          if(output !== false){
            matStack = [];
            matStack.push(output);
            displayStack();
          }else{
            display('There was an error!');
          }
        }else{
          display("Matrix is not invertible!");
        }
      }else{
        display("Matrix must be square!");
      }
});

$(document).ready(function(){
  $("#setShape").click(function(){
    $("#setBody").html("");
    let shape = [Number($("#rows").val()),Number($("#cols").val())];
    let tempMat;
    if($("#tempSel").val() != ""){
      if($("#tempSel").val() == "Fixed"){
        if($("#fixedInput").val() != ""){
          let number = Number($("#fixedInput").val().split(",")[0]);
          tempMat = mat_fixed(shape,number);
        }else{
          display("Fixed requires a value to be specified in box!");
          return false;
        }
      }else if($("#tempSel").val() == "Identity"){
        if(shape[0] == shape[1]){
          tempMat = mat_identity(shape);
          $("#display").css("color","black");
          $("#display").html("matCalc_js");
        }else{
          display("Shape must be square for identity matrix!");
          return false;
        }
      }else if($("#tempSel").val() == "Random (specify range: 'min,max')"){
        if($("#fixedInput").val().includes(",")){
          let range = [$("#fixedInput").val().split(",")[0],$("#fixedInput").val().split(",")[1]];
          tempMat = mat_rand(shape,Number(range[0]),Number(range[1]));
        }else{
          display("Random requires min and max specified in box formatted as follows: 'min,max'.");
          return false;
        }
      }else if($("#tempSel").val() == "Random Integer (specify range: 'min,max')"){
        if($("#fixedInput").val().includes(",")){
          let range = [$("#fixedInput").val().split(",")[0],$("#fixedInput").val().split(",")[1]];
          tempMat = mat_rand(shape,Number(range[0]),Number(range[1]),true);
        }else{
          display("Random requires min and max specified in box formatted as follows: 'min,max'.");
          return false;
        }
      }else if($("#tempSel").val() == "Sequential (specify range: 'start,stop') (Note:values are inclusive)"){
        if($("#fixedInput").val().includes(",")){
          let range = [$("#fixedInput").val().split(",")[0],$("#fixedInput").val().split(",")[1]];
          if(shape[0]*shape[1] == (Number(range[1])+1)-Number(range[0])){
            tempMat = mat_seq(shape,Number(range[0]),Number(range[1])+1);
          }else{
            display("Sequential requires the range of numbers to match the given matrix shape!");
            return false;
          }
        }else{
          display("Sequential requires begin and end specified in box formatted as follows: 'begin,end'.");
          return false;
        }
      }else if($("#tempSel").val() == "Equal Weight Probability"){
        tempMat = mat_fixed(shape,1/(shape[0]*shape[1]));
      }
    }else{

    }
    currentMat = tempMat;
    for(let i=0;i<Number($("#rows").val());i++){
      $("#setBody").append(`<tr id="row_${i}">`);
      for(let j=0;j<Number($("#cols").val());j++){
        $(`#row_${i}`).append(`<td><input type="number" class="form-control matrixData" id="tValue_${i}-${j}" value="${tempMat.data[i][j]}"></input></td>`);
      }
    }
  });
  $("#pushMat").click(function(){
    if(matStack.length < 2){
      resetDisplay();
      let temp = [];
      for(let i=0;i<currentMat.shape[0];i++){
        for(let j=0;j<currentMat.shape[1];j++){
          if($(`#tValue_${i}-${j}`).val() != "" || !($(`#tValue_${i}-${j}`).val() === undefined)){
            temp.push(Number($(`#tValue_${i}-${j}`).val()));
          }else{
            temp.push(0);
          }
        }
      }
      let tempMat;
      let str;
      if(currentMat.shape.includes(1)){

        if(currentMat.shape[0] == 1){
          str = 'row';
        }else{
          str = 'col';
        }
        tempMat = new Vector(temp,str);
      }else{
        let shape = [Number($("#rows").val()),Number($("#cols").val())];
        if(shape[0] != currentMat.shape[0] || shape[1] != currentMat.shape[1]){
         shape = currentMat.shape;
        }
        tempMat = new Matrix(temp,shape);
      }
      matStack.unshift(tempMat);
      currentMat = tempMat;
      displayStack(matStack);
    }else{
      display("Max two matricies allowed in stack!","red");
      setTimeout(function(){
        resetDisplay();
      },4000);
    }
  });
  $("#swapMat").click(function(){
      resetDisplay();
      matStack.reverse();
      displayStack(matStack);
  });
  $("#dropMat").click(function(){
    resetDisplay();
    matStack.shift();
    displayStack(matStack);
  });
  $("#clearMat").click(function(){
      resetDisplay();
      $("#setBody").html("");
      for(let i=0;i<Number($("#rows").val());i++){
        $("#setBody").append(`<tr id="row_${i}">`);
        for(let j=0;j<Number($("#cols").val());j++){
          $(`#row_${i}`).append(`<td><input type="number" class="form-control" value="0" id="tValue_${i}-${j}"></input></td>`);
        }
      }
      currentMat = mat_fixed([Number($("#rows").val()),Number($("#cols").val())],0);
  });
  $("#resetStack").click(function(){
      resetDisplay();
      $("#setBody").html("");
      for(let i=0;i<Number($("#rows").val());i++){
        $("#setBody").append(`<tr id="row_${i}">`);
        for(let j=0;j<Number($("#cols").val());j++){
          $(`#row_${i}`).append(`<td><input type="number" class="form-control" value="0" id="tValue_${i}-${j}"></input></td>`);
        }
      }
      currentMat = mat_fixed([Number($("#rows").val()),Number($("#cols").val())],0);
      matStack = [];
      displayStack();
  });
});
