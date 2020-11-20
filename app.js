const canvas = document.querySelector(".jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const saveBtn = document.getElementById("jsSave");

// canvas size //
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// default //
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

// Brush //
function startPainting(){
    painting = true;
}
function stopPainting(){
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
// Fill //
function handleCanvasClick(){
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

// Color //
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// Brush Size //
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// Mode Change //
function handleModeClick(event) {
   if(filling === true){
       filling = false;
       mode.innerText = "Fill";
   } else {
       filling = true;
       mode.innerText = "Brush";
   }
}

// Prevent //
function handleCM(event) {
    event.preventDefault();
}

// Save //
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Your Work";
    link.click();
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}