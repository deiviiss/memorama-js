const urlApi = 'https://rickandmortyapi.com/api/character';
export class API_Rick_Morty {

  async getCharacters() {

    const response = await fetch(urlApi);

    const data = await response.json();

    return data;
  }
}

// pokemon
// dragonball