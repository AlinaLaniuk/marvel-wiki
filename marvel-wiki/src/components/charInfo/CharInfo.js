import { Component } from 'react';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.currentCharId = props.currentCharId;
        this.state = {
            char: {},
            loading: false,
            error: false,
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = (char) => {
        this.setState((prevState) => { return { ...prevState, char, loading: false } })
    }

    onCharLoading = () => {
        this.setState({ loading: true });
        this.updateChar();
    }

    updateChar = () => {
        if (!this.currentCharId) {
            return;
        }
        this.marvelService.getCharacter(this.currentCharId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        return (
            <div className="char__info">
                <View charInfo={this.state.char} />
            </div>
        )
    }
}

const View = ({ id, name, description, thumbnail, homepage, wiki, comics }) => {
    const comicsList = comics.map((comic) => <Comic name={comic.name} />);
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList}
            </ul>
        </>
    )
}

const Comic = ({ name }) => {
    return (
        <li className="char__comics-item">
            {name}
        </li>
    )
}

export default CharInfo;