import { mat4 } from 'gl-matrix';
import { vertexShaderSource } from "../shaders/vertexShader";
import { fragmentShaderSource } from "../shaders/fragmentShader";
import { createProgram, createShader, createVAO, sizeCanvas } from './utils';
import { parallelepiped, parallelepipedLine, triangles, trianglesLine } from './geometryData';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2');

if (!gl) {
    alert('webgl2 не работает!!!');
}

// ШЕЙДЕРЫ
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// БУФФЕРЫ 
const parallelepipedBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, parallelepipedBuffer);
gl.bufferData(gl.ARRAY_BUFFER, parallelepiped, gl.STATIC_DRAW);

const parallelepipedLineBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, parallelepipedLineBuffer);
gl.bufferData(gl.ARRAY_BUFFER, parallelepipedLine, gl.STATIC_DRAW);

const trianglesBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, trianglesBuffer);
gl.bufferData(gl.ARRAY_BUFFER, triangles, gl.STATIC_DRAW);

const trianglesLineBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, trianglesLineBuffer);
gl.bufferData(gl.ARRAY_BUFFER, trianglesLine, gl.STATIC_DRAW);

// АТРИБУТ И UNIFORMS
const aPositionLocation = gl.getAttribLocation(program, 'aPosition');
const uColorLocation = gl.getUniformLocation(program, 'uColor');
const uCameraLocation = gl.getUniformLocation(program, 'uCameraMatrix');

// VAO 
const VAOParallelepiped = createVAO(gl, parallelepipedBuffer, aPositionLocation);
const VAOParallelepipedLine = createVAO(gl, parallelepipedLineBuffer, aPositionLocation);
const VAOTriangles = createVAO(gl, trianglesBuffer, aPositionLocation);
const VAOTrianglesLine = createVAO(gl, trianglesLineBuffer, aPositionLocation)

// КАМЕРА
const projectionMatrix = mat4.create();
const viewMatrix = mat4.create();
const projectionViewMatrix = mat4.create();

let cameraRadius = 3.5;             // расстояние до центра
let horizontalAngle = Math.PI / 2;  // начальный горизонтальный угол (смотрим с +Z)
let verticalAngle = 0.4;            // начальный вертикальный угол

let isDragging = false;
let lastX = 0;
let lastY = 0;

// Обработчики мышки
canvas.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;

        canvas.style.cursor = 'grabbing';
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastX;
    const deltaY = e.clientY - lastY;

    const sensitivity = 0.007;
    horizontalAngle -= deltaX * sensitivity;
    verticalAngle -= deltaY * sensitivity;

    // Ограничение verticalAngle
    verticalAngle = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, verticalAngle));

    lastX = e.clientX;
    lastY = e.clientY;

    updateCamera();
    render();
});

function updateCamera() {
    const x = cameraRadius * Math.cos(verticalAngle) * Math.cos(horizontalAngle);
    const y = cameraRadius * Math.sin(verticalAngle);
    const z = cameraRadius * Math.cos(verticalAngle) * Math.sin(horizontalAngle);

    mat4.lookAt(
        viewMatrix, // куда передаем 
        [x, y, z], // где находит камера
        [0, 0, 0], // смотрим в центр
        [0, 1, 0] // направление вверх y
    );
    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 100.0);
    mat4.multiply(projectionViewMatrix, projectionMatrix, viewMatrix);
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Параллелепипед
    const modelParallelepiped = mat4.create();
    const MVPParallelepiped = mat4.create();
    mat4.multiply(MVPParallelepiped, projectionViewMatrix, modelParallelepiped);

    gl.uniformMatrix4fv(uCameraLocation, false, MVPParallelepiped);
    gl.uniform4f(uColorLocation, 0, 0.6, 0.9, 1.0);
    gl.bindVertexArray(VAOParallelepiped);
    gl.drawArrays(gl.TRIANGLES, 0, parallelepiped.length / 3);

    gl.uniform4f(uColorLocation, 0, 0, 0, 1);
    gl.bindVertexArray(VAOParallelepipedLine);
    gl.drawArrays(gl.LINES, 0, parallelepipedLine.length / 3);

    // Треугольник 
    const modelTriangles = mat4.create();
    mat4.rotate(modelTriangles, modelTriangles, 45 * Math.PI / 180, [-1, 0, 0])
    const MVPTriangles = mat4.create();
    mat4.multiply(MVPTriangles, projectionViewMatrix, modelTriangles);

    gl.uniformMatrix4fv(uCameraLocation, false, MVPTriangles);
    gl.uniform4f(uColorLocation, 0.188, 0.835, 0.784, 1);
    gl.bindVertexArray(VAOTriangles);
    gl.drawArrays(gl.TRIANGLES, 0, triangles.length / 3);

    gl.uniform4f(uColorLocation, 0, 0, 0, 1);
    gl.bindVertexArray(VAOTrianglesLine);
    gl.drawArrays(gl.LINES, 0, trianglesLine.length / 3);
}

sizeCanvas(gl, canvas);
updateCamera();
render();