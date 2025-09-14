// Configuración de la API
const API_BASE_URL = 'http://localhost:4000/api';

// Estado global de la aplicación
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';
let isLoading = false;

// Elementos del DOM
const blogsContainer = document.getElementById('blogs-container');
const paginationContainer = document.getElementById('pagination-container');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const loadingSpinner = document.getElementById('loading-spinner');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando blog público...');
    
    // Cargar blogs iniciales
    loadBlogs();
    
    // Configurar eventos
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Filtro de categoría
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentCategory = this.value;
            currentPage = 1;
            loadBlogs();
        });
    }
    
    // Búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            currentSearch = this.value;
            currentPage = 1;
            loadBlogs();
        }, 500));
    }
}

// Función para cargar blogs
async function loadBlogs() {
    if (isLoading) return;
    
    isLoading = true;
    showLoading(true);
    
    try {
        console.log('📡 Cargando blogs...', {
            page: currentPage,
            category: currentCategory,
            search: currentSearch
        });
        
        // Construir URL con parámetros
        const params = new URLSearchParams({
            page: currentPage,
            limit: 9,
            category: currentCategory,
            search: currentSearch
        });
        
        const response = await fetch(`${API_BASE_URL}/blog/public?${params}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Blogs cargados exitosamente:', data.blogs.length);
            renderBlogs(data.blogs);
            renderPagination(data.paginacion);
        } else {
            throw new Error(data.mensaje || 'Error al cargar blogs');
        }
        
    } catch (error) {
        console.error('❌ Error al cargar blogs:', error);
        showError('Error al cargar los blogs. Por favor, intenta de nuevo.');
    } finally {
        isLoading = false;
        showLoading(false);
    }
}

// Renderizar blogs en el DOM
function renderBlogs(blogs) {
    if (!blogsContainer) {
        console.error('❌ Contenedor de blogs no encontrado');
        return;
    }
    
    if (blogs.length === 0) {
        blogsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-info">
                    <h4>No se encontraron blogs</h4>
                    <p>No hay blogs disponibles en este momento.</p>
                </div>
            </div>
        `;
        return;
    }
    
    const blogsHTML = blogs.map((blog, index) => {
        const delay = (index % 3) * 100; // Para animaciones escalonadas
        const imageUrl = blog.imagenPrincipal?.url || 'images/img_4.jpg';
        const authorName = blog.autor ? `${blog.autor.prim_nom} ${blog.autor.apell_pa}` : 'Autor';
        const publishDate = formatDate(blog.fechaPublicacion || blog.createdAt);
        const excerpt = blog.resumen || truncateText(blog.contenido, 150);
        
        return `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
                <a href="blog-detail.html?id=${blog._id}">
                    <img src="${imageUrl}" alt="${blog.titulo}" class="img-fluid">
                </a>
                <div class="p-4 bg-white">
                    <span class="d-block text-secondary small text-uppercase">${publishDate}</span>
                    <h2 class="h5 text-black mb-3">
                        <a href="blog-detail.html?id=${blog._id}">${blog.titulo}</a>
                    </h2>
                    <p>${excerpt}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <small class="text-muted">Por ${authorName}</small>
                        <span class="badge badge-primary">${blog.categoria}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    blogsContainer.innerHTML = blogsHTML;
}

// Renderizar paginación
function renderPagination(pagination) {
    if (!paginationContainer) return;
    
    const { paginaActual, totalPaginas, tieneSiguiente, tieneAnterior } = pagination;
    
    if (totalPaginas <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="site-pagination">';
    
    // Botón anterior
    if (tieneAnterior) {
        paginationHTML += `<a href="#" onclick="changePage(${paginaActual - 1})">&laquo; Anterior</a>`;
    }
    
    // Números de página
    const startPage = Math.max(1, paginaActual - 2);
    const endPage = Math.min(totalPaginas, paginaActual + 2);
    
    if (startPage > 1) {
        paginationHTML += `<a href="#" onclick="changePage(1)">1</a>`;
        if (startPage > 2) {
            paginationHTML += '<span>...</span>';
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === paginaActual ? 'active' : '';
        paginationHTML += `<a href="#" class="${activeClass}" onclick="changePage(${i})">${i}</a>`;
    }
    
    if (endPage < totalPaginas) {
        if (endPage < totalPaginas - 1) {
            paginationHTML += '<span>...</span>';
        }
        paginationHTML += `<a href="#" onclick="changePage(${totalPaginas})">${totalPaginas}</a>`;
    }
    
    // Botón siguiente
    if (tieneSiguiente) {
        paginationHTML += `<a href="#" onclick="changePage(${paginaActual + 1})">Siguiente &raquo;</a>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

// Cambiar página
function changePage(page) {
    if (page === currentPage || isLoading) return;
    
    currentPage = page;
    loadBlogs();
    
    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar/ocultar loading
function showLoading(show) {
    if (loadingSpinner) {
        loadingSpinner.style.display = show ? 'block' : 'none';
    }
}

// Mostrar error
function showError(message) {
    if (blogsContainer) {
        blogsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-danger">
                    <h4>Error</h4>
                    <p>${message}</p>
                    <button class="btn btn-primary" onclick="loadBlogs()">Reintentar</button>
                </div>
            </div>
        `;
    }
}

// Utilidades
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hacer funciones globales para uso en HTML
window.changePage = changePage;
window.loadBlogs = loadBlogs;
