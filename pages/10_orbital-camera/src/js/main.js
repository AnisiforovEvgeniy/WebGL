import { mat4 } from 'gl-matrix';
import { vertexShaderSource } from "../shaders/vertexShader";
import { fragmentShaderSource } from "../shaders/fragmentShader";
import { createProgram, createShader, createVAO, sizeCanvas } from './utils';
import { parallelepiped, parallelepipedLine, triangles, trianglesLine } from './geometryData';
import { setupOrbitControls } from './Camera.js';

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

const initialCamera = {
    cameraRadius: 3.5,
    horizontalAngle: Math.PI / 2,
    verticalAngle: 0.4
};

setupOrbitControls(canvas, initialCamera, (cameraParams) => {
    updateCamera(cameraParams);
    render();
});

function updateCamera({ cameraRadius, horizontalAngle, verticalAngle }) {
    const x = cameraRadius * Math.cos(verticalAngle) * Math.cos(horizontalAngle);
    const y = cameraRadius * Math.sin(verticalAngle);
    const z = cameraRadius * Math.cos(verticalAngle) * Math.sin(horizontalAngle);

    mat4.lookAt(viewMatrix, [x, y, z], [0, 0, 0], [0, 1, 0]);
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
updateCamera(initialCamera);
render();