// Rotación del logo al pasar el ratón
document.getElementById('navbar-logo').addEventListener('mouseover', function () {
    // Aplica una rotación de 360 grados al logo con una transición de 0.5 segundos
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 0.5s';
});

document.getElementById('navbar-logo').addEventListener('mouseout', function () {
    // Restablece la rotación del logo a su posición original
    this.style.transform = 'rotate(0deg)';
});

// Pulso del botón al pasar el ratón
document.querySelector('.pulse-on-hover').addEventListener('mouseover', function () {
    // Aumenta el tamaño del botón a 1.1 veces su tamaño original con una transición de 0.3 segundos
    this.style.transform = 'scale(1.1)';
    this.style.transition = 'transform 0.3s';
});

document.querySelector('.pulse-on-hover').addEventListener('mouseout', function () {
    // Restablece el tamaño del botón a su tamaño original
    this.style.transform = 'scale(1)';
});

// Levantamiento de las tarjetas al pasar el ratón
document.querySelectorAll('.lift-on-hover').forEach(function (card) {
    card.addEventListener('mouseover', function () {
        // Eleva la tarjeta 10 píxeles hacia arriba y aplica una sombra más intensa con una transición de 0.3 segundos
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        this.style.transition = 'all 0.3s';
    });

    card.addEventListener('mouseout', function () {
        // Restablece la tarjeta a su posición original y aplica una sombra menos intensa
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

// Llama a la función de desvanecimiento del footer al cargar la página
document.addEventListener('DOMContentLoaded', fadeInFooter);
