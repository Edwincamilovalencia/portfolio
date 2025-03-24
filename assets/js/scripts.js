// Inicializar EmailJS
(function() {
    emailjs.init("eiaRBfy6I2Dacouy4");
    console.log("EmailJS inicializado correctamente");
})();

// Agregar el event listener cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Formulario enviado");

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log("Valores del formulario:", { name, email, message });

        // Deshabilitar el botón
        const button = this.querySelector('button');
        button.disabled = true;
        button.textContent = 'Enviando...';

        // Preparar los parámetros del template
        const templateParams = {
            to_name: "Admin",
            from_name: name,
            reply_to: email,
            message: message
        };

        console.log("Enviando email con parámetros:", templateParams);

        // Enviar el email
        emailjs.send('service_kkudgzm', 'template_n7qtgrj', templateParams)
            .then(function(response) {
                console.log('ÉXITO:', response);
                alert('¡Mensaje enviado con éxito!');
                document.getElementById('contactForm').reset();
            })
            .catch(function(error) {
                console.error('ERROR:', error);
                alert('Error al enviar el mensaje. Por favor, revisa la consola para más detalles.');
            })
            .finally(function() {
                button.disabled = false;
                button.textContent = 'Enviar Mensaje';
            });
    });

    // Cargar el header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => document.getElementById('header-container').innerHTML = data);

    // Cargar la navegación
    fetch('components/navegation.html')
        .then(response => response.text())
        .then(data => document.getElementById('navigation-container').innerHTML = data);

    // Cargar la sección de proyectos
    fetch('components/proyects.html')
        .then(response => response.text())
        .then(data => document.getElementById('proyects-container').innerHTML = data);

    // Cargar la sección de habilidades
    fetch('components/Habilities.html')
        .then(response => response.text())
        .then(data => document.getElementById('skills-container').innerHTML = data);

    // Cargar la sección de educación
    fetch('components/education.html')
        .then(response => response.text())
        .then(data => document.getElementById('education-container').innerHTML = data);

    // Cargar la sección de contacto
    fetch('components/contact.html')
        .then(response => response.text())
        .then(data => document.getElementById('contact-container').innerHTML = data);

    // Cargar el footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer-container').innerHTML = data);
});

