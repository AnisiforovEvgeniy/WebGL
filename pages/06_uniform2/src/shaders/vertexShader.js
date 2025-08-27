export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform vec4 uColor;

    void main(){
        gl_Position = aPosition;
        vColor = vec4(uColor);
    }
`