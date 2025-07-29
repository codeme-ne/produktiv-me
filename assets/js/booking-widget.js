// Smart Booking Widget für Coaching Sessions
class BookingWidget {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedDate = null;
        this.selectedTime = null;
        this.availableSlots = [];
        this.init();
    }
    
    init() {
        this.render();
        this.attachEventListeners();
        this.loadAvailableSlots();
    }
    
    render() {
        this.container.innerHTML = `
            <div class="booking-widget">
                <h3>Termin buchen</h3>
                <div class="booking-calendar">
                    <div id="calendar-container"></div>
                </div>
                <div class="booking-times" id="time-slots"></div>
                <div class="booking-form" id="booking-form" style="display: none;">
                    <input type="text" id="client-name" placeholder="Ihr Name" required>
                    <input type="email" id="client-email" placeholder="Ihre E-Mail" required>
                    <textarea id="booking-message" placeholder="Nachricht (optional)"></textarea>
                    <button id="submit-booking" class="btn-primary">Termin buchen</button>
                </div>
                <div class="booking-status" id="booking-status"></div>
            </div>
        `;
        
        this.renderCalendar();
    }
    
    renderCalendar() {
        // Vereinfachter Kalender
        const today = new Date();
        const calendar = document.getElementById('calendar-container');
        const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        
        let calendarHTML = '<div class="calendar-header">';
        days.forEach(day => {
            calendarHTML += `<div class="day-header">${day}</div>`;
        });
        calendarHTML += '</div><div class="calendar-days">';
        
        // Zeige die nächsten 30 Tage
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = date.getDay();
            
            if (i === 0) {
                // Füge leere Zellen für den Start hinzu
                for (let j = 0; j < dayOfWeek; j++) {
                    calendarHTML += '<div class="calendar-day empty"></div>';
                }
            }
            
            calendarHTML += `
                <div class="calendar-day available" data-date="${date.toISOString().split('T')[0]}">
                    ${date.getDate()}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }
    
    attachEventListeners() {
        // Kalender-Klicks
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('calendar-day') && e.target.classList.contains('available')) {
                this.selectDate(e.target.dataset.date);
            }
            
            if (e.target.classList.contains('time-slot')) {
                this.selectTime(e.target.dataset.time);
            }
        });
        
        // Formular-Submit
        const submitBtn = document.getElementById('submit-booking');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitBooking());
        }
    }
    
    selectDate(date) {
        // Entferne vorherige Auswahl
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Markiere ausgewähltes Datum
        const selectedEl = document.querySelector(`[data-date="${date}"]`);
        if (selectedEl) {
            selectedEl.classList.add('selected');
        }
        
        this.selectedDate = date;
        this.showTimeSlots(date);
    }
    
    showTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('time-slots');
        const slots = this.getAvailableSlotsForDate(date);
        
        let slotsHTML = '<h4>Verfügbare Zeiten:</h4><div class="time-slots-grid">';
        slots.forEach(slot => {
            slotsHTML += `
                <button class="time-slot" data-time="${slot}">
                    ${slot}
                </button>
            `;
        });
        slotsHTML += '</div>';
        
        timeSlotsContainer.innerHTML = slotsHTML;
    }
    
    selectTime(time) {
        // Entferne vorherige Auswahl
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Markiere ausgewählte Zeit
        const selectedEl = document.querySelector(`[data-time="${time}"]`);
        if (selectedEl) {
            selectedEl.classList.add('selected');
        }
        
        this.selectedTime = time;
        document.getElementById('booking-form').style.display = 'block';
    }
    
    getAvailableSlotsForDate(date) {
        // Simuliere verfügbare Zeitslots
        const baseSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
        const dayOfWeek = new Date(date).getDay();
        
        // Keine Termine am Wochenende
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return [];
        }
        
        // Zufällig einige Slots als belegt markieren
        return baseSlots.filter(() => Math.random() > 0.3);
    }
    
    async submitBooking() {
        const name = document.getElementById('client-name').value;
        const email = document.getElementById('client-email').value;
        const message = document.getElementById('booking-message').value;
        
        if (!name || !email || !this.selectedDate || !this.selectedTime) {
            this.showStatus('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }
        
        const bookingData = {
            date: this.selectedDate,
            time: this.selectedTime,
            name: name,
            email: email,
            message: message
        };
        
        try {
            // Simuliere API-Aufruf
            this.showStatus('Termin wird gebucht...', 'loading');
            
            // In echter Implementation würde hier ein API-Call stattfinden
            await this.simulateAPICall(bookingData);
            
            this.showStatus('Termin erfolgreich gebucht! Sie erhalten eine Bestätigung per E-Mail.', 'success');
            this.resetForm();
            
        } catch (error) {
            this.showStatus('Fehler bei der Buchung. Bitte versuchen Sie es erneut.', 'error');
        }
    }
    
    simulateAPICall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Booking data:', data);
                resolve();
            }, 1500);
        });
    }
    
    showStatus(message, type) {
        const statusEl = document.getElementById('booking-status');
        statusEl.className = `booking-status ${type}`;
        statusEl.textContent = message;
        statusEl.style.display = 'block';
        
        if (type !== 'loading') {
            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 5000);
        }
    }
    
    resetForm() {
        document.getElementById('client-name').value = '';
        document.getElementById('client-email').value = '';
        document.getElementById('booking-message').value = '';
        document.getElementById('booking-form').style.display = 'none';
        this.selectedDate = null;
        this.selectedTime = null;
        
        // Entferne Auswahlen
        document.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
    }
    
    loadAvailableSlots() {
        // Hier würden normalerweise die verfügbaren Slots vom Backend geladen
        console.log('Loading available slots...');
    }
}

// Initialisiere das Widget wenn DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('booking-widget-container')) {
        new BookingWidget('booking-widget-container');
    }
});