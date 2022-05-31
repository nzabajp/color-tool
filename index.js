const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const sliderText = document.getElementById("slider-text");
const slider = document.getElementById("slider");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", function(){
    if (toggleBtn.classList.contains("toggled")) {
        lightenText.classList.remove("unselected");
        toggleBtn.classList.remove("toggled");
        darkenText.classList.add("unselected");
    }
    else {
        lightenText.classList.add("unselected");
        toggleBtn.classList.add("toggled");
        darkenText.classList.remove("unselected");
    }
    reset();
    
});

hexInput.addEventListener("keyup", function(){
    const hex = hexInput.value;
    if (!isValidHex(hex)){
        return;
    }
    const strippedHex = hex.replace("#", "");
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();

});
function isValidHex(hex) {
    if (!hex){
        return false;
    }
    
    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
}

function convertHexToRgb(hex){
    if (!isValidHex(hex)){
        return null;
    }

    let strippedHex = hex.replace("#", "");

    if (strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.slice(0,2), 16);
    const g = parseInt(strippedHex.slice(2,4), 16);
    const b = parseInt(strippedHex.slice(4), 16);

    return {
        r: r,
        g: g,
        b: b
    }
}

const convertRGBToHex = (r,g,b) => {
    let hex1 = r.toString(16);
    let hex2 = g.toString(16);
    //a diff way to excecute without the if statement
    let hex3 = ("0" + b.toString(16)).slice(-2);
    if (hex1.length < 2){
        hex1 = `0${hex1}`
    }
    if (hex2.length < 2){
        hex2 = `0${hex2}`
    }
    return `#${hex1}${hex2}${hex3}`;
}

const alterColor = (hexVal, per) => {
    const toRGB = convertHexToRgb(hexVal);
    const amount = Math.floor((per/100) * 255);
    const newR = increaseWithin0To255(toRGB.r, amount);
    const newG = increaseWithin0To255(toRGB.g, amount);
    const newB = increaseWithin0To255(toRGB.b, amount);
    return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;

    if (newHex > 255) {
        return 255;
    } 
    else if (newHex < 0) {
        return 0;
    }
    else {
        return newHex;
    }
}

slider.addEventListener("input", function(){
    const hex = hexInput.value;
    if (!isValidHex(hex)) return;

    let sliderVal = slider.value;
    sliderText.textContent =`${sliderVal}%`;

    if (toggleBtn.classList.contains("toggled")) {
        sliderVal = `-${slider.value}`;
    }

    const updatedHex = alterColor(hex, sliderVal);

    alteredColor.style.backgroundColor = updatedHex;
    alteredColorText.textContent = `Altered Color ${updatedHex}`;
});

const reset = () => {
    slider.value = 0;
    sliderText.textContent = "0%";
    alteredColorText.textContent = `Altered Color ${hexInput.value}`;
    alteredColor.style.backgroundColor = hexInput.value;

}
