import { Component } from 'react';

import CharCard from '../charCard/CharCard';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const charsOnPage = 9;

const startOffset = 1550;

class CharList extends Component {
    constructor(props) {
        super(props);
        this.updateCurrentCharId = props.updateCurrentCharId;
    }

    state = {
        charsListInfo: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: startOffset,
        noMoreChars: false
    }

    marvelService = new MarvelService();

    onCharsListLoaded = (charsListInfo) => {
        this.setState((prevState) => {
            const newCharListState = [...prevState.charsListInfo, ...charsListInfo];
            if(charsListInfo.length < charsOnPage){
                return { charsListInfo: newCharListState, loading: false, newItemLoading: false, noMoreChars: true }
            }
            return { charsListInfo: newCharListState, loading: false, newItemLoading: false }
        });
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    componentDidMount() {
        this.onRequest();
    }

    onCharListLoading = () => {
        this.setState({ newItemLoading: true });
    }

    onRequest = () => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(this.state.offset)
            .then(this.onCharsListLoaded)
            .catch(this.onError);
        this.setState(({ offset }) => ({ offset: offset + charsOnPage }));
    }

    render() {
        const { charsListInfo, loading, error, newItemLoading, noMoreChars } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !loading ? <List updateCurrentCharId={this.updateCurrentCharId} charsListInfo={charsListInfo} /> : null;
        const buttonStyle = noMoreChars ? {display: 'none'} : null;
        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}
                <button
                    onClick={this.onRequest}
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={buttonStyle}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const List = ({ charsListInfo, updateCurrentCharId }) => {
    const list = charsListInfo.map((char) => <CharCard key={char.id} id={char.id} updateCurrentCharId={updateCurrentCharId} name={char.name} thumbnail={char.thumbnail} />)
    return (
        <ul className="char__grid">
            {list}
        </ul>
    )
}

export default CharList;