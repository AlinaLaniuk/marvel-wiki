import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Image from '../image/Image';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const marvelService = new MarvelService();
const noDescriptionText = 'Sorry, here is no description.'

function RandomChar() {
    const [char, setChar] = useState({});
    const [loading, setLoadingMode] = useState(true);
    const [error, setErrorMode] = useState(false);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(updateChar, []);

    const onError = () => {
        setLoadingMode(false);
        setErrorMode(true);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoadingMode(false);
    }

    const onCharLoading = () => {
        setLoadingMode(true)
        updateChar();
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={onCharLoading} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const isImageNotFoundStyle = { objectFit: 'contain' };
    return (
        <div className="randomchar__block">
            <Image src={thumbnail} alt={name} style={isImageNotFoundStyle} className='randomchar__img' />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description || noDescriptionText}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

View.propTypes = {
    char: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        homepage: PropTypes.string,
        wiki: PropTypes.string,
    })
}

export default RandomChar;