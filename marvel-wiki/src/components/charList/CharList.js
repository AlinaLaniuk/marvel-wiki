import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import CharCard from '../charCard/CharCard';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const marvelService = new MarvelService();

const charsOnPage = 9;

const startOffset = 1550;

function CharList({ updateCurrentCharId }) {
    const [charsListInfo, setCharsListInfo] = useState([]);
    const [loading, setLoadingMode] = useState(true);
    const [error, setErrorMode] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(startOffset);
    const [noMoreChars, setNoMoreCharsMode] = useState(false);

    useEffect(onRequest, []);

    const onCharsListLoaded = (charsListInfo) => {
        setCharsListInfo((prevState) => {
            const newCharListState = [...prevState.charsListInfo, ...charsListInfo];
            if (charsListInfo.length < charsOnPage) {
                setLoadingMode(false);
                setNewItemLoading(false);
                setNoMoreCharsMode(true);
                return newCharListState;
            }
            setLoadingMode(false);
            setNewItemLoading(false);
            return newCharListState;
        });
    };

    const onError = () => {
        setLoadingMode(false);
        setErrorMode(true);
    };

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onRequest = () => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharsListLoaded)
            .catch(onError);
        setOffset((currentOffset) => currentOffset + charsOnPage);
        this.setState(({ offset }) => ({ offset: offset + charsOnPage }));
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !loading ? <List updateCurrentCharId={updateCurrentCharId} charsListInfo={charsListInfo} /> : null;
    const buttonStyle = noMoreChars ? { display: 'none' } : null;
    return (
        <div className="char__list">
            {spinner}
            {content}
            {errorMessage}
            <button
                onClick={onRequest}
                className="button button__main button__long"
                disabled={newItemLoading}
                style={buttonStyle}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    updateCurrentCharId: PropTypes.func,
}

function List({charsListInfo, updateCurrentCharId}) {
    const cardsRefs = [];

    const addRefToElem = (elem) => {
        cardsRefs.push(elem);
    }

    const onClickCard = (id) => {
        updateCurrentCharId(id);

        cardsRefs.forEach((elem) => {
            elem.classList.remove('char__item_selected');
            if (Number(elem.dataset.id) === id) {
                elem.classList.add('char__item_selected');
            }
        });
    }

    const list = charsListInfo.map((char) => <CharCard onClickCard={onClickCard} addRefToElem={addRefToElem} key={char.id} id={char.id} name={char.name} thumbnail={char.thumbnail} />)
    return (
        <ul className="char__grid">
            {list}
        </ul>
    )
}

List.propTypes = {
    charsListInfo: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        homepage: PropTypes.string,
        wiki: PropTypes.string,
        comics: PropTypes.arrayOf(PropTypes.shape({
            available: PropTypes.number,
            collectionURI: PropTypes.string,
            items: PropTypes.shape({
                resourceURI: PropTypes.string,
                name: PropTypes.string,
            })
        }))
    })),
    updateCurrentCharId: PropTypes.func,
}

export default CharList;