document.addEventListener('DOMContentLoaded', function () {
    const videoCarousel = document.getElementById('videoCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const videoIndicator = document.getElementById('videoIndicator');

    
    const videos = [
        { src: '../vid/video1.mp4', name: 'WORKSHOPS Y TALLERES...', description: 'Atréte a vivir una de nuestras experiencias, te aseguramos será única' },
        { src: '../vid/video2.mp4', name: 'CALIDAD INIGUALABLE...', description: 'Junto a profesionales en el tema aprende desde lo más básico hasta lo más complejo ' },
        { src: '../vid/video3.mp4', name: 'EXPERIENCIA FAMILIAR...', description: 'Comparte con nosotros y junto a tu familia y amigos nuestra pasión por la carne' },
        { src: '../vid/video4.mp4', name: 'AMPLIA TU CONOCIMIENTO...', description: 'Conoce los diferentes cortes de carne que manejamos' },
        { src: '../vid/video5.mp4', name: 'DISFRUTA...', description: 'Prueba y disfruta del corte de tu preferencia' },
        { src: '../vid/video6.mp4', name: 'SABOREA...', description: 'Te aseguramos que nuestros expertos te deleitaran ' },
        { src: '../vid/video7.mp4', name: 'OBSERVA...', description: 'Puedes observar cómo es que se elabora un buen corte' },
        { src: '../vid/video8.mp4', name: 'TE VAS A ENAMORAR...', description: 'Porque de la vista y el olfato nace el amor' },
        { src: '../vid/video9.mp4', name: 'CONOCE...', description: 'Nuestras mejores técnicas de cocina' },
        { src: '../vid/video10.MP4', name: 'PRUEBA...', description: 'Ese corte que tanto has soñado' },
        { src: '../vid/video11.mp4', name: 'MUCHO MÁS QUE SOLO SABOR...', description: 'Siempre un paso adelante que las texturas y sabores de siempre' },
        { src: '../vid/video12.mp4', name: 'NUESTRA PASIÓN', description: 'Porque nosotros tambien nacimos para la comida, en especial para la carne' },
        { src: '../vid/video13.mp4', name: '¿TE ESPERAMOS...?', description: 'Si aún estas dudando en visitarnos, aquí tienes una razón más para animarte' },
        { src: '../vid/video14.mp4', name: 'ELEGANCIA...', description: 'Uno de nuestros sellos además del sabor y calidad' },

        
    ];

    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');

        const videoElement = document.createElement('video');
        videoElement.src = video.src;
        videoElement.setAttribute('controls', true);

        const videoInfo = document.createElement('div');
        videoInfo.classList.add('video-info');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('video-title');
        titleElement.textContent = video.name;

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('video-description');
        descriptionElement.textContent = video.description;

        videoInfo.appendChild(titleElement);
        videoInfo.appendChild(descriptionElement);

        videoItem.appendChild(videoElement);
        videoItem.appendChild(videoInfo);

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
});

