import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Image from '../image/Image';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const noDescriptionText = 'Sorry, here is no description.'

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    onError = () => {
        this.setState({ loading: false, error: true });
    }

    onCharLoaded = (char) => {
        this.setState((prevState) => { return { ...prevState, char, loading: false } })
    }

    onCharLoading = () => {
        this.setState({loading: true});
        this.updateChar();
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner />  : null;
        const content = !(loading || error) ? <View char={char}/> : null;

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
                    <button onClick={this.onCharLoading} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const isImageNotFoundStyle = {objectFit: 'contain'};
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