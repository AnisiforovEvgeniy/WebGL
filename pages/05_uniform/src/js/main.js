import {mat4} from 'gl-matrix'
import { vertexShaderSource } from "../shaders/vertexShader.js";
import { fragmentShaderSource } from "../shaders/fragmentShader.js";


const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

if(!gl){
    alert('webgl2 не работает!')
}

function sizeCanvas(gl, canvas){
    const dpr = window.devicePixelRatio || 1
    const size = dpr * 800
    canvas.width = size
    canvas.height = size
    canvas.style.width = "800px"
    canvas.style.height = "800px"
    gl.viewport(0, 0, size, size)
}

function createShader(gl, type, source){
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source) 
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(shader))
        return null
    }

    return shader
}

function createProgram(gl, vertexShader, fragmentShader){
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
        console.error(gl.getProgramInfoLog(program))
        return null
    }

    return program
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)


const position = new Float32Array([
    -0.25, -0.25, 0,
    0.25, -0.25, 0,
    0, 0.25, 0
])

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

const aPositionLocation = gl.getAttribLocation(program, "aPosition")
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

const modelMatrixLocation = gl.getUniformLocation(program, 'uModelMatrix'); // uniform для движения фигуры через матрицу
const positionXLocation = gl.getUniformLocation(program, 'uPositionX');     // uniform для цвета фигуры в зависимости от ее движения

const modelMatrix = mat4.create();

const duration = 2.5; // 2.5 секунд на цикл

function animate(currentTime) {
    const seconds = currentTime / 1000;
    const frequency = 2 * Math.PI / duration; // Радианы в секунду
    const x = 0.75 * Math.cos(frequency * seconds); // макс смещение от центра * cos(частота * время)

    // Сбрасываем матрицу и применяем смещение
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [x, 0, 0]);

    // Рендер
    gl.useProgram(program);
    gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);
    gl.uniform1f(positionXLocation, x); // передаём x в шейдер
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    requestAnimationFrame(animate);
}
sizeCanvas(gl, canvas)
requestAnimationFrame(animate);