export const vertexShaderSource = `#version 300 es
    in vec4 aPosition; // Берем координаты точек из буфера вершин 

    void main(){
        gl_Position = aPosition;
    }
`