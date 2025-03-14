class ImageValidator {
    private static readonly MAX_SIZE = 10 * 1024 * 1024; // 10MB

    public static validateImage(file: Express.Multer.File | null): string | null {
        if (!file) {
            return 'No file provided';
        }

        if (!file.mimetype.startsWith('image/')) {
            return 'Only images are allowed';
        }

        if (file.size > ImageValidator.MAX_SIZE) {
            return 'File too large (max 10MB)';
        }

        return null;
    }
}

export default ImageValidator;
