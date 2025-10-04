export function sizeCanvas(gl, canvas){
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio 
    const size = dpr * rect.width
    canvas.width = size
    canvas.height = size
    gl.viewport(0, 0, size, size)
}

export function createShader(gl, type, source){
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
        console.error(gl.getShaderInfoLog(shader))
        return null
    }

    return shader
}

export function createProgram(gl, vertexShader, fragmentShader ){
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

export function createVAO(gl, buffer, location){
    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
    gl.bindVertexArray(null)
    return vao
}