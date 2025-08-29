import {mat4} from 'gl-matrix'
import { vertexShaderSource } from "../shaders/vertexShader.js" 
import { fragmentShaderSource } from "../shaders/fragmentShader.js"


const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

if(!gl){
    alert('webgl2 не работает')
}

function sizeCanvas(gl, canvas){
    const dpr = Math.min(window.devicePixelRatio, 2) 
    const size = dpr * 900
    canvas.width = size
    canvas.height = size
    canvas.style.width = '900px'
    canvas.style.height = '900px'
    gl.viewport(0, 0, size, size)
    //gl.enable(gl.DEPTH_TEST);
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

const positionCube = new Float32Array([
    // Верхняя грань
    -0.25, 0.25, 0,
    -0.25, 0.25, -0.5,
    0.25, 0.25, 0,

    0.25, 0.25, 0,
    0.25, 0.25, -0.5,
    -0.25, 0.25, -0.5,

    // Нижняя грань
    -0.25, -0.25, 0,
    0.25, -0.25, 0,
    -0.25, -0.25, -0.5,

    0.25, -0.25, 0,
    0.25, -0.25, -0.5,
    -0.25, -0.25, -0.5,

    // Фронтальная грань
    -0.25, 0.25, 0,
    0.25, 0.25, 0,
    0.25, -0.25, 0,

    -0.25, 0.25, 0,
    -0.25, -0.25, 0,
    0.25, -0.25, 0,

    // Задняя грань
    -0.25, 0.25, -0.5,
    0.25, 0.25, -0.5,
    -0.25, -0.25, -0.5,

    -0.25, -0.25, -0.5,
    0.25, -0.25, -0.5,
    0.25, 0.25, -0.5,

    // Левая грань
    -0.25, 0.25, 0,
    -0.25, -0.25, 0,
    -0.25, -0.25, -0.5,

    -0.25, 0.25, 0,
    -0.25, 0.25, -0.5,
    -0.25, -0.25, -0.5,

    // Правая грань
    0.25, 0.25, 0,
    0.25, 0.25, -0.5,
    0.25, -0.25, 0,

    0.25, -0.25, 0,
    0.25, -0.25, -0.5,
    0.25, 0.25, -0.5,
])

const positionLine = new Float32Array([
    // Передняя
    -0.25,  0.25, 0.0,   
    0.25,  0.25,  0.0,  

    0.25,  0.25,  0.0,  
    0.25, -0.25,  0.0,  

    0.25, -0.25,  0.0,  
    -0.25, -0.25,  0.0,  
    
    -0.25, -0.25,  0.0,  
    -0.25,  0.25,  0.0, 

    // Задняя
    -0.25,  0.25, -0.5,   
    0.25,  0.25, -0.5, 

    0.25,  0.25, -0.5,   
    0.25, -0.25, -0.5,  
         
    0.25, -0.25, -0.5,  
    -0.25, -0.25, -0.5,  
    
    -0.25, -0.25, -0.5,  
    -0.25,  0.25, -0.5,  

    // Соединяющие
    -0.25,  0.25,  0.0,  
    -0.25,  0.25, -0.5,  
    
    0.25,  0.25,  0.0,   
    0.25,  0.25, -0.5, 

    0.25, -0.25,  0.0,   
    0.25, -0.25, -0.5,  

    -0.25, -0.25,  0.0,  
    -0.25, -0.25, -0.5,  
])

const positionCubeBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCube, gl.STATIC_DRAW)

const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

const positionLineBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionLineBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionLine, gl.STATIC_DRAW)

const uColorLocation = gl.getUniformLocation(program, 'uColor')

const uRotationMatrixLocation = gl.getUniformLocation(program, 'uRotationMatrix')

let rotationMatrix = mat4.create()
let angle = 0

function render(){
    angle += 0.015

    mat4.identity(rotationMatrix)
    mat4.rotateY(rotationMatrix, rotationMatrix, angle)
    mat4.rotateZ(rotationMatrix, rotationMatrix, angle)

    gl.useProgram(program)
    gl.uniformMatrix4fv(uRotationMatrixLocation, false, rotationMatrix)

    //gl.enable(gl.DEPTH_TEST);

    // Куб
    gl.uniform4f(uColorLocation, 0.25, 1, 0.25, 1)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeBuffer)
    gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, positionCube.length / 3)

    // Линии на ребрах
    gl.uniform4f(uColorLocation, 0, 0, 0, 1)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionLineBuffer)
    gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.LINES, 0, positionLine.length / 3)

    requestAnimationFrame(render)
}

sizeCanvas(gl, canvas)
render()