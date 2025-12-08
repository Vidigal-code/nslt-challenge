export interface ImageStoragePort {
    uploadImage(file: Express.Multer.File): Promise<string | void>;
    deleteImage(imageUrl: string): Promise<void>;
    createBucketIfNotExists(): Promise<void>;
}

