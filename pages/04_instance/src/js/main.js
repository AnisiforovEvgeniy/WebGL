import { vertexShaderSource } from "../shaders/vertexShader.js"
import { fragmentShaderSource } from "../shaders/fragmentShader.js"

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

if(!gl){
  alert("webgl2 не работает")
}

function sizeCanvas(gl, canvas) {
  const dpr = window.devicePixelRatio || 2
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

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

if(!vertexShader || !fragmentShader){
  console.error("Ошибка создания шейдеров")
}

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program) 

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
  console.error(gl.getProgramInfoLog(program))
}

const position = new Float32Array([
  0, 0, 0,
  0, 0.3, 0,
  0.25980762113533157, 0.15000000000000002, 0,
  0, 0, 0, 
  0.25980762113533157, 0.15000000000000002, 0, 
  0.2598076211353316, -0.14999999999999994, 0, 
  0, 0, 0, 
  0.2598076211353316, -0.14999999999999994, 0, 
  3.6739403974420595e-17, -0.3, 0, 
  0, 0, 0, 
  3.6739403974420595e-17, -0.3, 0, 
  -0.2598076211353315, -0.15000000000000013, 0, 
  0, 0, 0, 
  -0.2598076211353315, -0.15000000000000013, 0, 
  -0.25980762113533157, 0.15000000000000002, 0, 
  0, 0, 0, 
  -0.25980762113533157, 0.15000000000000002, 0, 
  -7.347880794884119e-17, 0.3, 0
])

const positionBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

sizeCanvas(gl, canvas)
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 54)

const instance = new Float32Array([
  0, 0, 0,

  -1.2, -1, 0,
  1.2, -1, 0,

  -1.5, -0.5, 0,
  1.5, -0.5, 0,

  -1.8, 0, 0,
  1.8, 0, 0,

  -0.9, -1.5, 0,
  -0.3, -1.5, 0,
  0.3, -1.5, 0,
  0.9, -1.5, 0,

  -0.9, 1.5, 0,
  -0.3, 1.5, 0,
  0.3, 1.5, 0,
  0.9, 1.5, 0,

  -0.6, -1, 0,
  -0, -1, 0,
  0.6, -1, 0,

  -0.9, -0.5, 0,
  -0.3, -0.5, 0,
  0.3, -0.5, 0,
  0.9, -0.5, 0,

  -1.2, 0, 0,
  -0.6, 0, 0,
  0.6, 0, 0,
  1.2, 0, 0,

  -1.5, 0.5, 0,
  -0.9, 0.5, 0,
  -0.3, 0.5, 0,
  0.3, 0.5, 0,
  0.9, 0.5, 0,
  1.5, 0.5, 0,

  -1.2, 1, 0,
  -0.6, 1, 0,
  0, 1, 0,
  0.6, 1, 0,
  1.2, 1, 0,
])

const instanceBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer)
gl.bufferData(gl.ARRAY_BUFFER, instance, gl.STATIC_DRAW)

const aOffsetLocation = gl.getAttribLocation(program, 'aOffset')
gl.enableVertexAttribArray(aOffsetLocation)
gl.vertexAttribPointer(aOffsetLocation, 3, gl.FLOAT, false, 0, 0)
gl.vertexAttribDivisor(aOffsetLocation, 1) // Обновляем каждый instance 

gl.drawArraysInstanced(gl.TRIANGLES, 0, 18, 37); // 18 вершин на 36 instance 
