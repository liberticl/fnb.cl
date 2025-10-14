document.addEventListener('DOMContentLoaded', () => {
    const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLcZw_z16MPWbd-Fq1l13mBOcdadA4vvJpwtix9dsIrfyDbuspkFFbIMH27N20v-NE0yI_NPJ_a6zw/pub?gid=438947956&single=true&output=csv';

    const scheduleContainer = document.getElementById('schedule-container');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    loadingMessage.classList.remove('hidden');

    const createEventCard = (event) => {
        if (!event.title) return '';

        return `
            <div class="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#4A45B0] mb-6">
                <div class="flex flex-col md:flex-row md:items-start">
                    <div class="md:w-1/4 mb-4 md:mb-0">
                        <p class="text-sm font-bold text-[#E567C7] uppercase">${event.day}</p>
                        <p class="text-3xl font-extrabold text-[#212121]">${event.time}</p>
                    </div>
                    <div class="md:w-3/4">
                        <h3 class="text-2xl font-bold text-[#4A45B0] mb-0">${event.title}</h3>
                        <p class="text-xl font-semibold text-[#4CAF50] mb-3">${event.speaker}</p>
                        <p class="text-lg whitespace-pre-wrap">${event.description}</p>
                    </div>
                </div>
            </div>
        `;
    };

    Papa.parse(CSV_URL, {
        download: true, // Descarga la URL
        header: true,   // Usar la primera fila como nombres de las propiedades
        skipEmptyLines: true, // Omitir filas vacías
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

            const dataMap = scheduleData.map(item => ({
                day: item.dia,
                time: item.hora,
                speaker: item.expositor,
                title: item.nombreExpo,
                description: item.descripcion
            })).filter(item => item.day);

            let htmlContent = '';
            let currentDay = '';

            // Generar el HTML
            dataMap.forEach(event => {
                const day = event.day;

                if (day && day !== currentDay) {
                    currentDay = day;
                    htmlContent += `<h2 class="text-2xl md:text-4xl font-bold text-[#4A45B0] mt-12 mb-6 text-center border-b-2 border-[#FFEA80] pb-2">${currentDay}</h2>`;
                }

                htmlContent += createEventCard(event);
            });

            scheduleContainer.innerHTML = htmlContent;
        },
        error: function (error) {
            console.error('Error al descargar el CSV:', error);
            scheduleContainer.innerHTML = '';
            errorMessage.classList.remove('hidden');
        }

    });

    setTimeout(() => {
        loadingMessage.classList.add('hidden');
    }, 1000);
});