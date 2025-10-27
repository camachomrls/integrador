'use strict';

const AppState = {
    currentTab: 'login',
    userType: 'cliente', // 'cliente' o 'musico'
    passwordVisibility: {
        'login-password': false,
        'register-password': false
    }
};

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    initializeTabs();
    initializePasswordToggles();
    initializeUserTypeSwitch();
    initializeForms();

    console.log('✅ HermoNet: Aplicación inicializada correctamente');
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    if (!tabButtons.length) {
        console.warn('⚠️ No se encontraron botones de pestañas');
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            handleTabChange(this);
        });
    });
}

function handleTabChange(clickedButton) {
    const targetTab = clickedButton.getAttribute('data-tab');

    if (!targetTab) {
        console.error('❌ El botón no tiene atributo data-tab');
        return;
    }

    // Actualizar estado
    AppState.currentTab = targetTab;

    // Actualizar botones de pestañas
    const allTabButtons = document.querySelectorAll('.tab-button');
    allTabButtons.forEach(button => {
        const isActive = button.getAttribute('data-tab') === targetTab;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive);
    });

    // Actualizar paneles
    const allPanels = document.querySelectorAll('.tab-panel');
    allPanels.forEach(panel => {
        const isActive = panel.id === `${targetTab}-panel`;
        panel.classList.toggle('active', isActive);
    });

    console.log(`📑 Pestaña cambiada a: ${targetTab}`);
}

function initializePasswordToggles() {
    const toggleButtons = document.querySelectorAll('.password-toggle');

    if (!toggleButtons.length) {
        console.warn('⚠️ No se encontraron botones de toggle de contraseña');
        return;
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            handlePasswordToggle(this);
        });
    });
}

function handlePasswordToggle(button) {
    const targetId = button.getAttribute('data-target');

    if (!targetId) {
        console.error('❌ El botón toggle no tiene atributo data-target');
        return;
    }

    const passwordInput = document.getElementById(targetId);

    if (!passwordInput) {
        console.error(`❌ No se encontró el input con id: ${targetId}`);
        return;
    }

    // Cambiar tipo de input
    const isCurrentlyPassword = passwordInput.type === 'password';
    passwordInput.type = isCurrentlyPassword ? 'text' : 'password';

    // Actualizar estado
    AppState.passwordVisibility[targetId] = !isCurrentlyPassword;

    // Actualizar botón
    button.classList.toggle('active', !isCurrentlyPassword);

    // Actualizar aria-label
    const newLabel = isCurrentlyPassword ? 'Ocultar contraseña' : 'Mostrar contraseña';
    button.setAttribute('aria-label', newLabel);

    console.log(`👁️ Visibilidad de contraseña (${targetId}): ${!isCurrentlyPassword ? 'visible' : 'oculta'}`);
}

function initializeUserTypeSwitch() {
    const switchButton = document.querySelector('.switch-button');

    if (!switchButton) {
        console.warn('⚠️ No se encontró el switch de tipo de usuario');
        return;
    }

    switchButton.addEventListener('click', function () {
        handleUserTypeSwitch(this);
    });
}

function handleUserTypeSwitch(switchButton) {
    const isChecked = switchButton.getAttribute('aria-checked') === 'true';
    const newUserType = isChecked ? 'cliente' : 'musico';

    // Actualizar estado
    AppState.userType = newUserType;

    // Actualizar switch
    switchButton.setAttribute('aria-checked', !isChecked);

    // Actualizar labels
    const labels = document.querySelectorAll('.toggle-label');
    labels.forEach(label => {
        const labelType = label.getAttribute('data-type');
        label.classList.toggle('active', labelType === newUserType);
    });

    // Actualizar texto del botón de registro
    updateRegisterButtonText(newUserType);

    console.log(`👤 Tipo de usuario cambiado a: ${newUserType}`);
}

function updateRegisterButtonText(userType) {
    const registerButton = document.getElementById('register-submit');

    if (!registerButton) {
        console.warn('⚠️ No se encontró el botón de registro');
        return;
    }

    const buttonText = userType === 'musico'
        ? 'Registrarme como Músico'
        : 'Registrarme como Cliente';

    registerButton.textContent = buttonText;
}

function initializeForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    } else {
        console.warn('⚠️ No se encontró el formulario de login');
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    } else {
        console.warn('⚠️ No se encontró el formulario de registro');
    }

    // Inicializar enlace de "Olvidaste tu contraseña"
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', handleForgotPassword);
    }
}

function handleLoginSubmit(event) {
    event.preventDefault();

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    };

    // Validación básica
    if (!validateEmail(formData.email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }

    if (formData.password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    console.log('🔐 Intento de inicio de sesión:', formData);

    // Aquí iría la lógica para enviar datos al servidor
    showNotification(`Iniciando sesión con: ${formData.email}`, 'success');

    // Simular proceso de login
    simulateAsyncOperation(() => {
        console.log('✅ Login exitoso (simulado)');
        
    window.location.replace('/index.html');
    });
}

function handleRegisterSubmit(event) {
    event.preventDefault();

    const formData = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
        userType: AppState.userType
    };

    // Validación básica
    if (formData.name.trim().length < 3) {
        showNotification('El nombre debe tener al menos 3 caracteres', 'error');
        return;
    }

    if (!validateEmail(formData.email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }

    if (formData.password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    console.log('📝 Intento de registro:', formData);

    const userTypeLabel = formData.userType === 'musico' ? 'Músico' : 'Cliente';
    showNotification(`Registrando como ${userTypeLabel}: ${formData.name}`, 'success');

    // Simular proceso de registro
    simulateAsyncOperation(() => {
        console.log('✅ Registro exitoso (simulado)');
        // Aquí redirigirías al usuario o actualizarías el estado de la aplicación
    });
}

function handleForgotPassword(event) {
    event.preventDefault();
    console.log('🔑 Recuperación de contraseña solicitada');
    showNotification('Funcionalidad de recuperación de contraseña en desarrollo', 'info');
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateAsyncOperation(callback) {
    setTimeout(callback, 1000);
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: '500',
        maxWidth: '320px',
        zIndex: '1000',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        animation: 'slideIn 0.3s ease',
        backgroundColor: type === 'success' ? '#10b981' :
            type === 'error' ? '#ef4444' :
                '#3b82f6'
    });

    // Añadir al DOM
    document.body.appendChild(notification);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Añadir estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('error', function (event) {
    console.error('❌ Error global capturado:', event.error);
});

window.addEventListener('unhandledrejection', function (event) {
    console.error('❌ Promesa rechazada no manejada:', event.reason);
});

window.HermoNetDebug = {
    getState: () => AppState,
    switchTab: (tab) => {
        const button = document.querySelector(`[data-tab="${tab}"]`);
        if (button) handleTabChange(button);
    },
    switchUserType: () => {
        const switchButton = document.querySelector('.switch-button');
        if (switchButton) handleUserTypeSwitch(switchButton);
    }
};

console.log('💡 Debug disponible en: window.HermoNetDebug');