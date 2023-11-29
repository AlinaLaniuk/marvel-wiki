const baseUrl = 'https://gateway.marvel.com:443/v1/public/';

const apiKey = 'a31fc3f76b417fa89c0f41438d31c4ba';

const charsOnPage = 9;

const totalCharsQuantity = 210;

class MarvelService {
    gerResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.gerResources(`${baseUrl}characters?limit=${charsOnPage}&offset=${totalCharsQuantity}&apikey=${apiKey}`);
    }

    getCharacter = (charId) => {
        return this.gerResources(`${baseUrl}characters/${charId}?apikey=${apiKey}`);
    }
}

export default MarvelService;