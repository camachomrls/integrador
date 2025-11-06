document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCrearPaquete');
    const modalExito = document.getElementById('modalExito');
    const modalError = document.getElementById('modalError');
    const cerrarModales = document.querySelectorAll('.btn-cerrar-modal');
    const btnVolverPerfil = document.querySelector('.btn-volver-perfil'); 

    const fileInput = document.getElementById('imagen');
    const fileNameDisplay = document.querySelector('.file-name-display');
    const btnSelectFile = document.querySelector('.btn-select-file');

    function mostrarModal(modalElement) {
        modalElement.classList.add('active');
    }

    function ocultarModales() {
        modalExito.classList.remove('active');
        modalError.classList.remove('active');
    }

    cerrarModales.forEach(btn => {
        btn.addEventListener('click', ocultarModales);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalError || event.target === modalExito) {
            ocultarModales();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (fileInput.files.length === 0) {
            alert('Por favor, selecciona una imagen para el paquete.');
            return; 
        }

        console.log('Datos del formulario listos para enviar...');
        
        const simulacionExitosa = true; 

        if (simulacionExitosa) {
            mostrarModal(modalExito);
            form.reset(); 
            fileNameDisplay.textContent = 'Subir imagen representativa'; 
            
            setTimeout(() => {
                ocultarModales();
            }, 2000); 

        } else {
            mostrarModal(modalError);
        }
    });

    if (btnVolverPerfil) {
        btnVolverPerfil.addEventListener('click', () => {
            window.location.href = 'menuMusico.html';
        });
    }

    btnSelectFile.addEventListener('click', () => {
        fileInput.click(); 
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Subir imagen representativa';
        }
    });
});