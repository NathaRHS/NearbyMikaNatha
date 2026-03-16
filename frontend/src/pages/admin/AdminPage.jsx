import { useEffect, useMemo, useState } from 'react'
import { RouterLink } from '../../router'
import { adminResources, getInitialFormValues } from './resources'
import './admin.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const initialQuickForm = {
  nom: '',
  description: '',
  prix: '',
  type: 'liquette',
  idcouleur: '',
  idtype_manche: '',
  taille: '',
  pointure: '',
}

function AdminPage() {
  const [selectedKey, setSelectedKey] = useState(adminResources[0].key)
  const [records, setRecords] = useState([])
  const [lookups, setLookups] = useState({
    produits: [],
    couleurs: [],
    images: [],
    typeManches: [],
  })
  const [formData, setFormData] = useState(getInitialFormValues(adminResources[0]))
  const [editingRecord, setEditingRecord] = useState(null)
  const [productImageFile, setProductImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [quickForm, setQuickForm] = useState(initialQuickForm)
  const [quickImageFile, setQuickImageFile] = useState(null)
  const [quickImagePreviewUrl, setQuickImagePreviewUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isQuickSaving, setIsQuickSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const resource = useMemo(
    () => adminResources.find((item) => item.key === selectedKey) ?? adminResources[0],
    [selectedKey],
  )

  useEffect(() => {
    setFormData(getInitialFormValues(resource))
    setEditingRecord(null)
    setProductImageFile(null)
    setImagePreviewUrl('')
    setStatusMessage('')
    setErrorMessage('')
  }, [resource])

  useEffect(() => {
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreviewUrl)
      }

      if (quickImagePreviewUrl && quickImagePreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(quickImagePreviewUrl)
      }
    }
  }, [imagePreviewUrl, quickImagePreviewUrl])

  useEffect(() => {
    void loadLookups()
  }, [])

  useEffect(() => {
    void loadRecords(resource)
  }, [resource])

  async function request(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
      ...options,
    })

    const raw = await response.text()
    let data = null

    if (raw) {
      try {
        data = JSON.parse(raw)
      } catch {
        data = { message: raw }
      }
    }

    if (!response.ok) {
      const message = data?.message || 'Erreur API'
      throw new Error(message)
    }

    return data
  }

  async function loadLookups() {
    try {
      const [produits, couleurs, images, typeManches] = await Promise.all([
        request('/api/produits'),
        request('/api/couleurs'),
        request('/api/images'),
        request('/api/type-manches'),
      ])

      setLookups({ produits, couleurs, images, typeManches })
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  async function loadRecords(targetResource) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await request(targetResource.endpoint)
      setRecords(Array.isArray(data) ? data : [])
    } catch (error) {
      setRecords([])
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleChange(fieldName, value) {
    setFormData((current) => ({
      ...current,
      [fieldName]: value,
    }))
  }

  function startEdit(record) {
    setEditingRecord(record)
    setFormData(getInitialFormValues(resource, record))
    setStatusMessage('')
    setErrorMessage('')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setEditingRecord(null)
    setFormData(getInitialFormValues(resource))
    setProductImageFile(null)
    setImagePreviewUrl('')
  }

  function resetQuickForm() {
    setQuickForm(initialQuickForm)
    setQuickImageFile(null)
    setQuickImagePreviewUrl('')
  }

  function handleQuickChange(fieldName, value) {
    setQuickForm((current) => ({
      ...current,
      [fieldName]: value,
    }))
  }

  function handleImageSelection(event) {
    const file = event.target.files?.[0] ?? null
    setProductImageFile(file)

    if (!file) {
      setImagePreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setImagePreviewUrl(objectUrl)
  }

  function handleQuickImageSelection(event) {
    const file = event.target.files?.[0] ?? null
    setQuickImageFile(file)

    if (!file) {
      setQuickImagePreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setQuickImagePreviewUrl(objectUrl)
  }

  async function fileToDataUrl(file) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error('Lecture image impossible'))
      reader.readAsDataURL(file)
    })
  }

  async function saveProductImage(productId, file) {
    if (!file) {
      return
    }

    const content = await fileToDataUrl(file)
    const uploadedFile = await request('/api/uploads', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        content,
      }),
    })

    const existingImage = lookups.images.find((image) => {
      const currentProductId = image.produit?.id ?? image.idproduit
      return Number(currentProductId) === Number(productId)
    })

    const payload = {
      idproduit: productId,
      url: uploadedFile.url,
    }

    if (existingImage) {
      await request(`/api/images/${existingImage.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      return
    }

    await request('/api/images', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  function buildPayload() {
    return resource.fields.reduce((accumulator, field) => {
      const value = formData[field.name]

      if (field.type === 'select' || field.type === 'number') {
        accumulator[field.name] = value === '' ? null : Number(value)
        return accumulator
      }

      accumulator[field.name] = typeof value === 'string' ? value.trim() : value
      return accumulator
    }, {})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setStatusMessage('')
    setErrorMessage('')

    try {
      const payload = buildPayload()
      const isEditing = Boolean(editingRecord)
      const path = isEditing ? `${resource.endpoint}/${editingRecord.id}` : resource.endpoint
      const method = isEditing ? 'PUT' : 'POST'

      const savedRecord = await request(path, {
        method,
        body: JSON.stringify(payload),
      })

      if (resource.key === 'produits' && savedRecord?.id && productImageFile) {
        await saveProductImage(savedRecord.id, productImageFile)
      }

      await loadRecords(resource)
      await loadLookups()
      resetForm()
      setStatusMessage(isEditing ? 'Mise a jour effectuee.' : 'Creation effectuee.')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleQuickSubmit(event) {
    event.preventDefault()
    setIsQuickSaving(true)
    setStatusMessage('')
    setErrorMessage('')

    try {
      const produit = await request('/api/produits', {
        method: 'POST',
        body: JSON.stringify({
          nom: quickForm.nom.trim(),
          description: quickForm.description.trim(),
          prix: quickForm.prix === '' ? null : Number(quickForm.prix),
        }),
      })

      if (quickForm.type === 'liquette') {
        await request('/api/produit-liquettes', {
          method: 'POST',
          body: JSON.stringify({
            produit_id: produit.id,
            idcouleur: Number(quickForm.idcouleur),
            idtype_manche: Number(quickForm.idtype_manche),
            taille: quickForm.taille.trim(),
          }),
        })
      } else {
        await request('/api/produit-shoes', {
          method: 'POST',
          body: JSON.stringify({
            produit_id: produit.id,
            idcouleur: Number(quickForm.idcouleur),
            pointure: quickForm.pointure.trim(),
          }),
        })
      }

      if (quickImageFile) {
        await saveProductImage(produit.id, quickImageFile)
      }

      await loadLookups()
      await loadRecords(resource)
      resetQuickForm()
      setStatusMessage('Produit cree avec sa declinaison en une seule etape.')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsQuickSaving(false)
    }
  }

  async function handleDelete(record) {
    const confirmed = window.confirm(`Supprimer l'element #${record.id} ?`)

    if (!confirmed) {
      return
    }

    setDeletingId(record.id)
    setStatusMessage('')
    setErrorMessage('')

    try {
      await request(`${resource.endpoint}/${record.id}`, { method: 'DELETE' })
      await loadRecords(resource)
      if (editingRecord?.id === record.id) {
        resetForm()
      }
      setStatusMessage('Suppression effectuee.')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setDeletingId(null)
    }
  }

  function renderInput(field) {
    const value = formData[field.name] ?? ''

    if (field.type === 'textarea') {
      return (
        <textarea
          id={field.name}
          value={value}
          required={field.required}
          onChange={(event) => handleChange(field.name, event.target.value)}
          rows="4"
        />
      )
    }

    if (field.type === 'select') {
      const options = lookups[field.optionsKey] ?? []

      return (
        <select
          id={field.name}
          value={value}
          required={field.required}
          onChange={(event) => handleChange(field.name, event.target.value)}
        >
          <option value="">Selectionner</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nom}
            </option>
          ))}
        </select>
      )
    }

    return (
      <input
        id={field.name}
        type={field.type}
        value={value}
        required={field.required}
        step={field.type === 'number' ? '0.01' : undefined}
        min={field.type === 'number' ? '0' : undefined}
        onChange={(event) => handleChange(field.name, event.target.value)}
      />
    )
  }

  return (
    <main className="adminShell">
      <section className="adminHero">
        <div>
          <p className="adminEyebrow">Administration</p>
          <h1>CRUD backend</h1>
          <p className="adminLead">
            Interface React pour piloter les endpoints `produits`, `couleurs`,
            `type-manches`, `produit-shoes`, `produit-liquettes`, `images` et
            `commande-infos`.
          </p>
        </div>
        <RouterLink className="adminBackLink" to="/">
          Retour au site
        </RouterLink>
      </section>

      <section className="adminLayout">
        <aside className="adminSidebar">
          <h2>Ressources</h2>
          <div className="adminNav">
            {adminResources.map((item) => (
              <button
                key={item.key}
                className={item.key === resource.key ? 'is-active' : ''}
                type="button"
                onClick={() => setSelectedKey(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="adminContent">
          <div className="adminPanel adminQuickCreate">
            <div className="adminPanelHeader">
              <div>
                <p className="adminPanelLabel">Ajout rapide</p>
                <h2>Creer un produit complet</h2>
              </div>
            </div>

            <form className="adminForm" onSubmit={handleQuickSubmit}>
              <label htmlFor="quick-nom">
                <span>Nom du produit</span>
                <input
                  id="quick-nom"
                  type="text"
                  required
                  value={quickForm.nom}
                  onChange={(event) => handleQuickChange('nom', event.target.value)}
                />
              </label>

              <label htmlFor="quick-description">
                <span>Description</span>
                <textarea
                  id="quick-description"
                  value={quickForm.description}
                  onChange={(event) => handleQuickChange('description', event.target.value)}
                  rows="4"
                />
              </label>

              <label htmlFor="quick-prix">
                <span>Prix</span>
                <input
                  id="quick-prix"
                  type="number"
                  step="0.01"
                  min="0"
                  value={quickForm.prix}
                  onChange={(event) => handleQuickChange('prix', event.target.value)}
                />
              </label>

              <label htmlFor="quick-type">
                <span>Type de produit</span>
                <select
                  id="quick-type"
                  value={quickForm.type}
                  onChange={(event) => handleQuickChange('type', event.target.value)}
                >
                  <option value="liquette">Liquette</option>
                  <option value="shoes">Shoes</option>
                </select>
              </label>

              <label htmlFor="quick-couleur">
                <span>Couleur</span>
                <select
                  id="quick-couleur"
                  required
                  value={quickForm.idcouleur}
                  onChange={(event) => handleQuickChange('idcouleur', event.target.value)}
                >
                  <option value="">Selectionner</option>
                  {lookups.couleurs.map((couleur) => (
                    <option key={couleur.id} value={couleur.id}>
                      {couleur.nom}
                    </option>
                  ))}
                </select>
              </label>

              {quickForm.type === 'liquette' ? (
                <>
                  <label htmlFor="quick-type-manche">
                    <span>Type de manche</span>
                    <select
                      id="quick-type-manche"
                      required
                      value={quickForm.idtype_manche}
                      onChange={(event) => handleQuickChange('idtype_manche', event.target.value)}
                    >
                      <option value="">Selectionner</option>
                      {lookups.typeManches.map((typeManche) => (
                        <option key={typeManche.id} value={typeManche.id}>
                          {typeManche.nom}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label htmlFor="quick-taille">
                    <span>Taille</span>
                    <input
                      id="quick-taille"
                      type="text"
                      required
                      value={quickForm.taille}
                      onChange={(event) => handleQuickChange('taille', event.target.value)}
                    />
                  </label>
                </>
              ) : (
                <label htmlFor="quick-pointure">
                  <span>Pointure</span>
                  <input
                    id="quick-pointure"
                    type="text"
                    required
                    value={quickForm.pointure}
                    onChange={(event) => handleQuickChange('pointure', event.target.value)}
                  />
                </label>
              )}

              <label htmlFor="quick-image">
                <span>Image du produit</span>
                <input
                  id="quick-image"
                  type="file"
                  accept="image/*"
                  onChange={handleQuickImageSelection}
                />
              </label>

              {quickImagePreviewUrl ? (
                <div className="adminImagePreview">
                  <span>Apercu</span>
                  <img src={quickImagePreviewUrl} alt="" />
                </div>
              ) : null}

              <div className="adminActions">
                <button className="primary" disabled={isQuickSaving} type="submit">
                  {isQuickSaving ? 'Creation...' : 'Creer le produit complet'}
                </button>
                <button className="secondary" type="button" onClick={resetQuickForm}>
                  Vider
                </button>
              </div>
            </form>
          </div>

          <div className="adminPanel">
            <div className="adminPanelHeader">
              <div>
                <p className="adminPanelLabel">Formulaire</p>
                <h2>{editingRecord ? `Modifier ${resource.label}` : `Ajouter ${resource.label}`}</h2>
              </div>
              {editingRecord ? (
                <button className="secondary" type="button" onClick={resetForm}>
                  Annuler
                </button>
              ) : null}
            </div>

            <form className="adminForm" onSubmit={handleSubmit}>
              {resource.fields.map((field) => (
                <label key={field.name} htmlFor={field.name}>
                  <span>{field.label}</span>
                  {renderInput(field)}
                </label>
              ))}

              {resource.key === 'produits' ? (
                <label htmlFor="product-image">
                  <span>Image du produit</span>
                  <input
                    id="product-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                  />
                </label>
              ) : null}

              {resource.key === 'produits' && imagePreviewUrl ? (
                <div className="adminImagePreview">
                  <span>Apercu</span>
                  <img src={imagePreviewUrl} alt="" />
                </div>
              ) : null}

              <div className="adminActions">
                <button className="primary" disabled={isSaving} type="submit">
                  {isSaving ? 'Enregistrement...' : editingRecord ? 'Mettre a jour' : 'Creer'}
                </button>
                <button className="secondary" type="button" onClick={resetForm}>
                  Reinitialiser
                </button>
              </div>
            </form>

            {statusMessage ? <p className="adminStatus success">{statusMessage}</p> : null}
            {errorMessage ? <p className="adminStatus error">{errorMessage}</p> : null}
          </div>

          <div className="adminPanel">
            <div className="adminPanelHeader">
              <div>
                <p className="adminPanelLabel">Liste</p>
                <h2>{resource.label}</h2>
              </div>
              <button
                className="secondary"
                type="button"
                onClick={() => loadRecords(resource)}
              >
                Actualiser
              </button>
            </div>

            {isLoading ? (
              <p className="adminEmpty">Chargement...</p>
            ) : records.length === 0 ? (
              <p className="adminEmpty">Aucune donnee.</p>
            ) : (
              <div className="adminTableWrap">
                <table className="adminTable">
                  <thead>
                    <tr>
                      {resource.columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.id}>
                        {resource.columns.map((column) => (
                          <td key={column.key}>
                            {column.render ? column.render(record) : record[column.key] ?? '-'}
                          </td>
                        ))}
                        <td className="adminRowActions">
                          <button type="button" onClick={() => startEdit(record)}>
                            Modifier
                          </button>
                          <button
                            type="button"
                            className="danger"
                            disabled={deletingId === record.id}
                            onClick={() => handleDelete(record)}
                          >
                            {deletingId === record.id ? 'Suppression...' : 'Supprimer'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default AdminPage
