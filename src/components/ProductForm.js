import React, { useEffect, useRef, useState } from 'https://esm.sh/react@18.2.0';
import { useNavigate, useParams } from 'https://esm.sh/react-router-dom@6.22.3';
import { createProduct, fetchProduct, updateProduct } from '../api.js';

const initialState = { title: '', description: '', price: '', image: '', stock: '' };

export default function ProductForm({ mode }) {
  const isEdit = mode === 'edit';
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const refs = {
    title: useRef(null),
    description: useRef(null),
    price: useRef(null),
    image: useRef(null),
    stock: useRef(null),
  };

  useEffect(() => {
    if (isEdit && id) {
      fetchProduct(id)
        .then(prod => setForm({
          title: prod.title,
          description: prod.description,
          price: prod.price,
          image: prod.image,
          stock: prod.stock,
        }))
        .catch(() => setErrors({ form: 'Não foi possível carregar o produto.' }))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Nome é obrigatório';
    if (!form.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (form.price === '' || isNaN(Number(form.price))) newErrors.price = 'Preço deve ser um número';
    else if (Number(form.price) < 0) newErrors.price = 'Preço deve ser maior ou igual a 0';
    if (!form.image.trim()) newErrors.image = 'URL da imagem é obrigatória';
    if (form.stock === '' || isNaN(Number(form.stock))) newErrors.stock = 'Estoque deve ser um número';
    else if (Number(form.stock) < 0) newErrors.stock = 'Estoque deve ser maior ou igual a 0';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      refs[firstKey]?.current?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        stock: Number(form.stock),
      };
      if (isEdit) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/');
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  if (loading) return <p className="text-muted">Carregando...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Produto' : 'Cadastrar Produto'}</h1>
      {errors.form && <p className="text-red-600 mb-2">{errors.form}</p>}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Field label="Nome" error={errors.title}>
          <input
            ref={refs.title}
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.title ? 'error' : ''}`}
          />
        </Field>
        <Field label="Descrição" error={errors.description}>
          <textarea
            ref={refs.description}
            name="description"
            value={form.description}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 min-h-[100px] ${errors.description ? 'error' : ''}`}
          />
        </Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Preço" error={errors.price}>
            <input
              ref={refs.price}
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              step="0.01"
              className={`w-full border rounded-lg px-3 py-2 ${errors.price ? 'error' : ''}`}
            />
          </Field>
          <Field label="Estoque" error={errors.stock}>
            <input
              ref={refs.stock}
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 ${errors.stock ? 'error' : ''}`}
            />
          </Field>
        </div>
        <Field label="URL da imagem" error={errors.image}>
          <input
            ref={refs.image}
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className={`w-full border rounded-lg px-3 py-2 ${errors.image ? 'error' : ''}`}
          />
        </Field>
        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold disabled:opacity-60"
          >
            {submitting ? 'Enviando...' : isEdit ? 'Salvar alterações' : 'Cadastrar'}
          </button>
          <button type="button" onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border">Cancelar</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block space-y-1">
      <span className="font-semibold">{label}</span>
      {children}
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </label>
  );
}
