const baseUrl = 'https://gateway.marvel.com:443/v1/public/';

const apiKey = 'a31fc3f76b417fa89c0f41438d31c4ba';

const charsOnPage = 9;

const startOffset = 1550;

class MarvelService {
    _baseOffset = startOffset;

    gerResources = async (url) => {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const result = await this.gerResources(`${baseUrl}characters?limit=${charsOnPage}&offset=${offset}&apikey=${apiKey}`);
        return result.data.results.map(this._transformCharacter);
    }

    getCharacter = async (charId) => {
        const result = await this.gerResources(`${baseUrl}characters/${charId}?apikey=${apiKey}`);
        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (characterInfo) => {
        return {
            id: characterInfo.id,
            name: characterInfo.name,
            description: characterInfo.description,
            thumbnail: `${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`,
            homepage: characterInfo.urls[0].url,
            wiki: characterInfo.urls[1].url,
            comics: characterInfo.comics.items
        }
    }
}

export default MarvelService;