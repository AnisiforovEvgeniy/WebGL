export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    in vec4 aOffset;
    out vec4 vColor;

    void main(){
        gl_Position = aPosition + aOffset;
        vColor = vec4(1.0, 0.7, 0.2, 1.0); 
    }
`