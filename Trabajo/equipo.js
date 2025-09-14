const teamData = [
    {
        id: 1,
        name: "Andres Vargas",
        role: "Directora Creativo",
        description: "Experto en diseño con más de 8 años de experiencia creando experiencias visuales impactantes.",
        skills: ["Diseño UI/UX", "Branding", "Photoshop", "Figma"],
        email: "andres.vargas@campusucc.edu.co",
        phone: "+57 321 5775552",
        avatar: "AV",
        details: "Andres lidera nuestro equipo creativo con una visión innovadora y un enfoque centrado en el usuario. Ha trabajado con marcas reconocidas internacionalmente y ha ganado varios premios de diseño."
    },
    {
        id: 2,
        name: "Jose Bobadilla",
        role: "Desarrollador Full Stack",
        description: "Desarrollador apasionado especializado en tecnologías web modernas y arquitecturas escalables.",
        skills: ["React", "Node.js", "Python", "AWS"],
        email: "jose.bobadilla@campusucc.edu.co",
        phone: "+57 316 8817552",
        avatar: "JB",
        details: "Jose es nuestro experto técnico con una sólida experiencia en desarrollo de aplicaciones complejas. Su expertise abarca desde frontend hasta infraestructura en la nube."
    },
    {
        id: 3,
        name: "Esteban Idarraga",
        role: "Especialista en Marketing",
        description: "Estratega digital con experiencia en campañas exitosas y crecimiento de marcas online.",
        skills: ["SEO", "Marketing Digital", "Analytics", "Content Strategy"],
        email: "esteban.idarraga@campusucc.edu.co",
        phone: "+57 305 3294724",
        avatar: "EI",
        details: "Esteban ha ayudado a más de 50 empresas a aumentar su presencia digital. Su enfoque data-driven ha generado resultados excepcionales para nuestros clientes."
    },
    {
        id: 4,
        name: "Miguel Yanez",
        role: "Project Manager",
        description: "Líder de proyectos con metodologías ágiles y enfoque en la entrega de resultados de calidad.",
        skills: ["Scrum", "Jira", "Gestión de Equipos", "Lean"],
        email: "miguel.yanez@campusucc.edu.co",
        phone: "+57 300 2408784",
        avatar: "MY",
        details: "Miguel coordina todos nuestros proyectos asegurando que se entreguen a tiempo y superen las expectativas del cliente. Su experiencia en metodologías ágiles es invaluable."
    }
];


function generateTeamCards() {
    const teamGrid = document.getElementById('teamGrid');
    
    
    teamGrid.innerHTML = '';
    
    teamData.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.onclick = () => openModal(member);
        
        card.innerHTML = `
            <div class="avatar">
                ${member.avatar}
            </div>
            <div class="name">${member.name}</div>
            <div class="role">${member.role}</div>
            <div class="description">${member.description}</div>
            <div class="skills">
                ${member.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
            <div class="contact-info">
                <a href="mailto:${member.email}" class="contact-btn" onclick="event.stopPropagation()">Email</a>
                <a href="tel:${member.phone}" class="contact-btn" onclick="event.stopPropagation()">Llamar</a>
            </div>
        `;
        
        teamGrid.appendChild(card);
    });
}


function openModal(member) {
    const modal = document.getElementById('teamModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div style="text-align: center;">
            <div class="avatar" style="margin: 0 auto 20px;">
                ${member.avatar}
            </div>
            <h2 style="color: #333; margin-bottom: 10px;">${member.name}</h2>
            <p style="color: #667eea; font-weight: 600; font-size: 1.1rem; margin-bottom: 20px;">${member.role}</p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">${member.details}</p>
            <div class="skills" style="margin-bottom: 20px;">
                ${member.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
            <div class="contact-info">
                <a href="mailto:${member.email}" class="contact-btn">Enviar Email</a>
                <a href="tel:${member.phone}" class="contact-btn">Llamar</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    const modal = document.getElementById('teamModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        
        window.location.href = 'index.html'; 
    }
    
    
}


function handleOutsideClick(event) {
    const modal = document.getElementById('teamModal');
    if (event.target === modal) {
        closeModal();
    }
}


function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    generateTeamCards();
    
    
    window.addEventListener('click', handleOutsideClick);
    
    
    document.addEventListener('keydown', handleEscapeKey);
});


function animateCards() {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}


function filterByRole(role) {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        const cardRole = card.querySelector('.role').textContent;
        if (role === 'all' || cardRole.toLowerCase().includes(role.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


function searchMembers(searchTerm) {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        const role = card.querySelector('.role').textContent.toLowerCase();
        const description = card.querySelector('.description').textContent.toLowerCase();
        
        if (name.includes(searchTerm.toLowerCase()) || 
            role.includes(searchTerm.toLowerCase()) || 
            description.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}