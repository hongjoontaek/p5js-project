let points = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  
  // 테서랙트의 16개 정점 생성
  for (let i = 0; i < 16; i++) {
    let x = (i & 1) * 2 - 1;
    let y = (i & 2) * 2 - 1;
    let z = (i & 4) * 2 - 1;
    let w = (i & 8) * 2 - 1;
    points.push(createVector(x, y, z, w));
  }
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  let projected = [];

  // 4D를 3D로 투영
  for (let p of points) {
    let w = 1 / (2 - p.w); // 원근 투영 (w가 클수록 더 멀리 있는 느낌)
    let x = p.x * w * 100;
    let y = p.y * w * 100;
    let z = p.z * w * 100;
    projected.push(createVector(x, y, z));
  }

  // 3D로 투영된 점들을 연결
  stroke(255);
  strokeWeight(2);
  noFill();
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if (bitDifference(i, j) == 1) {
        line(projected[i].x, projected[i].y, projected[i].z,
             projected[j].x, projected[j].y, projected[j].z);
      }
    }
  }
}

// 비트 차이가 1인 경우만 연결
function bitDifference(a, b) {
  return ((a ^ b).toString(2).match(/1/g) || []).length;
}
