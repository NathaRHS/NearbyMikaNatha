const fs = require('fs/promises');
const path = require('path');

const MIME_TO_EXTENSION = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/avif': '.avif',
    'image/svg+xml': '.svg',
};

function sanitizeFileName(name) {
    return name
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'image';
}

const UploadController = {
    uploadImage: async (req, res) => {
        try {
            const { filename, content } = req.body;

            if (!filename || !content) {
                return res.status(400).json({ message: 'filename et content sont requis' });
            }

            const matches = content.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

            if (!matches) {
                return res.status(400).json({ message: 'Format image invalide' });
            }

            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = MIME_TO_EXTENSION[mimeType];

            if (!extension) {
                return res.status(400).json({ message: 'Type image non supporte' });
            }

            const uploadDir = path.join(__dirname, '..', 'uploads');
            const safeName = sanitizeFileName(filename);
            const savedFileName = `${Date.now()}-${safeName}${extension}`;
            const absoluteFilePath = path.join(uploadDir, savedFileName);

            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(absoluteFilePath, Buffer.from(base64Data, 'base64'));

            res.status(201).json({
                filename: savedFileName,
                url: `/uploads/${savedFileName}`,
            });
        } catch (error) {
            res.status(500).json({ message: 'Erreur upload image', error: error.message });
        }
    },
};

module.exports = UploadController;
