import { mat4 } from 'gl-matrix'
import { vertexShaderSource } from "../shaders/vertex.js";
import { fragmentShaderSource } from "../shaders/fragment.js";
import { sizeCanvas, createShader, createProgram } from "./utils.js"
import { positionCube, positionCubeLine, positionPyramid, positionPyramidLine, positionCylinder, positionCylinderLine } from "./GeometryData.js"

const canvas = document.getElementById('canvas')
const gl = canvas.getContext("webgl2")

if(!gl){
    alert('webgl2 не работает')
}

const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
const fragmentShader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER)
const program = createProgram(gl,vertexShader, fragmentShader)

// БУФФЕРЫ //
const positionCubeBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCube, gl.STATIC_DRAW)

const positionCubeLineBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeLineBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCubeLine, gl.STATIC_DRAW)

const positionPyramidBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionPyramidBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionPyramid, gl.STATIC_DRAW)

const positionPyramidLineBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionPyramidLineBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionPyramidLine, gl.STATIC_DRAW)

const positionCylinderBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCylinderBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCylinder, gl.STATIC_DRAW)

const positionCylinderLineBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, positionCylinderLineBuffer)
gl.bufferData(gl.ARRAY_BUFFER, positionCylinderLine, gl.STATIC_DRAW)

// АТРИБУТ //
const aPositionLocation = gl.getAttribLocation(program, 'aPosition')

// VAO(Vertex Array Object) //
const vaoCube = gl.createVertexArray()
gl.bindVertexArray(vaoCube)
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null) // запечатали vao

const vaoLine = gl.createVertexArray()
gl.bindVertexArray(vaoLine)
gl.bindBuffer(gl.ARRAY_BUFFER, positionCubeLineBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null)

const vaoPyramid = gl.createVertexArray()
gl.bindVertexArray(vaoPyramid)
gl.bindBuffer(gl.ARRAY_BUFFER, positionPyramidBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null)

const vaoPyramidLine = gl.createVertexArray()
gl.bindVertexArray(vaoPyramidLine)
gl.bindBuffer(gl.ARRAY_BUFFER, positionPyramidLineBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null)

const vaoCylinder = gl.createVertexArray()
gl.bindVertexArray(vaoCylinder)
gl.bindBuffer(gl.ARRAY_BUFFER, positionCylinderBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null)

const vaoCylinderLine = gl.createVertexArray()
gl.bindVertexArray(vaoCylinderLine)
gl.bindBuffer(gl.ARRAY_BUFFER, positionCylinderLineBuffer)
gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(aPositionLocation)
gl.bindVertexArray(null)

// UNIFORMS // 
const uColorLocation = gl.getUniformLocation(program, "uColor")
const uMatrixLocation = gl.getUniformLocation(program, 'uMatrix')

sizeCanvas(gl, canvas)
gl.useProgram(program)

// КАМЕРА //
const viewMatrix = mat4.create();  // Матрица вида(камера)
const projMatrix = mat4.create();  // Матрица перспективы
const viewProjMatrix = mat4.create() // P × V

mat4.perspective(projMatrix, 45 * Math.PI / 180, canvas.width / canvas.height, 0.1, 10.0); // (куда записать результат - матрица проекции, угол обзора сверху, соотношение сторон, плоскость отсечения близкая, плоскость отсечения дальняя)
mat4.lookAt(viewMatrix, [1.4, 1, 1.2], [0.0, 0.0, -0.25], [0, 1, 0]);
mat4.multiply(viewProjMatrix, projMatrix, viewMatrix);  // viewProjMatrix = Projection * View


const MVPCube = mat4.create()
const modelMatrixCube = mat4.create()
mat4.translate(modelMatrixCube, modelMatrixCube, [-0.75, 0, 0]); 
mat4.multiply(MVPCube, viewProjMatrix, modelMatrixCube) // (P × V) × M1

const MVPPyramid = mat4.create()
const modelMatrixPyramid = mat4.create()
mat4.identity(modelMatrixPyramid)
mat4.multiply(MVPPyramid, viewProjMatrix, modelMatrixPyramid)

const MVPCylinder = mat4.create()
const modelMatrixCylinder = mat4.create()
mat4.translate(modelMatrixCylinder, modelMatrixCylinder, [0.5, 0.4, 0]); 
mat4.multiply(MVPCylinder, viewProjMatrix, modelMatrixCylinder)


// Куб
gl.uniformMatrix4fv(uMatrixLocation, false, MVPCube); // Передаём матрицу в шейдер
gl.uniform4f(uColorLocation, 1, 0.5, 0.7, 1)
gl.bindVertexArray(vaoCube)
gl.drawArrays(gl.TRIANGLES, 0, positionCube.length / 3)

// Линии куба
gl.uniform4f(uColorLocation, 0, 0, 0, 1)
gl.bindVertexArray(vaoLine)
gl.drawArrays(gl.LINES, 0, positionCubeLine.length / 3)

// Цилиндр 
gl.uniformMatrix4fv(uMatrixLocation, false, MVPCylinder)
gl.uniform4f(uColorLocation, 0.4, 0.7, 1, 1)
gl.bindVertexArray(vaoCylinder)
gl.drawArrays(gl.TRIANGLES, 0, positionCylinder.length / 3)

// Линии цилиндра
gl.uniform4f(uColorLocation, 0, 0, 0, 1)
gl.bindVertexArray(vaoCylinderLine)
gl.drawArrays(gl.LINES, 0, positionCylinderLine.length / 3)

// Пирамида
gl.uniformMatrix4fv(uMatrixLocation, false, MVPPyramid)
gl.uniform4f(uColorLocation, 0.5, 1.0, 0.5, 1)
gl.bindVertexArray(vaoPyramid)
gl.drawArrays(gl.TRIANGLES, 0, positionPyramid.length / 3)

// Линии пирамиды
gl.uniform4f(uColorLocation, 0, 0, 0, 1)
gl.bindVertexArray(vaoPyramidLine)
gl.drawArrays(gl.LINES, 0, positionPyramidLine.length / 3)
