export const vertexShaderSource = `#version 300 es
    in vec4 aPosition;
    in vec2 aTextureCoordinates;
    out vec2 vTextureCoordinates;
    uniform mat4 uRotationMatrix;
    

    void main(){
        gl_Position = uRotationMatrix * aPosition;
        vTextureCoordinates = aTextureCoordinates;
    }
`