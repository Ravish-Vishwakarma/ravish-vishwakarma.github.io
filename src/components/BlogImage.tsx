interface BlogImageProps {
    src: string;
    alt: string;
}

function BlogImage({ src, alt }: BlogImageProps) {
    return (
        <figure className="blog-image">
            <img src={src} alt={alt} />
            {alt && <figcaption>{alt}</figcaption>}
        </figure>
    );
}

export { BlogImage };
