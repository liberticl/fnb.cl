document.addEventListener('DOMContentLoaded', () => {
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLcZw_z16MPWbd-Fq1l13mBOcdadA4vvJpwtix9dsIrfyDbuspkFFbIMH27N20v-NE0yI_NPJ_a6zw/pub?gid=438947956&single=true&output=csv';

    const scheduleContainer = document.getElementById('schedule-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const btnHide = document.getElementById('btn-hide');
    let showAllEvents = false;

    loadingMessage.classList.remove('hidden');

    // Manejo del click del botón
    btnHide.addEventListener('click', () => {
        showAllEvents = !showAllEvents;

        if (showAllEvents) {
            btnHide.classList.remove('inactive');
            btnHide.classList.add('active');
            btnHide.textContent = 'Viendo todas las actividades';
        } else {
            btnHide.classList.remove('active');
            btnHide.classList.add('inactive');
            btnHide.textContent = 'Viendo en tiempo real';
        }

        fetchAndRenderSchedule();
    });

    const fetchAndRenderSchedule = () => {
        // Parseo del CSV
        Papa.parse(CSV_URL, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const scheduleData = results.data;

                if (results.errors.length > 0) {
                    console.error('Errores al parsear CSV:', results.errors);
                }

                if (!scheduleData || scheduleData.length === 0) {
                    scheduleContainer.innerHTML = '<p class="text-center text-xl text-[#212121]">Aún no hay eventos programados. ¡Vuelve pronto!</p>';
                    loadingMessage.classList.add('hidden');
                    return;
                }

                const dataMap = scheduleData.map(item => {
                    const date = item.hora.length < 6 ? new Date(`${item.fecha}T${item.hora}`) : new Date(`${item.fecha}T0${item.hora}`)
                    const datePlus15 = new Date(date.getTime() + (15 * 60 * 1000));
                    const today = new Date();
                    const logostr = item.logo || '';
                    const logoarr = logostr
                        .split('|')
                        .map(s => s.trim())
                        .filter(s => s.length > 0)

                    const ondate = showAllEvents || (datePlus15 >= today);

                    return {
                        ondate: ondate,
                        day: item.dia,
                        place: item.lugar,
                        time: item.hora,
                        speaker: item.expositor,
                        org: item.organizacion,
                        title: item.nombreExpo,
                        description: item.descripcion,
                        type: item.tipo,
                        logo: logoarr,
                        datetime: new Date(`${item.fecha}T${item.hora}`)
                    }
                }).filter(item => item.day);

                const sortedData = dataMap.sort((a, b) => {
                    return a.datetime.getTime() - b.datetime.getTime();
                })

                let htmlContent = '';
                let currentDay = '';
                let eventIndex = 0;

                // Generar el HTML
                sortedData.forEach(event => {
                    const day = event.day;

                    if (day && day !== currentDay) {
                        currentDay = day;
                        htmlContent += `<h2 id="current-day" class="text-2xl md:text-4xl font-bold text-[#4A45B0] mt-12 mb-6 text-center border-b-2 border-[#FFEA80] pb-2 ${event.ondate ? '' : 'hidden'}">${currentDay}</h2>`;
                    }

                    htmlContent += createEventCard(event, eventIndex);
                    eventIndex++;
                });

                scheduleContainer.innerHTML = htmlContent;
                setupCardToggles();
                loadingMessage.classList.add('hidden');
            },
            error: function (error) {
                console.error('Error al descargar el CSV:', error);
                scheduleContainer.innerHTML = '';
                errorMessage.classList.remove('hidden');
                loadingMessage.classList.add('hidden'); // Ocultar mensaje de carga en caso de error
            }
        });
    };

    const createEventCard = (event, index) => {
        if (!event.title) return '';

        const cardId = `event-card-${index}`;
        const descriptionId = `description-${index}`;
        const logoId0 = `logo-0-${index}`
        const logoId1 = `logo-1-${index}`
        const logoId2 = `logo-2-${index}`
        const logoId3 = `logo-3-${index}`
        const logoId4 = `logo-4-${index}`

        return `
            <div id="${cardId}" class="event-card bg-${event.type === 'cicletada' ? '[#4CAF5022]' : event.type === 'foro' ? '[#E567C722]' : event.type === 'noche' ? '[#FFEA8022]' : event.type === 'master' ? '[#6CB6FF22]' : 'white'} p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#4A45B0] mb-6 ${event.ondate ? '' : 'hidden'}">
                <div class="flex flex-col md:flex-row md:items-start">
                    <div class="md:w-1/4 mb-4 md:mb-0 cursor-pointer">
                        <p class="text-sm font-bold text-[#E567C7] uppercase">${event.day}</p>
                        <p class="text-m font-bold text-[#4CAF5088]">
                        <i class="fas fa-location-dot fa-lg" style="color: #4caf5088;"></i> ${event.place}</p>
                        <p class="text-3xl font-extrabold text-[#212121]">${event.time}</p>
                        <div class="flex flex-wrap justify-left items-center w-full">
                            <div class="p-2 w-1/2 md:w-1/4 lg:w-1/5 min-w-[120px] ${event.logo[0] ? '' : 'hidden'}">
                                <img id="${logoId0}" src="../imgs/programa/${event.logo[0]}.png" alt="Logo ${event.org}" class="h-32 object-contain mx-auto logo-0-content collapsed">
                            </div>

                            <div class="p-2 w-1/2 md:w-1/4 lg:w-1/5 min-w-[120px] ${event.logo[1] ? '' : 'hidden'}">
                                <img id="${logoId1}" src="../imgs/programa/${event.logo[1]}.png" alt="Logo ${event.org}" class="h-32 object-contain mx-auto logo-1-content collapsed">
                            </div>

                            <div class="p-2 w-1/2 md:w-1/4 lg:w-1/5 min-w-[120px] ${event.logo[2] ? '' : 'hidden'}">
                                <img id="${logoId2}" src="../imgs/programa/${event.logo[2]}.png" alt="Logo ${event.org}" class="h-32 object-contain mx-auto logo-2-content collapsed">
                            </div>

                            <div class="p-2 w-1/2 md:w-1/4 lg:w-1/5 min-w-[120px] ${event.logo[3] ? '' : 'hidden'}">
                                <img id="${logoId3}" src="../imgs/programa/${event.logo[3]}.png" alt="Logo ${event.org}" class="h-32 object-contain mx-auto logo-3-content collapsed">
                            </div>

                            <div class="p-2 w-full flex justify-center ${event.logo[4] ? '' : 'hidden'}">
                                <img id="${logoId4}" src="../imgs/programa/${event.logo[4]}.png" alt="Logo ${event.org}" class="h-32 object-contain mx-auto logo-4-content collapsed">
                            </div>
                        </div>
                    </div>
                    <div class="md:w-3/4">
                        <h3 class="text-2xl font-bold text-[#4A45B0] mb-0 cursor-pointer">${event.title}</h3>
                        <p class="text-xl font-semibold text-[#4CAF50] mb-0 cursor-pointer">${event.speaker}</p>
                        <p class="text-xl font-semibold text-[#4CAF50AA] mb-0 cursor-pointer">${event.org}</p>
                        <div id="${descriptionId}" class="description-content collapsed text-lg whitespace-pre-wrap">${event.description}</div>
                    </div>
                </div>
            </div>
        `;
    };

    const setupCardToggles = () => {
        document.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();

                const logo0 = card.querySelector('.logo-0-content');
                const logo1 = card.querySelector('.logo-1-content');
                const logo2 = card.querySelector('.logo-2-content');
                const logo3 = card.querySelector('.logo-3-content');
                const logo4 = card.querySelector('.logo-4-content');
                const description = card.querySelector('.description-content');

                if (description) {
                    logo0.classList.toggle('collapsed');
                    logo1.classList.toggle('collapsed');
                    logo2.classList.toggle('collapsed');
                    logo3.classList.toggle('collapsed');
                    logo4.classList.toggle('collapsed');
                    description.classList.toggle('collapsed');
                }
            });
        });
    };

    // Inicializar la carga de eventos
    fetchAndRenderSchedule();

});