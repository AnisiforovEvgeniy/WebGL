export function setupOrbitControls(canvas, { cameraRadius, horizontalAngle, verticalAngle }, onUpdate) {
    const sensitivity = 0.007;
    const zoomSensitivity = 0.2;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    let currentRadius = cameraRadius;
    let currentHorizontalAngle = horizontalAngle;
    let currentVerticalAngle = verticalAngle;

    function handleDragMove(deltaX, deltaY) {
        currentHorizontalAngle -= deltaX * sensitivity;
        currentVerticalAngle -= deltaY * sensitivity;

        // Ограничение вертикального угла
        currentVerticalAngle = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, currentVerticalAngle));

        onUpdate({
            cameraRadius: currentRadius,
            horizontalAngle: currentHorizontalAngle,
            verticalAngle: currentVerticalAngle
        });
    }

    function handleZoom(deltaY) {
        const zoomFactor = deltaY > 0 ? 1 + zoomSensitivity : 1 - zoomSensitivity;
        currentRadius *= zoomFactor;

        currentRadius = Math.max(1.5, Math.min(15, currentRadius));

        onUpdate({
            cameraRadius: currentRadius,
            horizontalAngle: currentHorizontalAngle,
            verticalAngle: currentVerticalAngle
        });
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            canvas.style.cursor = 'grab';
        }
    }

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

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        handleZoom(e.deltaY);
    });

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