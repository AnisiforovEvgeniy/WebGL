export const vertexShaderSource = `#version 300 es
    in vec4 aPosition; // Получаем значения координат из буфера
    in vec4 aColor;    // Получаем значения цвета пикселей из буфера
    out vec4 vColor;   // Передаем цвет в фрагментый шейдер

    void main(){
        gl_Position = aPosition;
        vColor = aColor;
    }
`