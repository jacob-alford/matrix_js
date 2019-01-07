// --- Global Variables ---
let matStack = [];
let currentMat;
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
        Controller[fn].fn(sInput);
      }else{
        display(`${fn} requires a scalar value specified!`);
      }
    }else{
      Controller[fn].fn();
    }
  }else if(matStack.length == 1){
    if(!Controller[fn].requires.includes("2")){
      if(Controller[fn].requires.includes("s")){
        if($("#scalarInput").val() != ""){
          let sInput = Number($("#scalarInput").val());
          Controller[fn].fn(sInput);
        }else{
          display(`${fn} requires a scalar value specified!`);
        }
      }else{
        Controller[fn].fn();
      }
    }else{
      display(`${fn} requires at least two matricies present!`);
    }
  }else{
    display("You need at least one matrix in the stack!","red");
  }
}
const display = (str,color="black") => {
  $("#display").css("color","white");
  $("#display").html(str);
}
const resetDisplay = () => {
  $("#display").css("color","white");
  $("#display").html("0");
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
    if(Matrix.add(tempMat,matStack[0])){
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
      display("Add requires at least two matricies or a scalar input!");
    }
  }
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
          temp.push(Number($(`#tValue_${i}-${j}`).val()));
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
