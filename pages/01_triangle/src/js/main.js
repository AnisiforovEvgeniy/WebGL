import { vertexShaderSource } from "../shaders/vertex.js";
import { fragmentShaderSource } from "../shaders/fragment.js";

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2')

// Функция для правильной плотности пикселей и размеров канваса
function resizeCanvas(gl, canvas) {
  const dpr = window.devicePixelRatio || 1;
  const size = 500 * dpr
  canvas.width = size;
  canvas.height = size;
  canvas.style.width = `500px`;
  canvas.style.height = `500px`;
  gl.viewport(0, 0, size, size);
}

// Функция очистки памяти
const clear = () => {
  gl.useProgram(null)
  if(program) gl.deleteProgram(program)

  if(vertexShader) gl.deleteShader(vertexShader)
  if(fragmentShader) gl.deleteShader(fragmentShader)

  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  if(positionBuffer) gl.deleteBuffer(positionBuffer)

  vertexShader = null
  fragmentShader = null
  program = null
  positionBuffer = null
}


// функция компиляции щейдера
const createShader = (gl, source, type) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return shader
}

let vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
let fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)

// Создаем общий соединенный объект для шейдеров
let program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

//координаты вершин 2d фигуры (x, y, z)
const position = new Float32Array([
  -1.0, -1.0, 0.0, // Левая вершина 
  1.0, -1.0, 0.0, // Правая вершина
  0.0, 1.0, 0.0,  // Верхняя вершина
])


// создаем буффер на GPU для хранения данных
let positionBuffer= gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW)

// указываем атрибут aPosition 
const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)



// отрисовка
resizeCanvas(gl, canvas)
gl.useProgram(program)
gl.drawArrays(gl.TRIANGLES, 0, 3)
clear()