import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import '../styles/CategoryAdmin.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AdminPage = ({ config }) => {
  const [categories, setCategories] = useState([]);
  const [trabajos, setTrabajos] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Estado y lógica para trabajos
  const [workName, setWorkName] = useState('');
  const [workComment, setWorkComment] = useState('');
  const [workFiles, setWorkFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);  // Para seleccionar la categoría al crear un trabajo

  const apiUrl = config.apiUrl;

  useEffect(() => {
    fetchCategories();
    fetchTrabajos();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categorias`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleImageCompression = async (imageFile) => {
    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 600, useWebWorker: true };
    try {
      return await imageCompression(imageFile, options);
      console.log("Comprimido")
    } catch (error) {
      console.error('Error al comprimir la imagen:', error);
    }
  };

  // Crear un trabajo y asignarlo a una categoría
  const handleCreateWork = async () => {
    setLoading(true);
    try {
      const workData = {
        nombre: workName,
        comentarioLargo: workComment,
      };

      const response = await fetch(`${apiUrl}/api/categorias/${selectedCategoryId}/trabajos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workData),
      });

      if (response.ok) {
        const trabajo = await response.json();
        alert('Trabajo creado exitosamente');

        // Ahora, subir medios al trabajo creado
        await handleAddMediaToWork(trabajo.id, workFiles);

        alert('Imagenes subida exitosamente');

        setWorkName('');
        setWorkComment('');
        setWorkFiles([]);
        setSelectedCategoryId(null);
      } else {
        alert('Error al crear el trabajo');
      }
    } catch (error) {
      console.error('Error al crear trabajo:', error);
    }
    setLoading(false);
  };


  // Subir medios al trabajo
  // Subir medios al trabajo
  const handleAddMediaToWork = async (trabajoId, files) => {
    const formData = new FormData();

    try {
      // Comprimir cada imagen antes de añadirla al FormData
      for (const file of files) {
        // Verificar el tipo de archivo
        const fileType = file.type.split('/')[0];  // 'image' o 'video'
    
        if (fileType === 'image') {
          // Si es una imagen, la comprimimos
          const compressedImage = await handleImageCompression(file);
          formData.append('mediaFiles', compressedImage);
        } else if (fileType === 'video') {
          // Si es un video, lo añadimos sin comprimir
          formData.append('mediaFiles', file);
        } else {
          console.warn(`El tipo de archivo ${file.type} no es compatible.`);
        }
      }

      const response = await fetch(`${apiUrl}/api/trabajos/${trabajoId}/media`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        alert('Error al subir los medios');
      } else {
        console.log('Medios subidos exitosamente');
      }
    } catch (error) {
      console.error('Error al añadir medios al trabajo:', error);
    }
  };


  const handleFileChange = (event) => {
    setWorkFiles(Array.from(event.target.files));
  };

  const fetchTrabajos = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trabajos`);
      const data = await response.json();
      setTrabajos(data);
    } catch (error) {
      console.error('Error al obtener trabajos:', error);
    }
  };

  const handleDeleteWork = async (workId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
      try {
        await fetch(`${apiUrl}/api/trabajos/${workId}`, {
          method: 'DELETE',
        });
        fetchTrabajos(); // Actualiza la lista de trabajos después de eliminar
      } catch (error) {
        console.error('Error al eliminar trabajo:', error);
      }
    }
  };


  const handleCreateOrUpdateCategory = async () => {
    if (editingCategoryId) {
      await updateCategory(editingCategoryId);
    } else {
      await createCategory();
    }
    setCategoryName('');
    setCategoryImage(null);
    setEditingCategoryId(null);
    fetchCategories();
  };

  const createCategory = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: categoryName }),
      });
      const newCategory = await response.json();
      if (categoryImage) {
        await uploadCategoryImage(newCategory.id);
      }
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const uploadCategoryImage = async (categoryId) => {
    const formData = new FormData();
    const compressedImage = await handleImageCompression(categoryImage);
    formData.append('image', compressedImage);

    try {
      await fetch(`${apiUrl}/api/categorias/${categoryId}/image`, {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error al subir imagen de la categoría:', error);
    }
  };

  const updateCategory = async (categoryId) => {
    const formData = new FormData();
    const compressedImage = await handleImageCompression(categoryImage);
    formData.append('image', compressedImage);

    try {
      await fetch(`${apiUrl}/api/categorias/${categoryId}/image`, {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error al subir imagen de la categoría:', error);
    }
  };
  {/* 
  const removeCategoryImage = async (categoryId) => {
    try {
      await fetch(`${apiUrl}/api/categorias/${categoryId}/remove-image`, {
        method: 'PUT',
      });
      fetchCategories();
    } catch (error) {
      console.error('Error al eliminar imagen de categoría:', error);
    }
  };
  */}

  const deleteCategory = async (categoryId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría y todos sus trabajos?')) {
      try {
        await fetch(`${apiUrl}/api/categorias/${categoryId}`, {
          method: 'DELETE',
        });
        fetchCategories();
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  const startEditing = (category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.nombre);
  };

  return (
    <div className="category-admin">
      <h1>Administrar Categorías y Trabajos</h1>

      <div className="category-form">
        <h2>{editingCategoryId ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setCategoryImage(e.target.files[0])}
        />
        <button onClick={handleCreateOrUpdateCategory}>
          {editingCategoryId ? 'Guardar Cambios' : 'Crear Categoría'}
        </button>
        {editingCategoryId && (
          <button onClick={() => { setEditingCategoryId(null); setCategoryName(''); setCategoryImage(null); }}>
            Cancelar
          </button>
        )}
      </div>

      <div className="work-form">
        <h2>Crear Nuevo Trabajo</h2>
        <select
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre del trabajo"
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
        />
        <textarea
          placeholder="Comentario largo"
          value={workComment}
          onChange={(e) => setWorkComment(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button onClick={handleCreateWork} disabled={loading}>
          {loading ? 'Cargando...' : 'Crear Trabajo'}
        </button>
      </div>

      {/* Lista de categorias */}
<div className="category-list">
  <h2>Lista de Categorías</h2>
  {categories.map((category) => (
    <div key={category.id} className="category-item" style={styles.categoryItem}>
      <div>
        <h3>{category.nombre}</h3>
        {category.imgUrl && <img src={category.imgUrl} alt="Imagen de categoría" style={styles.image} />}
      </div>
      <div style={styles.buttonGroup}>
        <div style={styles.iconGroup}>
          <FaEdit
            style={styles.icon}
            onClick={() => startEditing(category)}
          />
          <FaTrash
            style={styles.icon}
            onClick={() => deleteCategory(category.id)}
          />
        </div>
      </div>
    </div>
  ))}
</div>

{/* Lista de trabajos */}
<div className="work-list">
  <h2>Lista de Trabajos</h2>
  {trabajos.map((trabajo) => (
    <div key={trabajo.id} className="work-item" style={styles.workItem}>
      <div style={styles.workContent}>
        <p><strong>Nombre:</strong> {trabajo.nombre}</p>
        <p><strong>Fecha:</strong> {new Date(trabajo.fechaRegistro).toLocaleDateString()}</p>
      </div>
      <div style={styles.iconWork}>
        <FaTrash
          style={styles.icon}
          onClick={() => handleDeleteWork(trabajo.id)}
        />
      </div>
    </div>
  ))}
</div>




    </div>
  );
};

const styles = {
  categoryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '10px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
    alignItems: 'center',
  },
  iconWork: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    gap: '10px',
    alignItems: 'center',
  },
  icon: {
    color: 'red',
    fontSize: '26px',
    cursor: 'pointer',
  },
  buttonWrapper: {
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#ff6347',  // Tomato color for buttons
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',  // Space between the image and button
  },
  image: {
    width: '100px',  // Adjust the size of the category image
    height: 'auto',
    borderRadius: '5px',
  },
  workItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    padding: '10px',
  },
  workContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  iconWork: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
};





export default AdminPage;
