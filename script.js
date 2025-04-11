// نوار ناوبری هنگام اسکرول
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// تایمر
function updateCountdown() {
    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(now.getMonth() + 1);
    nextMonth.setDate(1);
    nextMonth.setHours(0, 0, 0, 0);
    
    const diff = nextMonth - now;
    
    const totalDays = Math.floor((nextMonth - new Date(now.getFullYear(), now.getMonth(), 1)) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.floor((now - new Date(now.getFullYear(), now.getMonth(), 1)) / (1000 * 60 * 60 * 24));
    const progress = (elapsedDays / totalDays) * 100;
    
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// سیستم کامنت
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;
    
    if (name && commentText) {
        const commentList = document.getElementById('comment-list');
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        const now = new Date();
        const dateStr = now.toLocaleDateString('fa-IR');
        
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${name}</span>
                <span class="comment-date">${dateStr}</span>
            </div>
            <p>${commentText}</p>
        `;
        
        commentList.prepend(commentDiv);
        
        // پاک کردن فرم
        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
        
        // نمایش پیام موفقیت
        alert('خاطره شما با موفقیت ثبت شد!');
    }
});

// افکت باران قلب
document.getElementById('surprise-btn').addEventListener('click', function() {
    createHearts();
    
    function createHearts() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = Math.random() > 0.7 ? 'دوستت دارم!' : '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // ایجاد قلب‌ها به مدت 10 ثانیه
    const heartInterval = setInterval(createHearts, 300);
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 10000);
    
    // پخش موسیقی
    const audio = new Audio('voice2.mp3');
    audio.play().catch(e => console.log("اتوماتیک پخش نشد"));
});

// لایت‌باکس ساده برای گالری
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const caption = this.querySelector('.gallery-caption').textContent;
        
        const lightbox = document.createElement('div');
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.display = 'flex';
        lightbox.style.flexDirection = 'column';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '2000';
        lightbox.style.cursor = 'pointer';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '80%';
        img.style.objectFit = 'contain';
        
        const cap = document.createElement('div');
        cap.textContent = caption;
        cap.style.color = 'white';
        cap.style.marginTop = '20px';
        cap.style.fontSize = '1.5rem';
        
        lightbox.appendChild(img);
        lightbox.appendChild(cap);
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});