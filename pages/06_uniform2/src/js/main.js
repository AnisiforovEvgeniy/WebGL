import { vertexShaderSource } from "../shaders/vertexShader.js"
import { fragmentShaderSource } from "../shaders/fragmentShader.js"

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

if(!gl){
    alert("webgl2 не работает")
}

function sizeCanvas(gl, canvas){
    const dpr = Math.min(window.devicePixelRatio, 2)
    const size = dpr * 500
    canvas.width = size
    canvas.height = size
    canvas.style.width = "500px"
    canvas.style.height = "500px"
    gl.viewport(0, 0, size, size)
}

function hexToColorWebGL(hex) {
    const cleaned = hex.slice(1);
    const r = parseInt(cleaned.slice(0, 2), 16) / 255
    const g = parseInt(cleaned.slice(2, 4), 16) / 255
    const b = parseInt(cleaned.slice(4, 6), 16) / 255
    return [r, g, b]
}

let state = {
    color: [1.0, 0.0, 0.0],
    opacity: 1.0
}

const colorInput = document.getElementById("colorInput")
colorInput.addEventListener('input', (event) => {
    state.color = hexToColorWebGL(event.target.value)
    render()
})

const rangeInput = document.getElementById('rangeInput')
rangeInput.addEventListener('input', (event) => {
    state.opacity = event.target.value / 100
    render()
})

function downloadImage() {
    render()
    const link = document.createElement('a');
    link.download = 'star.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', downloadImage)

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
    // Центральный треугольник 1 (верхний луч)
    0.0, 0.8, 0.0,    // вершина 1 (верх)
    -0.2, 0.2, 0.0,   // вершина 2 (левый внутренний)
    0.2, 0.2, 0.0,    // вершина 3 (правый внутренний)

    // Правый верхний луч
    0.2, 0.2, 0.0,    // вершина 3
    0.75, 0.2, 0.0,    // вершина 4 (правый внешний)
    0.3, -0.1, 0.0,   // вершина 5 (правый внутренний низ)

    // Правый нижний луч
    0.3, -0.1, 0.0,   // вершина 5
    0.45, -0.65, 0.0,   // вершина 6 (правый низ)
    0.0, -0.3, 0.0,   // вершина 7 (центр низ)

    // Левый нижний луч
    0.0, -0.3, 0.0,   // вершина 7
    -0.45, -0.65, 0.0,  // вершина 8 (левый низ)
    -0.3, -0.1, 0.0,  // вершина 9 (левый внутренний низ)

    // Левый верхний луч
    -0.3, -0.1, 0.0,  // вершина 9
    -0.75, 0.2, 0.0,   // вершина 10 (левый внешний)
    -0.2, 0.2, 0.0,   // вершина 2

    // Центральный пятиугольник
    0.2, 0.2, 0.0,    // вершина 3
    0.0, -0.3, 0.0,   // вершина 7
    -0.2, 0.2, 0.0,   // вершина 2

    0.2, 0.2, 0.0,    // вершина 3
    0.3, -0.1, 0.0,   // вершина 5
    0.0, -0.3, 0.0,   // вершина 7

    -0.2, 0.2, 0.0,   // вершина 2
    0.0, -0.3, 0.0,   // вершина 7
    -0.3, -0.1, 0.0   // вершина 9
])

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

const uColorLocation = gl.getUniformLocation(program, 'uColor')

function render(){
    gl.useProgram(program)
    gl.uniform4f(uColorLocation, ...state.color, state.opacity)
    gl.drawArrays(gl.TRIANGLES, 0, position.length / 3)
}

sizeCanvas(gl, canvas)
render()