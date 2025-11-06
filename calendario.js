import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, addDoc, deleteDoc, onSnapshot, collection, query, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db, auth, userId = null;
let isAuthReady = false;

const monthDisplay = document.getElementById('monthDisplay');
const calendarGrid = document.getElementById('calendarGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentDateDisplay = document.getElementById('currentDateDisplay');
const addEventToggleBtn = document.getElementById('addEventToggleBtn');
const eventFormContainer = document.getElementById('eventFormContainer');
const eventForm = document.getElementById('eventForm');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const eventsList = document.getElementById('eventsList');

const eventDateInput = document.getElementById('eventDateInput');
const eventNameInput = document.getElementById('eventName');
const eventTimeInput = document.getElementById('eventTime');
const eventPlaceInput = document.getElementById('eventPlace');
const eventNoteInput = document.getElementById('eventNote');

let currentDate = new Date();
let selectedDate = new Date(); 

const months = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

function formatDateForDisplay(date) {
    if (isNaN(date.getTime())) return "Selecciona un día";
    return `${date.getDate()} de ${months[date.getMonth()].toLowerCase()}`;
}

function formatDbDate(date) {
    if (isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}


async function initializeFirebaseAndAuth() {
    try {
        if (Object.keys(firebaseConfig).length > 0) {
            const app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            setLogLevel('Debug');
            
            onAuthStateChanged(auth, async (user) => {
                if (!user) {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                    return; 
                }
                
                userId = user.uid;
                console.log("Firebase: User signed in with ID:", userId);
                isAuthReady = true;
                
                selectedDate = new Date(); 
                renderCalendar();
                updateEventsPanel(selectedDate);
            });
        } else {
            console.error("Firebase config is missing. App will run without persistent storage.");
            isAuthReady = true;
            renderCalendar();
            updateEventsPanel(selectedDate);
        }
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        isAuthReady = true;
        renderCalendar();
        updateEventsPanel(selectedDate);
    }
}


function renderCalendar() {
    while (calendarGrid.children.length > 7) {
        calendarGrid.removeChild(calendarGrid.lastChild);
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthDisplay.textContent = `${months[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay(); 
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    let startDayIndex = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); 

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayIndex; i > 0; i--) {
        const day = prevMonthLastDay - i + 1;
        const cell = createDayCell(day, 'old-month', false, new Date(year, month - 1, day));
        calendarGrid.appendChild(cell);
    }

    for (let day = 1; day <= lastDayOfMonth; day++) {
        const date = new Date(year, month, day);
        const cell = createDayCell(day, '', true, date);
        calendarGrid.appendChild(cell);
    }

    const totalDaysInGrid = calendarGrid.children.length - 7;
    const remainingCells = 42 - totalDaysInGrid;

    for (let day = 1; day <= remainingCells; day++) {
        const cell = createDayCell(day, 'next-month', false, new Date(year, month + 1, day));
        calendarGrid.appendChild(cell);
    }

    highlightSelectedDay();
    if (isAuthReady && userId) {
        updateEventsPanel(selectedDate, true); 
    }
}

function createDayCell(day, extraClass, isCurrentMonth, date) {
    const cell = document.createElement('div');
    cell.className = `day-cell ${extraClass}`;
    cell.setAttribute('data-date', formatDbDate(date));
    cell.innerHTML = `<div class="day-content">${day}<div class="event-indicator" id="indicator-${formatDbDate(date)}"></div></div>`;

    if (isCurrentMonth) {
        cell.addEventListener('click', () => handleDayClick(date));
    }
    
    return cell;
}

function highlightSelectedDay() {
    document.querySelectorAll('.day-cell span.selected-day').forEach(el => {
        const parentCell = el.closest('.day-cell');
        if(parentCell) {
            const dayNumber = el.textContent;
            el.replaceWith(document.createTextNode(dayNumber));
        }
    });
    
    const targetCell = calendarGrid.querySelector(`.day-cell[data-date="${formatDbDate(selectedDate)}"]`);
    if (targetCell && !targetCell.classList.contains('old-month') && !targetCell.classList.contains('next-month')) {
        
        const dayContentEl = targetCell.querySelector('.day-content');
        const dayNumberNode = dayContentEl ? dayContentEl.childNodes[0] : null; 
        
        if (dayNumberNode && dayNumberNode.nodeType === 3) { 
            const dayNumber = dayNumberNode.textContent;
            const wrapper = document.createElement('span');
            wrapper.className = 'selected-day';
            wrapper.textContent = dayNumber;
            dayNumberNode.replaceWith(wrapper);
        }
    }
}

function handleDayClick(date) {
    selectedDate = date;
    highlightSelectedDay();
    updateEventsPanel(selectedDate);
    eventFormContainer.classList.add('hidden');
    eventForm.reset();
}

function handleNavigation(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    
    const newMonth = currentDate.getMonth();
    const newYear = currentDate.getFullYear();
    
    if (selectedDate.getMonth() !== newMonth || selectedDate.getFullYear() !== newYear) {
        const dayToKeep = selectedDate.getDate();
        const lastDayOfNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
        const newDay = Math.min(dayToKeep, lastDayOfNewMonth);
        selectedDate = new Date(newYear, newMonth, newDay);
    } 

    renderCalendar();
    eventFormContainer.classList.add('hidden');
    eventForm.reset();
    updateEventsPanel(selectedDate);
}

prevMonthBtn.addEventListener('click', () => handleNavigation(-1));
nextMonthBtn.addEventListener('click', () => handleNavigation(1));


let unsubscribeEvents = null;


function updateEventsPanel(date, forceAll = false) {
    currentDateDisplay.textContent = formatDateForDisplay(date);
    
    const isVisibleMonth = currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear();
    addEventToggleBtn.disabled = !isVisibleMonth;
    
    if (!forceAll && unsubscribeEvents && isAuthReady) {
    } else if (unsubscribeEvents) {
        unsubscribeEvents();
    }
    
    if (isAuthReady && userId) {
        const dbDate = formatDbDate(date);
        const eventCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'events');
        const q = query(eventCollectionRef); 
        
        unsubscribeEvents = onSnapshot(q, (snapshot) => {
            const allEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            const dailyEvents = allEvents.filter(event => event.date === dbDate).sort((a, b) => (a.time > b.time) ? 1 : -1);

            renderDailyEvents(dailyEvents);
            
            renderAllEventIndicators(allEvents);

        }, (error) => {
            console.error("Error listening to events in Firestore:", error);
            renderDailyEvents([]);
        });
    } else {
         eventsList.innerHTML = `<p class="no-events-message">Cargando datos...</p>`;
    }
}

function renderAllEventIndicators(allEvents) {
     document.querySelectorAll('.event-indicator').forEach(el => el.innerHTML = '');
     
     const eventsByDate = allEvents.reduce((acc, event) => {
         acc[event.date] = acc[event.date] || [];
         acc[event.date].push(event);
         return acc;
     }, {});
     
     document.querySelectorAll('.day-cell').forEach(cell => {
         const dateStr = cell.getAttribute('data-date');
         const indicatorEl = document.getElementById(`indicator-${dateStr}`);
         
         if (indicatorEl && eventsByDate[dateStr] && eventsByDate[dateStr].length > 0) {
             indicatorEl.innerHTML = `<span class="event-dot dot-reserved"></span>`;
         }
     });
}

function renderDailyEvents(events) {
    eventsList.innerHTML = '';
    
    if (events.length === 0) {
        eventsList.innerHTML = `<p class="no-events-message">No hay eventos para este día.</p>`;
        return;
    }
    
    events.forEach(event => {
        const item = document.createElement('div');
        item.className = 'event-item';
        item.innerHTML = `
            <button class="delete-event-btn" data-id="${event.id}" title="Eliminar evento"><i class="fas fa-trash-alt"></i></button>
            <strong>${event.name}</strong>
            <div class="event-time"><i class="fas fa-clock"></i> ${event.time}</div>
            <div class="event-place"><i class="fas fa-map-marker-alt"></i> ${event.place}</div>
            ${event.note ? `<p class="event-note">${event.note}</p>` : ''}
        `;
        eventsList.appendChild(item);
    });
    
    document.querySelectorAll('.delete-event-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const eventId = e.currentTarget.getAttribute('data-id');
            deleteEvent(eventId);
        });
    });
}

async function deleteEvent(eventId) {
    if (!isAuthReady || !userId) {
        console.error("Auth not ready or userId missing. Cannot delete event.");
        return;
    }
    try {
        const docRef = doc(db, 'artifacts', appId, 'users', userId, 'events', eventId);
        await deleteDoc(docRef);
        console.log("Evento eliminado con ID:", eventId);
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
    }
}


addEventToggleBtn.addEventListener('click', () => {
    if (addEventToggleBtn.disabled) return;
    
    const isHidden = eventFormContainer.classList.contains('hidden');
    
    if (isHidden) {
        eventFormContainer.classList.remove('hidden');
        eventDateInput.value = formatDbDate(selectedDate);
        eventNameInput.focus();
    } else {
        eventFormContainer.classList.add('hidden');
        eventForm.reset(); 
    }
});

cancelFormBtn.addEventListener('click', () => {
    eventFormContainer.classList.add('hidden');
    eventForm.reset();
});

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!isAuthReady || !userId) {
        console.error("Auth not ready. Cannot save event.");
        return;
    }

    const newEvent = {
        date: eventDateInput.value, 
        name: eventNameInput.value.trim(),
        time: eventTimeInput.value,
        place: eventPlaceInput.value.trim(),
        note: eventNoteInput.value.trim(),
        createdAt: new Date().toISOString()
    };

    eventFormContainer.classList.add('hidden');
    eventForm.reset(); 

    try {
        const eventCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'events');
        await addDoc(eventCollectionRef, newEvent);
        console.log("Evento guardado exitosamente:", newEvent.name);
    } catch (error) {
        console.error("Error al guardar el evento en Firestore:", error);
    }
});

window.onload = initializeFirebaseAndAuth;