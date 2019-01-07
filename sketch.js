// --- Global Variables ---
let matStack = [];
let currentMat;
// --- Classes ---
const Controller = {

}
class Func{
  constructor(req,fn){
    this.requirements=req;
    this.fn = fn;
  }
}
// --- Support Functions ---
const control = fn => {
  if(matStack.length == 2){ // Matrix
    if(Controller[fn].requirements == "matrix" || Controller[fn].requirements == "both"){
      Controller[fn].fn("matrix");
    }else{
      if($("#scalarInput").val() != ""){
        let sInput = Number($("#scalarInput").val());
        Controller[fn].fn("scalar",sInput);
      }else{
        display(`${fn} only supports scalar operations, input a scalar value!`,"red");
      }
    }
  }else if(matStack.length == 1){ // Scalar
    if($("#scalarInput").val() != ""){
      if(Controller[fn].requirements == "scalar" || Controller[fn].requirements == "both"){
        let sInput = Number($("#scalarInput").val());
        Controller[fn].fn("scalar",sInput);
      }else{
        display(`${fn} doesn't support scalar operations!`);
      }
    }else{
      display("Input a scalar value to operate on the matrix!","red");
      Controller[fn].fn("matrix");
    }
  }else{
    display("You need at least one matrix in the stack!","red");
  }
}
const display = (str,color="black") => {
  $("#display").css("color",color);
  $("#display").html(str);
}
const resetDisplay = () => {
  $("#display").css("color","black");
  $("#display").html("matCalc_js");
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
Controller["add"] = new Func("both",(sOrM,val=0) => {
  if(sOrM == "scalar"){
    matStack[0].add(val);
    displayStack();
  }else{
    let tempMat = Matrix.add(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
  }
});
Controller["sub"] = new Func("both",(sOrM,val=0) => {
  if(sOrM == "scalar"){
    matStack[0].sub(val);
    displayStack();
  }else{
    let tempMat = Matrix.sub(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
  }
});
Controller["mul"] = new Func("both",(sOrM,val=0) => {
  if(sOrM == "scalar"){
    matStack[0].mul(val);
    displayStack();
  }else{
    let tempMat = Matrix.mul(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
  }
});
Controller["div"] = new Func("both",(sOrM,val=0) => {
  if(sOrM == "scalar"){
    matStack[0].div(val);
    displayStack();
  }else{
    let tempMat = Matrix.div(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
  }
});
Controller["pow"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].pow(val);
    displayStack();
});
Controller["sqrt"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].sqrt();
    displayStack();
});
Controller["exp"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].exp();
    displayStack();
});
Controller["ln"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].ln();
    displayStack();
});
Controller["xrt"] = new Func("scalar",(sOrM,val=2) => {
    matStack[0].xrt(val);
    displayStack();
});
Controller["abs"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].abs();
    displayStack();
});
Controller["round"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].round();
    displayStack();
});
// Statistics
Controller["mean"] = new Func("scalar",(sOrM,val=1) => {
    let output = matStack[0].mean();
    display(output,"black");
});
Controller["expVal"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.expVal(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["var"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.var(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["stDev"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.stDev(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["cov"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.cov(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["corr"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.corr(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["linReg"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.linReg(matStack[0],matStack[1]);
    console.log(output);
    display(`y=${output[0].toFixed(3)}+${output[1].toFixed(3)}x`,"black");
});
// Linear Algebra
Controller["transpose"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].transpose();
    displayStack();
});
Controller["matMul"] = new Func("matrix",(sOrM,val=1) => {
    let tempMat = Matrix.matMul(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
});
Controller["innerProduct"] = new Func("matrix",(sOrM,val=1) => {
    let output = Matrix.innerProduct(matStack[0],matStack[1]);
    display(output,"black");
});
Controller["outerProduct"] = new Func("matrix",(sOrM,val=1) => {
    let tempMat = Matrix.outerProduct(matStack[0],matStack[1]);
    matStack = [];
    matStack.push(tempMat);
    displayStack();
});
Controller["trace"] = new Func("both",(sOrM,val=1) => {
  let output = matStack[0].trace();
  display(output,"black");
});
Controller["det"] = new Func("scalar",(sOrM,val=1) => {
  let output = Matrix.det(matStack[0]);
  display(output,"black");
});
Controller["rowRed"] = new Func("scalar",(sOrM,val=1) => {
  let tempMat = Matrix.gaussElim(matStack[0]);
  matStack = [];
  matStack.push(tempMat[0]);
  displayStack();
});
Controller["invert"] = new Func("scalar",(sOrM,val=1) => {
  let tempMat = Matrix.invert(matStack[0]);
  matStack = [];
  matStack.push(tempMat[0]);
  displayStack();
});
// Trigonometry
Controller["sin"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].sin();
    displayStack();
});
Controller["cos"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].cos();
    displayStack();
});
Controller["tan"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].tan();
    displayStack();
});
Controller["asin"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].asin();
    displayStack();
});
Controller["acos"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].acos(val);
    displayStack();
});
Controller["atan"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].atan(val);
    displayStack();
});
Controller["rad2Deg"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].radToDeg();
    displayStack();
});
Controller["deg2Rad"] = new Func("scalar",(sOrM,val=1) => {
    matStack[0].deg2Rad();
    displayStack();
});
$(document).ready(function(){
  $("#setShape").click(function(){
    $("#setBody").html("");
    let shape = [Number($("#rows").val()),Number($("#cols").val())];
    let tempMat;
    if($("#tempSel").val() != ""){
      if($("#tempSel").val() == "Fixed") tempMat = mat_fixed(shape,Number($("#fixedInput").val()));
      else if($("#tempSel").val() == "Identity"){
        if(shape[0] == shape[1]){
          tempMat = mat_identity(shape);
          $("#display").css("color","black");
          $("#display").html("matCalc_js");
        }else{
          $("#display").css("color","red");
          $("#display").html("Shape must be square for identity matrix!");
        }
      }
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
          temp.push($(`#tValue_${i}-${j}`).val());
        }
      }
      let tempMat = new Matrix(temp,currentMat.shape);
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
          $(`#row_${i}`).append(`<td><input type="number" class="form-control"></input></td>`);
        }
      }
  });
  $("#resetStack").click(function(){
      resetDisplay();
      $("#setBody").html("");
      for(let i=0;i<Number($("#rows").val());i++){
        $("#setBody").append(`<tr id="row_${i}">`);
        for(let j=0;j<Number($("#cols").val());j++){
          $(`#row_${i}`).append(`<td><input type="number" class="form-control"></input></td>`);
        }
      }
      matStack = [];
      displayStack();
  });
});
