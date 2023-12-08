const imageNotFoundSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

const Image = ({src, style, alt, className}) => {
    const imgStyle = src === imageNotFoundSrc ? style : null;
    return <img className={className} style={style} src={src} alt={alt}/>
}

export default Image;