export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform vec4 uColor;
    uniform mat4 uMatrix;

    void main(){
        gl_Position = uMatrix * aPosition;
        vColor = uColor;
    }
`