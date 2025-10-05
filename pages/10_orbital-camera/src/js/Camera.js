export function setupOrbitControls(canvas, { cameraRadius, horizontalAngle, verticalAngle }, onUpdate) {
    const sensitivity = 0.007;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    function handleDragMove(deltaX, deltaY) {
        horizontalAngle -= deltaX * sensitivity;
        verticalAngle -= deltaY * sensitivity;

        // Ограничение вертикального угла
        verticalAngle = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, verticalAngle));

        // Передаём текущие параметры наружу
        onUpdate({
            cameraRadius,
            horizontalAngle,
            verticalAngle
        });
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            canvas.style.cursor = 'grab';
        }
    }

    // Мышка
    canvas.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            canvas.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mouseup', stopDragging);

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        handleDragMove(deltaX, deltaY);
    });

    // Прикосновение
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            lastX = e.touches[0].clientX;
            lastY = e.touches[0].clientY;
            e.preventDefault();
        }
    });

    window.addEventListener('touchend', stopDragging);
    window.addEventListener('touchcancel', stopDragging);

    canvas.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - lastX;
        const deltaY = e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        handleDragMove(deltaX, deltaY);
        e.preventDefault();
    });
}