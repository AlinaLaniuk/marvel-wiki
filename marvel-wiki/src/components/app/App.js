import { useEffect, useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

function App() {
    const [charId, setCharId] = useState(null);

    const updateCurrentCharId = (newId) => {
        setCharId(newId);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList updateCurrentCharId={updateCurrentCharId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo currentCharId={charId} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )

}

export default App;