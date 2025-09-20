export const positionCube = new Float32Array([
    // Верхняя грань
    -0.25, 0.25, 0,
    -0.25, 0.25, -0.5,
    0.25, 0.25, 0,

    0.25, 0.25, 0,
    0.25, 0.25, -0.5,
    -0.25, 0.25, -0.5,

    // Нижняя грань
    -0.25, -0.25, 0,
    0.25, -0.25, 0,
    -0.25, -0.25, -0.5,

    0.25, -0.25, 0,
    0.25, -0.25, -0.5,
    -0.25, -0.25, -0.5,

    // Фронтальная грань
    -0.25, 0.25, 0,
    0.25, 0.25, 0,
    0.25, -0.25, 0,

    -0.25, 0.25, 0,
    -0.25, -0.25, 0,
    0.25, -0.25, 0,

    // Задняя грань
    -0.25, 0.25, -0.5,
    0.25, 0.25, -0.5,
    -0.25, -0.25, -0.5,

    -0.25, -0.25, -0.5,
    0.25, -0.25, -0.5,
    0.25, 0.25, -0.5,

    // Левая грань
    -0.25, 0.25, 0,
    -0.25, -0.25, 0,
    -0.25, -0.25, -0.5,

    -0.25, 0.25, 0,
    -0.25, 0.25, -0.5,
    -0.25, -0.25, -0.5,

    // Правая грань
    0.25, 0.25, 0,
    0.25, 0.25, -0.5,
    0.25, -0.25, 0,

    0.25, -0.25, 0,
    0.25, -0.25, -0.5,
    0.25, 0.25, -0.5,
])

export const positionCubeLine = new Float32Array([
    // Передняя
    -0.25,  0.25, 0.0,   
    0.25,  0.25,  0.0,  

    0.25,  0.25,  0.0,  
    0.25, -0.25,  0.0,  

    0.25, -0.25,  0.0,  
    -0.25, -0.25,  0.0,  
    
    -0.25, -0.25,  0.0,  
    -0.25,  0.25,  0.0, 

    // Задняя
    -0.25,  0.25, -0.5,   
    0.25,  0.25, -0.5, 

    0.25,  0.25, -0.5,   
    0.25, -0.25, -0.5,  
         
    0.25, -0.25, -0.5,  
    -0.25, -0.25, -0.5,  
    
    -0.25, -0.25, -0.5,  
    -0.25,  0.25, -0.5,  

    // Соединяющие
    -0.25,  0.25,  0.0,  
    -0.25,  0.25, -0.5,  
    
    0.25,  0.25,  0.0,   
    0.25,  0.25, -0.5, 

    0.25, -0.25,  0.0,   
    0.25, -0.25, -0.5,  

    -0.25, -0.25,  0.0,  
    -0.25, -0.25, -0.5,  
])

export const positionPyramid = new Float32Array([
    // ============ ОСНОВАНИЕ (квадрат, 2 треугольника) ============
    // Треугольник 1
    -0.25, -0.25, -0.25,   // задний левый
     0.25, -0.25, -0.25,   // задний правый
    -0.25, -0.25,  0.25,   // передний левый

    // Треугольник 2
    -0.25, -0.25,  0.25,   // передний левый
     0.25, -0.25, -0.25,   // задний правый
     0.25, -0.25,  0.25,   // передний правый

    // ============ БОКОВЫЕ ГРАНИ (4 треугольника) ============
    // Передняя грань
    -0.25, -0.25,  0.25,   // передний левый
     0.25, -0.25,  0.25,   // передний правый
     0.00,  0.25,  0.00,   // вершина

    // Правая грань
     0.25, -0.25,  0.25,   // передний правый
     0.25, -0.25, -0.25,   // задний правый
     0.00,  0.25,  0.00,   // вершина

    // Задняя грань
     0.25, -0.25, -0.25,   // задний правый
    -0.25, -0.25, -0.25,   // задний левый
     0.00,  0.25,  0.00,   // вершина

    // Левая грань
    -0.25, -0.25, -0.25,   // задний левый
    -0.25, -0.25,  0.25,   // передний левый
     0.00,  0.25,  0.00    // вершина
]);

export const positionPyramidLine = new Float32Array([
    // ============ ОСНОВАНИЕ (4 ребра) ============
    -0.25, -0.25, -0.25,   0.25, -0.25, -0.25,   // заднее
     0.25, -0.25, -0.25,   0.25, -0.25,  0.25,   // правое
     0.25, -0.25,  0.25,  -0.25, -0.25,  0.25,   // переднее
    -0.25, -0.25,  0.25,  -0.25, -0.25, -0.25,   // левое

    // ============ РЁБРА К ВЕРШИНЕ (4 ребра) ============
    -0.25, -0.25, -0.25,   0.00,  0.25,  0.00,   // задний левый → вершина
     0.25, -0.25, -0.25,   0.00,  0.25,  0.00,   // задний правый → вершина
     0.25, -0.25,  0.25,   0.00,  0.25,  0.00,   // передний правый → вершина
    -0.25, -0.25,  0.25,   0.00,  0.25,  0.00    // передний левый → вершина
]);



// Исправленный цилиндр с боковой поверхностью и крышками
const radius = 0.2;
const height = 0.4;
const segments = 64;
const cylinderVertices = [];

// Верхняя крышка (круг)
for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const angle = (i / segments) * Math.PI * 2;
    const nextAngle = ((i + 1) / segments) * Math.PI * 2;
    
    // Треугольник к центру
    cylinderVertices.push(
        Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius,
        Math.cos(nextAngle) * radius, height / 2, Math.sin(nextAngle) * radius,
        0, height / 2, 0
    );
}

// Нижняя крышка (круг)
for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const angle = (i / segments) * Math.PI * 2;
    const nextAngle = ((i + 1) / segments) * Math.PI * 2;
    
    // Треугольник к центру
    cylinderVertices.push(
        Math.cos(angle) * radius, -height / 2, Math.sin(angle) * radius,
        Math.cos(nextAngle) * radius, -height / 2, Math.sin(nextAngle) * radius,
        0, -height / 2, 0
    );
}

// Боковая поверхность
for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const angle = (i / segments) * Math.PI * 2;
    const nextAngle = ((i + 1) / segments) * Math.PI * 2;
    
    // Два треугольника для каждого сегмента
    cylinderVertices.push(
        Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius,
        Math.cos(nextAngle) * radius, height / 2, Math.sin(nextAngle) * radius,
        Math.cos(nextAngle) * radius, -height / 2, Math.sin(nextAngle) * radius
    );
    
    cylinderVertices.push(
        Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius,
        Math.cos(nextAngle) * radius, -height / 2, Math.sin(nextAngle) * radius,
        Math.cos(angle) * radius, -height / 2, Math.sin(angle) * radius
    );
}

export const positionCylinder = new Float32Array(cylinderVertices);


// Кольца и вертикальные линии для цилиндра
const r = 0.2;
const h = 0.4;
const ringSegments = 64; // плотность колец
const verticalLinesCount = 7; // количество вертикальных линий

const lines = [];

// Верхнее кольцо (замкнутое)
for (let i = 0; i < ringSegments; i++) {
    const a1 = (i / ringSegments) * Math.PI * 2;
    const a2 = ((i + 1) / ringSegments) * Math.PI * 2;
    
    lines.push(
        Math.cos(a1) * r, h/2, Math.sin(a1) * r,
        Math.cos(a2) * r, h/2, Math.sin(a2) * r
    );
}

// Нижнее кольцо (замкнутое)
for (let i = 0; i < ringSegments; i++) {
    const a1 = (i / ringSegments) * Math.PI * 2;
    const a2 = ((i + 1) / ringSegments) * Math.PI * 2;
    
    lines.push(
        Math.cos(a1) * r, -h/2, Math.sin(a1) * r,
        Math.cos(a2) * r, -h/2, Math.sin(a2) * r
    );
}

// Вертикальные линии (от верха до низа)
for (let i = 0; i < verticalLinesCount; i++) {
    const angle = (i / verticalLinesCount) * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    
    lines.push(
        x, h/2, z,  // верхняя точка
        x, -h/2, z  // нижняя точка
    );
}

export const positionCylinderLine = new Float32Array(lines);