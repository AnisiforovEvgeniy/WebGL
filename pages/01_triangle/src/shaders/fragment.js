export const fragmentShaderSource = `#version 300 es
    precision mediump float; // Уровень точности
    out vec4 outColor; // Объявляем выходную переменную outColor, которая будет содержать цвет пикселя

    void main(){
        outColor = vec4(1.0, 0.7, 0.2, 1.0); // Цвет пикселя
    }
`
