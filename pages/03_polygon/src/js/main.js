import { vertexShaderSource } from "../shaders/vertexShader.js"
import { fragmentShaderSource } from "../shaders/fragmentShader.js"

const canvas = document.getElementById("canvas")
const gl = canvas.getContext("webgl2")
const input = document.getElementById("input")

if (!gl) {
  alert("webgl2 не работает!")
}

function sizeCanvas(gl, canvas) {
  const dpr = window.devicePixelRatio || 2
  const size = dpr * 500
  canvas.width = size
  canvas.height = size
  canvas.style.width = "500px"
  canvas.style.height = "500px"
  gl.viewport(0, 0, size, size)
}

function createShader(gl, source, type) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }

  return shader
}

let vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
let fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)

if (!vertexShader || !fragmentShader) {
  console.error("Ошибка создания шейдеров")
}

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program))
}

const poligon = (radius, segment) => {
  let circleVertex = []
  let poligonVertex = []

  for (let i = 0; i <= segment; i++) {
    let angle = Math.PI * 2 * (i / segment)
    let x = Math.sin(angle) * radius
    let y = Math.cos(angle) * radius
    circleVertex.push([x, y, 0])
  }

  for (let j = 0; j < circleVertex.length - 1; j++) {
    poligonVertex.push(0, 0, 0)
    poligonVertex.push(...circleVertex[j])
    poligonVertex.push(...circleVertex[j + 1])
  }

  return new Float32Array(poligonVertex)
}

// Буфер
const positionBuffer = gl.createBuffer()

// Атрибут
const aPositionLocation = gl.getAttribLocation(program, "aPosition")
gl.enableVertexAttribArray(aPositionLocation)

// Функция обновления буфера
function updateBuffer(segments) {
  const position = poligon(1, segments)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

  gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)

  draw()
}

// Функция отрисовки
function draw() {
  sizeCanvas(gl, canvas)
  gl.useProgram(program)
  gl.drawArrays(gl.TRIANGLES, 0, 3 * input.value)
}

// Обработчик ввода
input.addEventListener("input", (event) => {
  const segments = parseInt(event.target.value, 10)
  if (segments > 2) {
    updateBuffer(segments)
  }
})
