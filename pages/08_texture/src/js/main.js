import { mat4 } from 'gl-matrix'
import { vertexShaderSource } from "../shaders/vertexShader.js"
import { fragmentShaderSource } from "../shaders/fragmentShader.js"

import img1 from "../textures/mem/img3.jpg"
import img2 from "../textures/mem/img3.jpg"
import img3 from "../textures/mem/img3.jpg"
import img4 from "../textures/mem/img3.jpg"
import img5 from "../textures/mem/img3.jpg"
import img6 from "../textures/mem/img3.jpg"

const canvas = document.getElementById('canvas')
const gl = canvas.getContext('webgl2', {
  antialias: true
});

if(!gl){
    alert('webgl2 не работает')
}

function sizeCanvas(gl, canvas){
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio
    const size = dpr * rect.width
    canvas.width = size
    canvas.height = size
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
        console.error(gl.getProgramLinfoLog(program))
        return null
    }

    return program
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
const program = createProgram(gl, vertexShader, fragmentShader)

// Первые 3 координаты это точка фигуры в xyz
// Еще 2 координаты это точки на текстуре xy(перевернутая система координат)
const positionCube = new Float32Array([
    // Верхняя грань
    -0.35, 0.35, 0,    0, 0,
    -0.35, 0.35, -0.7,   0, 0.7,
    0.35, 0.35, 0,     0.7, 0,

    0.35, 0.35, 0,     0.7, 0,
    0.35, 0.35, -0.7,   0.7, 0.7,
    -0.35, 0.35, -0.7,   0, 0.7,

    // Нижняя грань 
    -0.35, -0.35, 0,   0, 0.7,
    0.35, -0.35, 0,    0.7, 0.7,
    -0.35, -0.35, -0.7,  0, 0,

    0.35, -0.35, 0,    0.7, 0.7,
    0.35, -0.35, -0.7,   0.7, 0,
    -0.35, -0.35, -0.7,  0, 0,

    // Задняя грань
    -0.35, 0.35, -0.7,   0.7, 0,
    0.35, 0.35, -0.7,    0, 0,
    -0.35, -0.35, -0.7,  0.7, 0.7,

    -0.35, -0.35, -0.7,  0.7, 0.7,
    0.35, -0.35, -0.7,   0, 0.7,
    0.35, 0.35, -0.7,    0, 0,

    // Левая грань
    -0.35, 0.35, 0,    0.7, 0,
    -0.35, -0.35, 0,   0.7, 0.7,
    -0.35, -0.35, -0.7,  0, 0.7,

    -0.35, 0.35, 0,    0.7, 0,
    -0.35, 0.35, -0.7,   0, 0,
    -0.35, -0.35, -0.7,  0, 0.7,

    // Правая грань
    0.35, 0.35, 0,     0, 0,
    0.35, 0.35, -0.7,    0.7, 0,
    0.35, -0.35, 0,    0, 0.7,

    0.35, -0.35, 0,    0, 0.7,
    0.35, -0.35, -0.7,   0.7, 0.7,
    0.35, 0.35, -0.7,    0.7, 0,

    // Передняя грань
    -0.35, 0.35, 0,    0, 0,
    0.35, 0.35, 0,     0.7, 0,
    0.35, -0.35, 0,    0.7, 0.7,

    -0.35, 0.35, 0,    0, 0,
    0.35, -0.35, 0,    0.7, 0.7,
    -0.35, -0.35, 0,   0, 0.7,
])

const positionCubeBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCube, gl.STATIC_DRAW)

const aPositionLocation = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPositionLocation)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 5 * 4, 0) // одна цифра 4 байта, указываем что каждые 5 цифр у нас новая точка 

const aTextureCoordinatesLocation = gl.getAttribLocation(program, 'aTextureCoordinates')
gl.enableVertexAttribArray(aTextureCoordinatesLocation)
gl.vertexAttribPointer(aTextureCoordinatesLocation, 2, gl.FLOAT, false, 5 * 4, 3 * 4) // указываем что у нас 2 цифры, каждую выборку из 5 начиная после 3 цирфы

const uRotationMatrixLocation  =gl.getUniformLocation(program, 'uRotationMatrix')

const rotationMatrix = mat4.create()
let angle = 0


function drawTextureCube(gl, program, textures, verticesPerFace = 6){
  const uTextureLocation = gl.getUniformLocation(program, 'uTexture');

  gl.activeTexture(gl.TEXTURE0);

  for(let i = 0; i < textures.length; i++){
    gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    gl.uniform1i(uTextureLocation, 0);
    gl.drawArrays(gl.TRIANGLES, i * verticesPerFace, verticesPerFace);
  }

}

function loadTexture(gl, url) {
  return new Promise((resolve, reject) => {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const image = new Image();
    image.src = url;

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      resolve(texture);
    };

    image.onerror = () => {
      reject(new Error(`Не загружено: ${url}`));
    };
  });
}


Promise.all([
  loadTexture(gl, img1),
  loadTexture(gl, img2),
  loadTexture(gl, img3),
  loadTexture(gl, img4),
  loadTexture(gl, img5),
  loadTexture(gl, img6),
])
.then(loadedTextures => {
  function render() {
    angle += 0.005

    mat4.identity(rotationMatrix)
    mat4.rotateY(rotationMatrix, rotationMatrix, angle)
    mat4.rotateZ(rotationMatrix, rotationMatrix, angle)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    gl.uniformMatrix4fv(uRotationMatrixLocation, false, rotationMatrix)
    
    drawTextureCube(gl, program, loadedTextures);

    requestAnimationFrame(render)
  }
  render()
})
.catch(err => {
  console.error("Ошибка загрузки текстур:", err);
});

sizeCanvas(gl, canvas)