import { timeline, commissions, impactData, impactInfo } from './data.js';
import { organizations } from './orgas.js';
import { donations, empresas } from './colaboraciones.js'

document.addEventListener('DOMContentLoaded', function () {

    const timelineContainer = document.getElementById('timeline');
    timeline.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item relative pb-8';
        div.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="ml-10">
                        <h4 class="font-bold text-xl text-[#4A45B0]">${item.year}: ${item.title}</h4>
                        <p class="text-gray-600 text-lg mt-1">${item.description}</p>
                    </div>
                `;
        timelineContainer.appendChild(div);
    });

    const commissionsGrid = document.getElementById('commissions-grid');
    commissions.forEach(commission => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-xl shadow-md text-center';
        div.innerHTML = `
                    <span class="text-4xl">${commission.icon}</span>
                    <h4 class="font-bold text-lg mt-3 text-[#4A45B0]">${commission.name}</h4>
                `;
        commissionsGrid.appendChild(div);
    });

    const organizationsGrid = document.getElementById('organizations-grid');
    organizations.forEach(org => {
        const div = document.createElement('div');
        div.className = 'bg-white p-3 rounded-lg shadow-md text-center flex flex-col items-center justify-center';
        div.innerHTML = `
                    <a href="${org.url}" target="_blank" class="flex flex-col items-center text-center">
                        <img src="${org.logo}" alt="Logo ${org.name}" class="h-16 w-16 object-contain mb-2 rounded-full">
                        <h4 class="font text-lg text-[#4A45B0]">${org.name}</h4>
                        <p class="font text-sm text-[#4A45B0]">${org.city}</p>
                    </a>
                `;
        organizationsGrid.appendChild(div);
    });


    const ctx = document.getElementById('impactChart').getContext('2d');
    const impactChart = new Chart(ctx, {
        type: 'doughnut',
        data: impactData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            onHover: (event, chartElement) => {
                const canvas = event.native.target;
                canvas.style.cursor = chartElement[0] ? 'pointer' : 'default';

                const impactTitle = document.getElementById('impact-title');
                const impactText = document.getElementById('impact-text');

                if (chartElement.length) {
                    const index = chartElement[0].index;
                    const key = impactData.labels[index].toLowerCase();
                    const info = impactInfo[key];
                    impactTitle.textContent = info.title;
                    impactText.textContent = info.text;
                } else {
                    impactTitle.textContent = 'Pase el cursor sobre el gráfico';
                    impactText.textContent = 'para descubrir los detalles de nuestro impacto.';
                }
            }
        }
    });

    /* Donaciones recibidas de personas */
    const donaGrid = document.getElementById('donations-grid');
    donations.forEach(person => {
        const tr = document.createElement('tr');
        tr.className = 'border-b';
        tr.innerHTML = `
                    <td class="p-3 font-semibold">${person.method}</td>
                    <td class="p-3">${person.name}</td>
                `;
        donaGrid.appendChild(tr);
    });

    /* Aportes de empresas */
    const empresaGrid = document.getElementById('empresas-grid');
    empresas.forEach(ent => {
        const div = document.createElement('div');
        div.className = 'bg-white p-3 rounded-lg shadow-md text-center flex flex-col items-center justify-center';
        div.innerHTML = `
                    <a href="${ent.url}" target="_blank" class="flex flex-col items-center text-center">
                        <img src="${ent.logo}" alt="Logo ${ent.name}" class="h-16 w-16 object-contain mb-2 rounded-full">
                        <h4 class="font text-lg text-[#4A45B0]">${ent.name}</h4>
                        <p class="font text-sm text-[#4A45B0]">${ent.method}</p>
                    </a>
                `;
        empresaGrid.appendChild(div);
    });

    /* Para el bloque de colaboradores actuales */
    const btnEmpresasActual = document.getElementById('btn-empresas-act');
    const btnPoliticosActual = document.getElementById('btn-politicos-act');
    const btnPersonasActual = document.getElementById('btn-personas-act');
    const contEmpresas = document.getElementById('cont-empresas');
    const contPoliticos = document.getElementById('cont-politicos');
    const contPersonas = document.getElementById('cont-personas');

    btnEmpresasActual.addEventListener('click', () => {
        btnEmpresasActual.classList.add('active');
        btnPoliticosActual.classList.add('inactive');
        btnPersonasActual.classList.add('inactive');

        btnEmpresasActual.classList.remove('inactive');
        btnPoliticosActual.classList.remove('active');
        btnPersonasActual.classList.remove('active');

        contEmpresas.classList.remove('hidden');
        contPoliticos.classList.add('hidden');
        contPersonas.classList.add('hidden')
    });

    btnPoliticosActual.addEventListener('click', () => {
        btnEmpresasActual.classList.add('inactive');
        btnPoliticosActual.classList.add('active');
        btnPersonasActual.classList.add('inactive');

        btnEmpresasActual.classList.remove('active');
        btnPoliticosActual.classList.remove('inactive');
        btnPersonasActual.classList.remove('active');

        contEmpresas.classList.add('hidden');
        contPoliticos.classList.remove('hidden');
        contPersonas.classList.add('hidden')
    });

    btnPersonasActual.addEventListener('click', () => {
        btnEmpresasActual.classList.add('inactive');
        btnPoliticosActual.classList.add('inactive');
        btnPersonasActual.classList.add('active');

        btnEmpresasActual.classList.remove('active');
        btnPoliticosActual.classList.remove('active');
        btnPersonasActual.classList.remove('inactive');

        contEmpresas.classList.add('hidden');
        contPoliticos.classList.add('hidden');
        contPersonas.classList.remove('hidden')
    });


    /* Para el bloque únete */
    const btnEmpresas = document.getElementById('btn-empresas');
    const btnPoliticos = document.getElementById('btn-politicos');
    const contentEmpresas = document.getElementById('content-empresas');
    const contentPoliticos = document.getElementById('content-politicos');

    btnEmpresas.addEventListener('click', () => {
        btnEmpresas.classList.add('active');
        btnEmpresas.classList.remove('inactive');
        btnPoliticos.classList.add('inactive');
        btnPoliticos.classList.remove('active');
        contentEmpresas.classList.remove('hidden');
        contentPoliticos.classList.add('hidden');
    });

    btnPoliticos.addEventListener('click', () => {
        btnPoliticos.classList.add('active');
        btnPoliticos.classList.remove('inactive');
        btnEmpresas.classList.add('inactive');
        btnEmpresas.classList.remove('active');
        contentPoliticos.classList.remove('hidden');
        contentEmpresas.classList.add('hidden');
    });

    // const toggleAvenidaBtn = document.getElementById('toggleAvenida');
    // const avenidaAfter = document.getElementById('avenida-after');
    // let isAvenidaImproved = false;

    // toggleAvenidaBtn.addEventListener('click', () => {
    //     isAvenidaImproved = !isAvenidaImproved;
    //     if (isAvenidaImproved) {
    //         avenidaAfter.style.opacity = '1';
    //         toggleAvenidaBtn.textContent = 'Ver Estado Actual';
    //     } else {
    //         avenidaAfter.style.opacity = '0';
    //         toggleAvenidaBtn.textContent = 'Ver Propuesta de Mejora';
    //     }
    // });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            link.classList.add('inactive-nav');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active-nav');
                link.classList.remove('inactive-nav');
            }
        });
    });
});