import { Component } from 'react';

import CharCard from '../charCard/CharCard';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {
    state = {
        charsListInfo: null,
        loading: true
    }

    marvelService = new MarvelService();

    onCharsListLoaded = (charsListInfo) => {
        this.setState({ charsListInfo: charsListInfo, loading: false })
    }

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharsListLoaded)
    }
    render() {
        const { charsListInfo, loading } = this.state;
        const spinner = loading ? <Spinner />  : null;
        const content = !loading ? <List charsListInfo={charsListInfo}/> : null;
        return (
            <div className="char__list">
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const List = ({charsListInfo}) => {
    const list = charsListInfo.map((char) => <CharCard key={`${char.name}${char.src}`} name={char.name} thumbnail={char.thumbnail}/>)
    return (
        <ul className="char__grid">
            {list}
        </ul>
    )
}

export default CharList;