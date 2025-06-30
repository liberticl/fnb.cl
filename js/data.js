export const timeline = [
    {
        year: '2021',
        title: 'Fundación y Red Virtual',
        description: 'Nace el 1er FNB de forma virtual, conectando activistas de Arica a Coyhaique en un momento de efervescencia social y constitucional.'
    },
    {
        year: '2022-2024',
        title: 'Pausa Estratégica y Reestructuración',
        description: 'Una pausa de tres años que no fue de inactividad, sino de "reparación y reestructuración". Este período de reflexión fortaleció a las organizaciones de la Mesa Nacional Ciclista.'
    },
    {
        year: '2025',
        title: 'Reactivación y Foco Presencial',
        description: 'El foro resurge con la necesidad imperiosa de la presencialidad para revitalizar la participación. Valparaíso es elegida como sede para llevar la acción a donde más se necesita.'
    }
];

export const commissions = [
    { name: 'Ética y Género', icon: '♀️♂️' },
    { name: 'Coordinación Local', icon: '⚛️' },
    { name: 'Programa', icon: '🗓️' },
    { name: 'Operaciones', icon: '🛠️' },
    { name: 'Comunicaciones', icon: '📢' }
];

export const impactData = {
    labels: ['Social', 'Ambiental', 'Economico', 'Politico'],
    datasets: [{
        label: 'Impacto del Foro',
        data: [1, 1, 1, 1],
        backgroundColor: ['#4CAF50', '#E567C7', '#FFEA80', '#4A45B0'],
        borderColor: '#F7F7F7',
        borderWidth: 4,
        hoverOffset: 16
    }]
};

export const impactInfo = {
    social: {
        title: 'Impacto Social',
        text: 'Mejora del bienestar comunitario, fomento de la participación ciudadana (incluyendo niños, niñas y adolescentes) y promoción de la salud pública.'
    },
    ambiental: {
        title: 'Impacto Ambiental',
        text: 'Contribución directa al desarrollo urbano sostenible, reducción de la huella de carbono y fomento de un transporte limpio y ecológico.'
    },
    economico: {
        title: 'Impacto Económico',
        text: 'Revitalización económica local a través del turismo, estímulo al turismo previo a la temporada alta y catalizador de nuevas inversiones en infraestructura.'
    },
    politico: {
        title: 'Políticas Públicas',
        text: 'Alineación con agendas de desarrollo, influencia directa en políticas públicas y fortalecimiento de la democracia participativa para mejores ciudades.'
    }
};