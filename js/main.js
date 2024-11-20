document.addEventListener('DOMContentLoaded', () => {

    var phoneNumber = '+503 60049978 '; // Reemplaza con el número de teléfono
    var message = 'Hola, un gusto saludarte. me gustaria agendar mi sesion navideña'; // Mensaje predeterminado
    var url = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent(message);
    document.getElementById('whatsapp-button').href = url;

    let navLinks = document.querySelectorAll('#navbar-link');
    navLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('navbar-link-active'));
            item.classList.add('navbar-link-active');
        });
    });

    let sections = document.querySelectorAll('[id^="section"]');
    console.log(sections)
    function checkSectionInView() {
        let midpoint = window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionRect = section.getBoundingClientRect();

            // Check if the section is in the middle of the viewport
            if (sectionRect.top <= midpoint && sectionRect.bottom >= midpoint) {
                // Remove active class from all navbar links
                navLinks.forEach(link => link.classList.remove('navbar-link-active'));
                // Add active class to the corresponding navbar link
                navLinks[index].classList.add('navbar-link-active');
            }
        });
    }

    // Event listener for scroll
    window.addEventListener('scroll', checkSectionInView);

    // Initial check when page loads
    checkSectionInView();

    // Script de la galería de imagenes
    const getImages = container => [...container.querySelectorAll('img')]
    const getLargeImages = gallery => gallery.map(el => el.src).map(el => el.replace('thumb', 'big'))


    const openLightboxEvent = (container, gallery, larges) => {
        container.addEventListener('click', e => {
            let el = e.target,
                i = gallery.indexOf(el)

            if (el.tagName == 'IMG') {
                openLightbox(gallery, i, larges)
            }

        })
    }

    const openLightbox = (gallery, i, larges) => {
        let lightboxElement = document.createElement('div')
        lightboxElement.innerHTML = `
        <div class="lightbox-overlay">
        <div class="close-modal"><i class="zmdi zmdi-close"></i></div>
            <figure class="lightbox-container">
                <img src="${larges[i]}" class="lightbox-image">
                <figcaption>
                <nav class="navigation">
                <a href="#" class="lightbox-navigation prev"><i class="zmdi zmdi-chevron-left"></i></i></a>
                <a href="#" class="lightbox-navigation next"><i class="zmdi zmdi-chevron-right"></i></a>
                </nav>
                </figcaption>
            </figure>
        </div>
        `

        lightboxElement.id = 'lightbox'
        document.body.appendChild(lightboxElement)
        closeModal(lightboxElement)
        navigateLightbox(lightboxElement, i, larges)

    }

    const closeModal = modalElement => {
        let closeModal = modalElement.querySelector('.close-modal')
        closeModal.addEventListener('click', e => {
            e.preventDefault()
            document.body.removeChild(modalElement)
        })
    }

    const navigateLightbox = (lightboxElement, i, larges) => {
        let prevButton = lightboxElement.querySelector('.prev'),
            nextButton = lightboxElement.querySelector('.next'),
            image = lightboxElement.querySelector('img'),
            closeButton = lightboxElement.querySelector('.close-modal')

        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight') {
                nextButton.click()
            }
            if (e.key === 'ArrowLeft') {
                prevButton.click()
            }
            if (e.key === 'Escape') {
                closeButton.click()
            }
        })

        lightboxElement.addEventListener('click', e => {
            e.preventDefault()
            let target = e.target
            if (target === prevButton) {
                if (i > 0) {
                    image.src = larges[i - 1]
                    i--
                } else {
                    image.src = larges[larges.length - 1]
                    i = larges.length - 1
                }
            } else if (target === nextButton) {
                if (i < larges.length - 1) {
                    image.src = larges[i + 1]
                    i++
                } else {
                    image.src = larges[0]
                    i = 0
                }
            }
        })
    }

    const lightbox = container => {
        let images = getImages(container),
            larges = getLargeImages(images)
        openLightboxEvent(container, images, larges)
    }
    lightbox(document.getElementById('gallery-container'))

    //smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 1000
    });

})

// script del menu responsive
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })

        nav.addEventListener('click', e => {
            let el = e.target
            if (el.tagName == 'A') {
                nav.classList.toggle('show')
            }
        })

    }

}

showMenu('navbar-menu-mobile', 'navbar-container')


