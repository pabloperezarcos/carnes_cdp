// Función para cargar el contenido del pie de página
function loadFooter() {
    // Realiza una solicitud para obtener el contenido del pie de página desde 'footer.html'
    fetch('/footer.html')
        .then(response => response.text()) // Convierte la respuesta en texto
        .then(data => {
            // Inserta el contenido del pie de página en el elemento con ID 'footer-container'
            document.getElementById('footer-container').innerHTML = data;
        });
}

// Llama a la función loadFooter cuando la ventana se ha cargado completamente
window.onload = loadFooter;
