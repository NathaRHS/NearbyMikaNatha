const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`)
  const raw = await response.text()
  let data = null

  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      data = raw
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || 'Erreur API')
  }

  return data
}

function buildProductImageMap(images) {
  return images.reduce((map, image) => {
    const productId = image.produit?.id ?? image.idproduit

    if (!productId || map.has(productId)) {
      return map
    }

    map.set(productId, image.url)
    return map
  }, new Map())
}

function normalizeProduct(product, imageMap) {
  return {
    id: product.id,
    nom: product.nom,
    description: product.description || '',
    prix: product.prix,
    imageUrl: imageMap.get(product.id) || '/images/prod.avif',
  }
}

export async function fetchCatalogProducts() {
  const [products, images] = await Promise.all([
    request('/api/produits'),
    request('/api/images'),
  ])

  const imageMap = buildProductImageMap(Array.isArray(images) ? images : [])

  return (Array.isArray(products) ? products : []).map((product) =>
    normalizeProduct(product, imageMap),
  )
}

export async function fetchProductDetails(productId) {
  if (!productId) {
    return null
  }

  const [product, images] = await Promise.all([
    request(`/api/produits/${productId}`),
    request('/api/images'),
  ])

  if (!product) {
    return null
  }

  const imageMap = buildProductImageMap(Array.isArray(images) ? images : [])

  return normalizeProduct(product, imageMap)
}
