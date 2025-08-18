import { vertexShaderSource } from "../shaders/vertexShader.js"
import { fragmentShaderSource } from "../shaders/fragmentShader.js"

const canvas = document.getElementById("canvas")
const gl = canvas.getContext('webgl2')

if(!gl){
    alert("webgl2 не работает")
}

// Функция для правильной плотности пикселей канваса
function sizeCanvas(gl, canvas){
    const dpr = window.devicePixelRatio || 2
    const size = dpr * 500
    canvas.width = size
    canvas.height = size
    canvas.style.width = `500px`
    canvas.style.height = `500px`
    gl.viewport(0, 0, size, size)
}

// Функция очистки памяти
function clear() {
    gl.useProgram(null);
    
    if (program) {
        gl.deleteProgram(program);  
        program = null;
    }
    if (vertexShader) {
        gl.deleteShader(vertexShader);
        vertexShader = null;
    }
    if (fragmentShader) {
        gl.deleteShader(fragmentShader); 
        fragmentShader = null;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    if (positionBuffer) {
        gl.deleteBuffer(positionBuffer); 
        positionBuffer = null;
    }
    if (colorBuffer) {
        gl.deleteBuffer(colorBuffer); 
        colorBuffer = null;
    }
}

// Функция создания шейдеров
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

let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

// Создаем программу
let program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program))
}

// Координаты вершин фигуры
const position = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    0, 1, 0
])

// Цвета пикселей для каждой вершины(автоматически интерполируется)
const color = new Float32Array([
    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1
])

// Буфер для координат
let positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

// Разрешаем использовать координаты вершины из буфера для фтрибута aPosition
const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

// Буфер для цвета вершин
let colorBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER, color, gl.STATIC_DRAW)

// Разрешаем использовать цвета из буфера для атрибута aColor
const aColorLocation = gl.getAttribLocation(program, 'aColor')
gl.enableVertexAttribArray(aColorLocation)
gl.vertexAttribPointer(aColorLocation, 4, gl.FLOAT, false, 0, 0)

sizeCanvas(gl, canvas)

gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 3)
clear()