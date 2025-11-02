const ImagePreview = (images: string[]) => {
    const handleImageLoad = (image: string) => {
        URL.revokeObjectURL(image);
    };
    return (
        <section>
            <div className={'image_preview_container'}>
                {images.map((image) => (
                    <img src={image} alt="preview" onLoad={() => handleImageLoad(image)} />
                ))}
            </div>
        </section>
    );
};
export default ImagePreview;
