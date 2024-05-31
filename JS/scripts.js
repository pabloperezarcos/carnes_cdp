// Rotación del logo al pasar el ratón
document.getElementById('navbar-logo').addEventListener('mouseover', function () {
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 0.5s';
});
document.getElementById('navbar-logo').addEventListener('mouseout', function () {
    this.style.transform = 'rotate(0deg)';
});

// Pulso del botón al pasar el ratón
document.querySelector('.pulse-on-hover').addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.1)';
    this.style.transition = 'transform 0.3s';
});
document.querySelector('.pulse-on-hover').addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)';
});

// Levantamiento de las tarjetas al pasar el ratón
document.querySelectorAll('.lift-on-hover').forEach(function (card) {
    card.addEventListener('mouseover', function () {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        this.style.transition = 'all 0.3s';
    });
    card.addEventListener('mouseout', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

// Desvanecimiento del footer al cargar la página
function fadeInFooter() {
    var footer = document.getElementById('footer');
    footer.style.opacity = 0;
    footer.style.transition = 'opacity 1.5s';
    setTimeout(function () {
        footer.style.opacity = 1;
    }, 500);
}
