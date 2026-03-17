export const adminResources = [
  {
    key: 'produits',
    label: 'Produits',
    endpoint: '/api/produits',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false },
      { name: 'prix', label: 'Prix', type: 'number', required: false },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nom', label: 'Nom' },
      { key: 'prix', label: 'Prix' },
      {
        key: 'description_image',
        label: 'Image detail',
        render: (record) => (record.description_image?.url ? 'Oui' : '-'),
      },
    ],
  },
  {
    key: 'couleurs',
    label: 'Couleurs',
    endpoint: '/api/couleurs',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nom', label: 'Nom' },
    ],
  },
  {
    key: 'type-manches',
    label: 'Types de manche',
    endpoint: '/api/type-manches',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nom', label: 'Nom' },
    ],
  },
  {
    key: 'produit-shoes',
    label: 'Produits shoes',
    endpoint: '/api/produit-shoes',
    fields: [
      {
        name: 'produit_id',
        label: 'Produit',
        type: 'select',
        required: true,
        optionsKey: 'produits',
        valueFromRecord: (record) => record.produit?.id ?? record.produit_id ?? '',
      },
      {
        name: 'idcouleur',
        label: 'Couleur',
        type: 'select',
        required: true,
        optionsKey: 'couleurs',
        valueFromRecord: (record) => record.couleur?.id ?? record.idcouleur ?? '',
      },
      { name: 'pointure', label: 'Pointure', type: 'text', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'produit', label: 'Produit', render: (record) => record.produit?.nom ?? '-' },
      { key: 'couleur', label: 'Couleur', render: (record) => record.couleur?.nom ?? '-' },
      { key: 'pointure', label: 'Pointure' },
    ],
  },
  {
    key: 'produit-liquettes',
    label: 'Produits liquettes',
    endpoint: '/api/produit-liquettes',
    fields: [
      {
        name: 'produit_id',
        label: 'Produit',
        type: 'select',
        required: true,
        optionsKey: 'produits',
        valueFromRecord: (record) => record.produit?.id ?? record.produit_id ?? '',
      },
      {
        name: 'idcouleur',
        label: 'Couleur',
        type: 'select',
        required: true,
        optionsKey: 'couleurs',
        valueFromRecord: (record) => record.couleur?.id ?? record.idcouleur ?? '',
      },
      {
        name: 'idtype_manche',
        label: 'Type de manche',
        type: 'select',
        required: true,
        optionsKey: 'typeManches',
        valueFromRecord: (record) => record.type_manche?.id ?? record.idtype_manche ?? '',
      },
      { name: 'taille', label: 'Taille', type: 'text', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'produit', label: 'Produit', render: (record) => record.produit?.nom ?? '-' },
      { key: 'couleur', label: 'Couleur', render: (record) => record.couleur?.nom ?? '-' },
      {
        key: 'type_manche',
        label: 'Type de manche',
        render: (record) => record.type_manche?.nom ?? '-',
      },
      { key: 'taille', label: 'Taille' },
    ],
  },
  {
    key: 'images',
    label: 'Images',
    endpoint: '/api/images',
    fields: [
      {
        name: 'idproduit',
        label: 'Produit',
        type: 'select',
        required: true,
        optionsKey: 'produits',
        valueFromRecord: (record) => record.produit?.id ?? record.idproduit ?? '',
      },
      { name: 'url', label: 'URL', type: 'url', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'produit', label: 'Produit', render: (record) => record.produit?.nom ?? '-' },
      { key: 'url', label: 'URL' },
    ],
  },
  {
    key: 'commande-infos',
    label: 'Commandes',
    endpoint: '/api/commande-infos',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true },
      { name: 'prenom', label: 'Prenom', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'contact', label: 'Contact', type: 'text', required: true },
      { name: 'adresse', label: 'Adresse', type: 'textarea', required: true },
      { name: 'reference', label: 'Reference', type: 'text', required: true },
    ],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'nom', label: 'Nom' },
      { key: 'prenom', label: 'Prenom' },
      { key: 'email', label: 'Email' },
      { key: 'contact', label: 'Contact' },
      { key: 'reference', label: 'Reference' },
    ],
  },
]

export function getInitialFormValues(resource, record = null) {
  return resource.fields.reduce((accumulator, field) => {
    if (!record) {
      accumulator[field.name] = ''
      return accumulator
    }

    const rawValue = field.valueFromRecord
      ? field.valueFromRecord(record)
      : record[field.name]

    accumulator[field.name] = rawValue ?? ''
    return accumulator
  }, {})
}
