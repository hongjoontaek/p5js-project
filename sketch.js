let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  // ✅ 정육면체 형태로 8개 정점 배치
  let size = 1; // 정육면체 크기
  points = [
    createVector(-size, -size, -size),
    createVector(size, -size, -size),
    createVector(size, size, -size),
    createVector(-size, size, -size),
    createVector(-size, -size, size),
    createVector(size, -size, size),
    createVector(size, size, size),
    createVector(-size, size, size)
  ];

  console.log("Generated Cube Points:", points); // 정점 좌표 확인
}

// ✅ 창 크기 조정 시 캔버스 크기 자동 변경
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  let projected = project2Dto3D(points); // ✅ 2D → 3D 변환
  drawEdges(projected); // ✅ 선 그리기
  drawPoints(projected); // ✅ 정점 표시
}

// ✅ 2D → 3D 변환 함수 (정육면체 비율 유지)
function project2Dto3D(points) {
  let projected = [];
  let scaleFactor = min(width, height) * 0.2; // ✅ 정육면체 비율 유지
  for (let p of points) {
    let xProj = p.x * scaleFactor;
    let yProj = p.y * scaleFactor;
    let zProj = p.z * scaleFactor;
    projected.push(createVector(xProj, yProj, zProj));
  }
  return projected;
}

// ✅ 3D 정점 표시 함수
function drawPoints(projected) {
  stroke(0, 255, 0); // 녹색 점
  strokeWeight(10);

  for (let p of projected) {
    point(p.x, p.y, p.z);
  }
}

// ✅ 3D 정점을 연결하는 함수 (정육면체의 12개 변)
function drawEdges(projected) {
  stroke(255);
  strokeWeight(2);

  let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // 앞면
    [4, 5], [5, 6], [6, 7], [7, 4], // 뒷면
    [0, 4], [1, 5], [2, 6], [3, 7]  // 앞면과 뒷면 연결
  ];

  for (let edge of edges) {
    let i = edge[0];
    let j = edge[1];
    line(projected[i].x, projected[i].y, projected[i].z,
         projected[j].x, projected[j].y, projected[j].z);
  }
}