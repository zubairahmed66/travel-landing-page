document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    // 01 # Header Area
    const zaHeader = document.getElementById('za-HeaderArea');
    const zaPrimaryNav = document.getElementById('za-HeaderMenuList');
    const zaBurgerBtn = document.getElementById('za-TriggerBurger');
    const zaMobilePanel = document.getElementById('za-MobilePanel');
    const zaPanelBody = document.getElementById('za-PanelBody');
    const zaBackdrop = document.getElementById('za-PanelBackdrop');
    const zaPanelClose = document.getElementById('za-PanelClose');

    if (zaPrimaryNav && zaPanelBody) {
        const clonedNav = zaPrimaryNav.cloneNode(true);
        clonedNav.id = 'za-MobileNavList';
        zaPanelBody.appendChild(clonedNav);

        const originalActions = document.querySelector('.za-navbar-actions');
        if (originalActions) {
            const clonedActions = originalActions.cloneNode(true);
            clonedActions.classList.remove('za-navbar-actions');
            clonedActions.classList.add('za-drawer-actions-container');
            zaPanelBody.appendChild(clonedActions);
        }
    }

    function openDrawer() {
        zaMobilePanel.classList.add('za-panel-open');
        zaBackdrop.classList.add('za-backdrop-visible');
        zaBurgerBtn.setAttribute('aria-expanded', 'true');
        zaMobilePanel.focus();
    }

    function closeDrawer() {
        zaMobilePanel.classList.remove('za-panel-open');
        zaBackdrop.classList.remove('za-backdrop-visible');
        zaBurgerBtn.setAttribute('aria-expanded', 'false');
    }

    zaBurgerBtn.addEventListener('click', function () {
        zaMobilePanel.classList.contains('za-panel-open') ? closeDrawer() : openDrawer();
    });
    zaPanelClose.addEventListener('click', closeDrawer);
    zaBackdrop.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && zaMobilePanel.classList.contains('za-panel-open')) {
            closeDrawer();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992 && zaMobilePanel.classList.contains('za-panel-open')) {
            closeDrawer();
        }
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            zaHeader.classList.add('za-sticky-active');
        } else {
            zaHeader.classList.remove('za-sticky-active');
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('za-btn')) {
            const allActionBtns = document.querySelectorAll('.za-btn');
            allActionBtns.forEach(btn => btn.classList.remove('za-active'));
            e.target.classList.add('za-active');
        }
    });

    // Main Menu 
    const menuItems = document.querySelectorAll('.za-header-menu-link');

    menuItems.forEach(item => {

        item.addEventListener('click', function () {
            menuItems.forEach(menu => {
                menu.classList.remove('za-header-menu-active');
            });

            this.classList.add('za-header-menu-active');

        });

    });

    // 02 # Hero Area
    const dateInput = document.getElementById('za-date-input');
    const calendar = document.getElementById('za-calendar');
    const calendarTitle = document.getElementById('za-calendar-title');
    const calendarDays = document.getElementById('za-calendar-days');
    const previousButton = document.getElementById('za-calendar-prev');
    const nextButton = document.getElementById('za-calendar-next');

    if (
        dateInput &&
        calendar &&
        calendarTitle &&
        calendarDays &&
        previousButton &&
        nextButton
    ) {


        let currentDate = new Date();
        let selectedDate = null;
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        function renderCalendar() {

            const year = currentDate.getFullYear();

            const month = currentDate.getMonth();

            calendarTitle.textContent =
                `${monthNames[month]} ${year}`;

            const firstDay =
                new Date(year, month, 1).getDay();

            const totalDays =
                new Date(year, month + 1, 0).getDate();
            const previousMonthTotalDays =
                new Date(year, month, 0).getDate();

            calendarDays.innerHTML = '';
            for (
                let i = firstDay - 1; i >= 0; i--
            ) {
                const day =
                    previousMonthTotalDays - i;
                const button =
                    document.createElement('button');
                button.type = 'button';
                button.className =
                    'za-calendar-day other-month';
                button.textContent = day;
                calendarDays.appendChild(button);
            }

            for (
                let day = 1; day <= totalDays; day++
            ) {
                const button =
                    document.createElement('button');
                button.type = 'button';
                button.className =
                    'za-calendar-day';
                button.textContent = day;
                const today = new Date();
                const isToday =
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();
                if (isToday) {
                    button.classList.add('today');
                }

                if (selectedDate) {

                    const isSelected =
                        day === selectedDate.getDate() &&
                        month === selectedDate.getMonth() &&
                        year === selectedDate.getFullYear();

                    if (isSelected) {
                        button.classList.add('selected');
                    }
                }


                button.addEventListener('click', () => {
                    selectedDate =
                        new Date(year, month, day);

                    const formattedDate =
                        selectedDate.toLocaleDateString(
                            'en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }
                        );

                    dateInput.value = formattedDate;

                    calendar.classList.remove('is-open');
                    renderCalendar();
                });
                calendarDays.appendChild(button);
            }
        }

        dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            calendar.classList.toggle('is-open');
            renderCalendar();
        });

        previousButton.addEventListener('click', (event) => {

            event.stopPropagation();
            currentDate.setMonth(
                currentDate.getMonth() - 1
            );
            renderCalendar();
        });
        nextButton.addEventListener('click', (event) => {

            event.stopPropagation();
            currentDate.setMonth(
                currentDate.getMonth() + 1
            );
            renderCalendar();
        });
        calendar.addEventListener('click', (event) => {

            event.stopPropagation();
        });
        document.addEventListener('click', () => {

            calendar.classList.remove('is-open');
        });
        renderCalendar();

    }

    //--- Image Slider
    const zaActivityCards = document.querySelectorAll(".za-activity-card");
    const zaHeroSwiper = new Swiper(".za-image-swiper", {
        direction: "vertical",
        slidesPerView: 1,
        speed: 700,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        mousewheel: {
            forceToAxis: true
        },
        keyboard: {
            enabled: true
        },
        on: {
            init: function () {
                zaUpdateActivity(this.activeIndex);
            },

            slideChange: function () {
                zaUpdateActivity(this.activeIndex);
            }
        }
    });

    zaActivityCards.forEach((card) => {
        card.addEventListener("click", function () {
            const zaSlideIndex = Number(this.dataset.slide);
            zaHeroSwiper.slideTo(zaSlideIndex);
        });

    });


    function zaUpdateActivity(activeIndex) {
        zaActivityCards.forEach((card) => {
            const zaCardIndex = Number(card.dataset.slide);
            if (zaCardIndex === activeIndex) {
                card.classList.add("za-active");
            } else {
                card.classList.remove("za-active");
            }
        });
    }
});