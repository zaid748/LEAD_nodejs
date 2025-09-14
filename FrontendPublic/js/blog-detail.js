// Configuración de la API
const API_BASE_URL = 'http://localhost:4000/api';

// Obtener ID del blog desde la URL
function getBlogIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Elementos del DOM
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const blogContent = document.getElementById('blog-content');
const errorText = document.getElementById('error-text');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando detalle de blog...');
    
    const blogId = getBlogIdFromUrl();
    
    if (!blogId) {
        showError('ID de blog no válido');
        return;
    }
    
    loadBlogDetail(blogId);
});

// Cargar detalle del blog
async function loadBlogDetail(blogId) {
    try {
        console.log('📡 Cargando detalle del blog:', blogId);
        
        const response = await fetch(`${API_BASE_URL}/blog/public/${blogId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Blog no encontrado');
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Blog cargado exitosamente:', data.blog);
            renderBlogDetail(data.blog);
            loadRelatedBlogs(data.blog.categoria, blogId);
        } else {
            throw new Error(data.mensaje || 'Error al cargar el blog');
        }
        
    } catch (error) {
        console.error('❌ Error al cargar detalle del blog:', error);
        showError(error.message);
    }
}

// Renderizar detalle del blog
function renderBlogDetail(blog) {
    // Ocultar loading y mostrar contenido
    loadingSpinner.style.display = 'none';
    blogContent.style.display = 'block';
    
    // Actualizar breadcrumb
    document.getElementById('breadcrumb-title').textContent = blog.titulo;
    
    // Información básica
    document.getElementById('blog-title').textContent = blog.titulo;
    document.getElementById('blog-category').textContent = blog.categoria;
    document.getElementById('blog-date').textContent = formatDate(blog.fechaPublicacion || blog.createdAt);
    document.getElementById('blog-author').textContent = blog.autor ? `${blog.autor.prim_nom} ${blog.autor.apell_pa}` : 'Autor';
    
    // Imagen principal
    const blogImage = document.getElementById('blog-image');
    if (blog.imagenPrincipal && blog.imagenPrincipal.url) {
        blogImage.src = blog.imagenPrincipal.url;
        blogImage.alt = blog.titulo;
    } else {
        blogImage.src = 'images/img_4.jpg';
        blogImage.alt = 'Imagen por defecto';
    }
    
    // Contenido del blog
    const blogBody = document.getElementById('blog-body');
    blogBody.innerHTML = formatBlogContent(blog.contenido);
    
    // Tags
    if (blog.tags && blog.tags.length > 0) {
        const tagsContainer = document.getElementById('blog-tags-container');
        const tagsElement = document.getElementById('blog-tags');
        
        const tagsHTML = blog.tags.map(tag => 
            `<span class="badge badge-secondary mr-1">${tag}</span>`
        ).join('');
        
        tagsElement.innerHTML = tagsHTML;
        tagsContainer.style.display = 'block';
    }
    
    // Imágenes adicionales
    if (blog.imagenes && blog.imagenes.length > 0) {
        const additionalImagesContainer = document.getElementById('additional-images-container');
        const additionalImagesElement = document.getElementById('additional-images');
        
        const imagesHTML = blog.imagenes.map((imagen, index) => `
            <div class="col-md-6 col-lg-4 mb-3">
                <img src="${imagen.url}" alt="Imagen adicional ${index + 1}" class="img-fluid rounded" style="cursor: pointer;" onclick="openImageModal('${imagen.url}', '${blog.titulo}')">
            </div>
        `).join('');
        
        additionalImagesElement.innerHTML = imagesHTML;
        additionalImagesContainer.style.display = 'block';
    }
    
    // Sidebar
    document.getElementById('sidebar-author').textContent = blog.autor ? `${blog.autor.prim_nom} ${blog.autor.apell_pa}` : 'Autor';
    document.getElementById('sidebar-date').textContent = formatDate(blog.fechaPublicacion || blog.createdAt);
    document.getElementById('sidebar-category').textContent = blog.categoria;
    document.getElementById('sidebar-views').textContent = blog.views || 0;
    
    // Actualizar título de la página
    document.title = `${blog.titulo} - LEAD Inmobiliaria`;
}

// Cargar blogs relacionados
async function loadRelatedBlogs(category, currentBlogId) {
    try {
        console.log('📡 Cargando blogs relacionados...');
        
        const response = await fetch(`${API_BASE_URL}/blog/public?category=${category}&limit=3`);
        
        if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.blogs.length > 0) {
                // Filtrar el blog actual
                const relatedBlogs = data.blogs.filter(blog => blog._id !== currentBlogId).slice(0, 3);
                
                if (relatedBlogs.length > 0) {
                    renderRelatedBlogs(relatedBlogs);
                }
            }
        }
    } catch (error) {
        console.error('❌ Error al cargar blogs relacionados:', error);
        // No mostrar error para blogs relacionados, es opcional
    }
}

// Renderizar blogs relacionados
function renderRelatedBlogs(blogs) {
    const relatedBlogsContainer = document.getElementById('related-blogs-container');
    const relatedBlogsElement = document.getElementById('related-blogs');
    
    const blogsHTML = blogs.map(blog => {
        const imageUrl = blog.imagenPrincipal?.url || 'images/img_4.jpg';
        const authorName = blog.autor ? `${blog.autor.prim_nom} ${blog.autor.apell_pa}` : 'Autor';
        const publishDate = formatDate(blog.fechaPublicacion || blog.createdAt);
        const excerpt = blog.resumen || truncateText(blog.contenido, 100);
        
        return `
            <div class="mb-3">
                <a href="blog-detail.html?id=${blog._id}" class="text-decoration-none">
                    <div class="d-flex">
                        <img src="${imageUrl}" alt="${blog.titulo}" class="rounded mr-3" style="width: 80px; height: 60px; object-fit: cover;">
                        <div>
                            <h6 class="mb-1 text-dark">${blog.titulo}</h6>
                            <small class="text-muted">${publishDate}</small>
                            <p class="mb-0 small text-muted">${excerpt}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    relatedBlogsElement.innerHTML = blogsHTML;
    relatedBlogsContainer.style.display = 'block';
}

// Mostrar error
function showError(message) {
    loadingSpinner.style.display = 'none';
    errorMessage.style.display = 'block';
    errorText.textContent = message;
}

// Formatear contenido del blog
function formatBlogContent(content) {
    // Convertir saltos de línea a párrafos
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    
    return paragraphs.map(paragraph => {
        const trimmed = paragraph.trim();
        if (trimmed) {
            return `<p>${trimmed}</p>`;
        }
        return '';
    }).join('');
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Abrir modal de imagen (función simple)
function openImageModal(imageUrl, title) {
    // Crear modal simple
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    // Cerrar al hacer click
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Hacer funciones globales
window.openImageModal = openImageModal;
