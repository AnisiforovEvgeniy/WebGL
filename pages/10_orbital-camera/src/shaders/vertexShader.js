export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    uniform mat4 uCameraMatrix;

    void main(){
        gl_Position = uCameraMatrix * aPosition;
    }
`