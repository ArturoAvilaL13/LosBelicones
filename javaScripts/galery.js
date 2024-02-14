document.addEventListener('DOMContentLoaded', function () {
    const videoCarousel = document.getElementById('videoCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const videoIndicator = document.getElementById('videoIndicator');
    const videoCounter = document.getElementById('videoCounter'); // Agregado

    const videos = [
       /* { src: 'https://www.youtube.com/embed/TIZUOwIDsms?si=KryCHeGqeuNUd3JP', title: 'Chilaquiles de Diezmillo Especiales - Chefsita Andy', description: 'En este su primer receta en video, Chefsita Andy nos enseña una deliciosa versión de los chilaquiles verdes, con Diezmillo de Meet Meat y un toque especial para niños.' },*/
       { src: 'https://www.youtube.com/embed/JOYZDTpn4bg?si=W-bDq4m9f7YH780C', title: 'Somos Meet Meat', description: 'Esto y mucho más es Meet Meat' },
       { src: 'https://www.youtube.com/embed/TIZUOwIDsms?si=KryCHeGqeuNUd3JP', title: 'Chilaquiles de Diezmillo Especiales - Chefsita Andy', description: 'En este su primer receta en video, Chefsita Andy nos enseña una deliciosa versión de los chilaquiles verdes, con Diezmillo de Meet Meat y un toque especial para niños.' },
        
    ];

    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoElement = document.createElement('iframe');
        videoElement.src = video.src;
        videoElement.width = 745;//560
        videoElement.height = 421;//315
        videoElement.title = 'YouTube video player';
        videoElement.frameborder = 0;
        videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        videoElement.allowfullscreen = true;

        videoItem.appendChild(videoElement);

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('video-title');
        titleElement.textContent = video.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('video-description');
        descriptionElement.textContent = video.description;

        descriptionContainer.appendChild(titleElement);
        descriptionContainer.appendChild(descriptionElement);
        videoItem.appendChild(descriptionContainer);

        videoCarousel.appendChild(videoItem);

        const indicatorBar = document.createElement('div');
        indicatorBar.classList.add('video-indicator-bar');
        indicatorBar.setAttribute('data-index', index);
        videoIndicator.appendChild(indicatorBar);
    });

    let currentIndex = 0;

    prevButton.addEventListener('click', function () {
        changeVideo('prev');
    });

    nextButton.addEventListener('click', function () {
        changeVideo('next');
    });

    function changeVideo(direction) {
        const videoWidth = document.querySelector('.video-item').offsetWidth;
        const maxIndex = videos.length - 1;

        if (direction === 'next') {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        } else if (direction === 'prev') {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        }

        videoCarousel.style.transform = `translateX(-${currentIndex * (videoWidth + 20)}px)`;

        updateIndicator();
        updateVideoCounter();
    }

    function updateIndicator() {
        const indicatorBars = document.querySelectorAll('.video-indicator-bar');
        indicatorBars.forEach((bar, index) => {
            if (index === currentIndex) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });
    }

    function updateVideoCounter() {
        videoCounter.textContent = `${currentIndex + 1} / ${videos.length}`;
    }
});

$(document).ready(function() {
    // Inicializar el calendario
    $('#calendario').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [
            {
                title: 'Feria de Carne',
                start: '2024-02-02T10:00:00', // Agrega la hora de inicio
                end: '2024-02-02T12:00:00',   // Agrega la hora de finalización
                description: '<h2>Feria de Carne</h2><p>Conoce todos nuestros cortes de carne</p><p>Hora de inicio: 10:00 AM</p><p>Hora de finalización: 12:00 PM</p><img src="../img/6picania.jpg" alt="Evento 1">'
            },
            {
                title: 'Evento 2',
                start: '2024-01-10T14:30:00',
                end: '2024-01-10T16:30:00',
                description: '<h2>Evento 2</h2><p>Información detallada del Evento 2</p><p>Hora de inicio: 2:30 PM</p><p>Hora de finalización: 4:30 PM</p><img src="imagen_evento2.jpg" alt="Evento 2">'
            },
            // Agrega más eventos según sea necesario
        ],
        eventClick: function(calEvent, jsEvent, view) {
            // Mostrar información del evento en la misma página
            $('#evento-info').html(calEvent.description).show();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const videoCarousel = document.getElementById('videoCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    const videos = [
        { src: 'https://www.youtube.com/embed/TIZUOwIDsms?si=KryCHeGqeuNUd3JP', title: 'Chilaquiles de Diezmillo Especiales - Chefsita Andy', description: 'En este su primer receta en video, Chefsita Andy nos enseña una deliciosa versión de los chilaquiles verdes, con Diezmillo de Meet Meat y un toque especial para niños.' },
        { src: 'https://www.youtube.com/embed/JOYZDTpn4bg?si=W-bDq4m9f7YH780C', title: 'Somos Meet Meat', description: 'Esto y mucho más es Meet Meat' },
    ];

    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoElement = document.createElement('iframe');
        videoElement.src = video.src;
        videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        videoElement.allowfullscreen = true;

        videoItem.appendChild(videoElement);
        videoCarousel.appendChild(videoItem);
    });

    let currentIndex = 0;

    prevButton.addEventListener('click', function () {
        changeVideo('prev');
    });

    nextButton.addEventListener('click', function () {
        changeVideo('next');
    });

    function changeVideo(direction) {
        const maxIndex = videos.length - 1;

        if (direction === 'next') {
            currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        } else if (direction === 'prev') {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        }

        const videoWidth = videoCarousel.offsetWidth;
        videoCarousel.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
    }
});