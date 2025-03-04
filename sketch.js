function setup() {
    createCanvas(400, 400); // 400x400 캔버스 생성
}

function draw() {
    background(220); // 배경 회색
    ellipse(mouseX, mouseY, 50, 50); // 마우스를 따라다니는 원
}
