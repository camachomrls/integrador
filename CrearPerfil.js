'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-profile-form');
    const errorMessage = document.getElementById('error-message');
    const successModal = document.getElementById('success-modal');
    const redirectButton = document.getElementById('modal-redirect-button');
    
    const menuMusicoPath = '/vistas/menuMusico.html';

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        hideError(); 

        const fields = {
            artistName: document.getElementById('artist-name').value,
            genre: document.getElementById('genre').value,
            location: document.getElementById('location').value,
            experience: document.getElementById('experience').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            biography: document.getElementById('biography').value,
        };

        const emptyFields = validateFields(fields);

        if (emptyFields.length > 0) {
            
            showError(`⚠️ ¡Faltan campos por llenar! Por favor, verifica: ${emptyFields.join(', ')}.`);
            return; 
        }

        console.log('✅ Perfil listo para ser creado:', fields);
        
        
        setTimeout(() => {
            handleSuccess(); 
        }, 1000); 
    });

    redirectButton.addEventListener('click', redirectToMenu);

    
    function validateFields(fields) {
        const empty = [];
        if (!fields.artistName.trim()) empty.push('Nombre Artista');
        if (!fields.genre.trim()) empty.push('Género');
        if (!fields.location.trim()) empty.push('Ubicación');
        if (!fields.experience.trim()) empty.push('Experiencia'); 
        if (!fields.email.trim()) empty.push('Correo');
        if (!fields.phone.trim()) empty.push('Teléfono');
        if (!fields.biography.trim()) empty.push('Biografía/Descripción');
        return empty;
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('visible');
    }

    function hideError() {
        errorMessage.classList.remove('visible');
    }

    function handleSuccess() {
        successModal.classList.remove('hidden');
    }

    function redirectToMenu() {
        window.location.replace(menuMusicoPath); 
    }
});