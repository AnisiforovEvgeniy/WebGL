export const fragmentShaderSource = `#version 300 es
    precision mediump float;  // Средняя точность отрисовки 
    out vec4 outColor;        // Переменная для выходной цвет
    in vec4 vColor;           // Получаем значение цвета из вершинного шейдера

    void main(){
        outColor = vColor;
    }
`