export const fragmentShaderSource = `#version 300 es
    precision mediump float;
    in vec4 vColor;
    out vec4 outColor;
    uniform float uPositionX; 

    void main(){
        float t = (uPositionX + 0.75) / 1.5; // от 0 (слева) до 1 (справа)
        vec3 red = vec3(1.0, 0.0, 0.0);
        vec3 blue = vec3(0.0, 0.0, 1.0);
        vec3 color = mix(blue, red, t); // Интерполяция цвета
        outColor = vec4(color, 1.0);
    }
`