import { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../image/Image';

import './charCard.scss';

class CharCard extends Component {
    render() {
        const { name, thumbnail, id, onClickCard, addRefToElem } = this.props;
        const isImageNotFoundStyle = { objectFit: 'unset' };
        return (
            <li ref={addRefToElem} data-id={id} onClick={() => onClickCard(id)} className="char__item">
                <Image style={isImageNotFoundStyle} src={thumbnail} alt={name} />
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

CharCard.propTypes = {
    name: PropTypes.string,
    thumbnail: PropTypes.string,
    id: PropTypes.number,
    updateCurrentCharId: PropTypes.func,
}

export default CharCard;