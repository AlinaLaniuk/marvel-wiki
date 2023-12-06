import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss'; 

const maxComicsOnPage = 10;
const noComicsMessage = 'Sorry, there is no information about comics.';
class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: null,
            loading: false,
            error: false,
        }
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(this.props.currentCharId !== prevProps.currentCharId){
            this.updateChar();
        }
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = (char) => {
        this.setState((prevState) => { return { ...prevState, char: char, loading: false } })
    }

    updateChar = () => {
        if (!this.props.currentCharId) {
            return;
        }
        this.setState({ loading: true });
        this.marvelService.getCharacter(this.props.currentCharId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner />  : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = (props) => {
    const { id, name, description, thumbnail, homepage, wiki, comics } = props.char;
    const comicsList = [];
    if(comics.length){
        for(let i = 0; i < maxComicsOnPage; i++){
            const comic = comics[i];
            if(comic){
                comicsList.push(<Comic key={comics[i].name} name={comics[i].name} />)
            }
        }
    }

    const comicsContent = comicsList.length ? comicsList : noComicsMessage;
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
                {comicsContent}
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