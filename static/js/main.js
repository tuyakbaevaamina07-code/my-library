// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // === 1. МОДАЛЬНОЕ ОКНО ===
    // Создаём модальное окно
    const modal = document.createElement('div');
    modal.id = 'bookingModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    modal.style.zIndex = '1000';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 24px; max-width: 400px; margin: 20px;">
            <h3>Забронировать книгу</h3>
            <form id="bookingForm">
                <input type="text" id="bookerName" placeholder="Ваше имя" required style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;">
                <input type="email" id="bookerEmail" placeholder="Ваш email" required style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;">
                <button type="submit" style="background: #0A3323; color: white; padding: 0.5rem 1rem; border: none; border-radius: 40px; cursor: pointer;">Подтвердить</button>
                <button type="button" id="closeModal" style="background: #D3968C; color: white; padding: 0.5rem 1rem; border: none; border-radius: 40px; cursor: pointer; margin-left: 1rem;">Отмена</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    // === 2. ОБРАБОТКА КНОПОК БРОНИРОВАНИЯ ===
    const bookButtons = document.querySelectorAll('.book-btn');
    let currentBook = null;
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentBook = this.getAttribute('data-book');
            modal.style.display = 'flex';
        });
    });
    
    // Закрытие модального окна
    document.getElementById('closeModal')?.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Обработка формы бронирования
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('bookerName').value;
            const email = document.getElementById('bookerEmail').value;
            
            if (name && email) {
                // Сохраняем в localStorage
                let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                bookings.push({
                    book: currentBook,
                    name: name,
                    email: email,
                    date: new Date().toLocaleString()
                });
                localStorage.setItem('bookings', JSON.stringify(bookings));
                
                // Меняем текст кнопки
                const button = document.querySelector(`.book-btn[data-book="${currentBook}"]`);
                if (button) {
                    button.textContent = 'Забронировано ✓';
                    button.disabled = true;
                    button.style.opacity = '0.6';
                }
                
                alert(`Книга "${currentBook}" забронирована!`);
                modal.style.display = 'none';
                bookingForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }
    
    // === 3. ВАЛИДАЦИЯ ФОРМЫ НА СТРАНИЦЕ КОНТАКТОВ ===
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let hasError = false;
            
            // Проверка имени
            if (!name.value.trim()) {
                alert('Пожалуйста, введите ваше имя');
                name.style.borderColor = '#D3968C';
                hasError = true;
            } else {
                name.style.borderColor = '#839958';
            }
            
            // Проверка email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailPattern.test(email.value)) {
                alert('Пожалуйста, введите корректный email');
                email.style.borderColor = '#D3968C';
                hasError = true;
            } else {
                email.style.borderColor = '#839958';
            }
            
            // Проверка сообщения
            if (!message.value.trim()) {
                alert('Пожалуйста, введите сообщение');
                message.style.borderColor = '#D3968C';
                hasError = true;
            } else {
                message.style.borderColor = '#839958';
            }
            
            if (!hasError) {
                alert('Сообщение отправлено! Спасибо за обратную связь.');
                contactForm.reset();
            }
        });
        
        // Убираем красную рамку при вводе
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }
    
    // === 4. ВОССТАНОВЛЕНИЕ СОСТОЯНИЯ КНОПОК ИЗ LOCALSTORAGE ===
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookButtons.forEach(button => {
        const bookTitle = button.getAttribute('data-book');
        const isBooked = savedBookings.some(booking => booking.book === bookTitle);
        if (isBooked) {
            button.textContent = 'Забронировано ✓';
            button.disabled = true;
            button.style.opacity = '0.6';
        }
    });
    
    // === 5. ПРИВЕТСТВИЕ ПРИ ЗАГРУЗКЕ ===
    console.log('Добро пожаловать в онлайн-библиотеку!');
    
    // Показываем количество забронированных книг
    if (savedBookings.length > 0) {
        console.log(`У вас ${savedBookings.length} забронированная(ых) книга(и)`);
    }
});