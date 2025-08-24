export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform mat4 uModelMatrix;

    void main(){
        gl_Position = uModelMatrix * aPosition;
        vColor = vec4(1, 0.5, 0.5, 1);
    }
`