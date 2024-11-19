📸Juvica - Frontend 🚀
¡Hola! Bienvenid@ al frontend de Juvica. 🌟 He construido esta aplicación usando React, con una arquitectura moderna y componentes dinámicos que hacen que la experiencia de usuario sea fluida y divertida.

🛠️ Tecnologías Utilizadas
React: La base de este proyecto. Componentes reutilizables, dinámicos y geniales.
React Router: Para la navegación entre páginas sin recargar el sitio.
Context API: Manejo del estado global, porque trabajar con props para todo es cosa del pasado. 😉
Configuración Dinámica: La apiUrl se puede configurar externamente para que sea flexible y adaptable. ¡Ideal para desarrollo y producción!

🌐 Rutas de la Aplicación
El proyecto tiene diferentes rutas que te llevan a las páginas principales de la app. Estas son:

Ruta	Descripción

/	Página de inicio con una introducción. ✨

/categorias	Muestra una lista de categorías. 🗂️

/categoria/:id	Detalles de una categoría específica, incluyendo trabajos relacionados. 🔍

/trabajo/:id	Página de detalle de un trabajo. Aquí puedes ver imágenes, videos y comentarios. 🎥📸

/about	Un poco más sobre el proyecto o el equipo detrás de esta app. 🤓

/admin	Panel de administración para gestionar el contenido. Solo para los que tienen la llave maestra. 🔑
Y si alguien se pierde por ahí, lo redireccionamos de vuelta al inicio. 😎

🏗️ Estructura del Proyecto
El frontend está organizado de manera que sea fácil de entender y ampliar. Algunas partes clave:

📁 Páginas
HomePage: La cara bonita de la app.
CategoriasPage: Una lista interactiva de categorías.
CategoriaDetailPage: Explora los trabajos dentro de una categoría.
TrabajoDetailPage: Un vistazo detallado a cada trabajo, con soporte para imágenes y videos.
AboutPage: Para conocer un poco más sobre este proyecto.
AdminPage: Solo para administradores. 😏

📁 Componentes Globales
Navbar: Barra de navegación principal, visible en todas las páginas.
Footer: Pie de página con info y enlaces útiles.

⚙️ Configuración
Clona este repositorio:

bash

git clone <url-del-repo>
cd <nombre-del-proyecto>
Instala las dependencias:

bash

npm install
Configura la apiUrl en un archivo externo (por ejemplo, .env o un archivo de configuración). Así puedes usar diferentes entornos sin tocar el código.

Inicia la aplicación en modo desarrollo:

bash

npm start
💡 Características Especiales
Carga Diferida de Imágenes y Videos: Solo se cargan cuando son visibles en la pantalla. Ideal para rendimiento. 🏎️
Contextos para Estado Global: Simplifica la administración de datos como configuraciones y autenticación.
Interfaz Adaptable: Diseño responsive que se ve bien tanto en móviles como en escritorio. 📱💻

📸 Screenshots
(Aquí puedes agregar imágenes de la interfaz: Home, Categorías, Detalle de Trabajo, etc.)



🛠️ Futuras Mejoras
Agregar notificaciones en tiempo real.
Mejorar el diseño del panel de administración.
Implementar soporte multilenguaje (porque el mundo es grande 🌍).
¡Nos vemos en el código! 👾