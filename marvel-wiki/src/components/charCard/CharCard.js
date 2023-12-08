import PropTypes from 'prop-types';
import Image from '../image/Image';

import './charCard.scss';

const CharCard = ({ name, thumbnail, id, updateCurrentCharId }) => {
    const isImageNotFoundStyle = {objectFit: 'unset'};
    return (
        <li onClick={() => updateCurrentCharId(id)} className="char__item">
            <Image style={isImageNotFoundStyle} src={thumbnail} alt={name} />
            <div className="char__name">{name}</div>
        </li>
    )
}

CharCard.propTypes = {
    name: PropTypes.string, 
    thumbnail: PropTypes.string,
    id: PropTypes.number,
    updateCurrentCharId: PropTypes.func,
}

export default CharCard;