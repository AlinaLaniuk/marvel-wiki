import './charCard.scss';

const imageNotFoundSrc = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

const CharCard = ({ name, thumbnail, id, updateCurrentCharId }) => {
    const isImageNotFound = thumbnail === imageNotFoundSrc;
    const imgStyle = isImageNotFound ? {objectFit: 'unset'} : null;
    return (
        <li onClick={() => updateCurrentCharId(id)} className="char__item">
            <img style={imgStyle} src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharCard;