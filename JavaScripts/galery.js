document.addEventListener('DOMContentLoaded', function () {
    const videoCarousel = document.getElementById('videoCarousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const videoIndicator = document.getElementById('videoIndicator');
    const videoCounter = document.getElementById('videoCounter'); // Agregado

    const videos = [
       /* { src: 'https://www.youtube.com/embed/TIZUOwIDsms?si=KryCHeGqeuNUd3JP', title: 'Chilaquiles de Diezmillo Especiales - Chefsita Andy', description: 'En este su primer receta en video, Chefsita Andy nos enseña una deliciosa versión de los chilaquiles verdes, con Diezmillo de Meet Meat y un toque especial para niños.' },*/
          { src: 'https://www.youtube.com/embed/TIZUOwIDsms?si=KryCHeGqeuNUd3JP', title: 'Chilaquiles de Diezmillo Especiales - Chefsita Andy', description: 'En este su primer receta en video, Chefsita Andy nos enseña una deliciosa versión de los chilaquiles verdes, con Diezmillo de Meet Meat y un toque especial para niños.' },
          { src: 'https://www.youtube.com/embed/JOYZDTpn4bg?si=W-bDq4m9f7YH780C', title: 'Somos Meet Meat', description: 'Esto y mucho más es Meet Meat' },
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