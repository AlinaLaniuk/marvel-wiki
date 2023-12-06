import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        currentCharId: 1011096,
    }

    updateCurrentCharId = (newId) => {
        this.setState({currentCharId: newId});
    }

    render() {
        const {currentCharId} = this.state;
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList updateCurrentCharId={this.updateCurrentCharId}/>
                        <CharInfo currentCharId={currentCharId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;