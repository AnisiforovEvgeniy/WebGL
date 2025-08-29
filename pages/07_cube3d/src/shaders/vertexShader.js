export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    out vec4 vColor;
    uniform mat4 uRotationMatrix;
    uniform vec4 uColor;

    void main(){
        gl_Position = uRotationMatrix * aPosition;
        vColor = uColor;
    }
`