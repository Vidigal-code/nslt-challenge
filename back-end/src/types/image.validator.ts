import * as path from 'path';

class ImageValidator {

    private static readonly MAX_SIZE = 10 * 1024 * 1024; // 10MB

    private static readonly ALLOWED_MIME_TYPES = [
        'image/png', // PNG
        'image/bmp', // BMP
        'image/gif', // GIF
        'image/jpeg', // JPEG
        'image/webp', // WebP
        'image/svg+xml', // SVG
    ];

    public static validateImage(file: Express.Multer.File | null): string | null {
        if (!file) {
            return 'No file provided';
        }

        if (!ImageValidator.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            return 'Invalid file type. Allowed types: PNG, BMP, GIF, JPEG, WebP, SVG.';
        }

        if (file.size > ImageValidator.MAX_SIZE) {
            return 'File too large (max 10MB)';
        }

        const fileName = path.basename(file.originalname);
        if (/[^a-zA-Z0-9._-]/.test(fileName)) {
            return 'Invalid file name. Only alphanumeric characters, dots, hyphens, and underscores are allowed.';
        }

        if (!ImageValidator.isValidImageContent(file)) {
            return 'The file is not a valid image';
        }

        return null;
    }

    private static isValidImageContent(file: Express.Multer.File): boolean {
        return true;
    }
}

export default ImageValidator;
