import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import '../styles/CategoryAdmin.css'

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categorias');
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
    } catch (error) {
      console.error('Error al comprimir la imagen:', error);
    }
  };

  const createCategory = async () => {
    const formData = new FormData();
    formData.append('name', newCategoryName);

    if (newCategoryImage) {
      const compressedImage = await handleImageCompression(newCategoryImage);
      formData.append('image', compressedImage);
    }

    try {
      await fetch('/api/categorias', {
        method: 'POST',
        body: formData,
      });
      setNewCategoryName('');
      setNewCategoryImage(null);
      fetchCategories();
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.nombre);
  };

  const updateCategory = async () => {
    try {
      await fetch(`/api/categorias/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: newCategoryName }),
      });
      setEditingCategory(null);
      setNewCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const removeCategoryImage = async (categoryId) => {
    try {
      await fetch(`/api/categorias/${categoryId}/remove-image`, {
        method: 'PUT',
      });
      fetchCategories();
    } catch (error) {
      console.error('Error al eliminar imagen de categoría:', error);
    }
  };

  const deleteCategory = async () => {
    try {
      await fetch(`/api/categorias/${categoryToDelete.id}`, {
        method: 'DELETE',
      });
      setShowDeleteConfirmation(false);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div className="category-admin">
      <h1>Administrar Categorías</h1>
      
      <div className="create-category">
        <h2>Crear Nueva Categoría</h2>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setNewCategoryImage(e.target.files[0])}
        />
        <button onClick={createCategory}>Crear Categoría</button>
      </div>

      <div className="category-list">
        <h2>Lista de Categorías</h2>
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <h3>{category.nombre}</h3>
            {category.imUrlg ? (
              <img src={category.imUrlg} alt={category.nombre} />
            ) : (
              <p>Sin imagen</p>
            )}
            <button onClick={() => startEditing(category)}>Editar</button>
            <button onClick={() => { setCategoryToDelete(category); setShowDeleteConfirmation(true); }}>Eliminar</button>
            {category.imUrlg && (
              <button onClick={() => removeCategoryImage(category.id)}>Eliminar Imagen</button>
            )}
          </div>
        ))}
      </div>

      {editingCategory && (
        <div className="edit-category">
          <h2>Editar Categoría</h2>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={updateCategory}>Guardar Cambios</button>
          <button onClick={() => setEditingCategory(null)}>Cancelar</button>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>¿Estás seguro de que deseas eliminar esta categoría y todos sus trabajos?</p>
          <button onClick={deleteCategory}>Sí, eliminar</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default CategoryAdmin;
