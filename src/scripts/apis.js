const urlApi = 'https://rickandmortyapi.com/api/character';
export class API_Rick_Morty {

  async getCharacters() {

    let allData = [];
    let url = urlApi;

    for (let i = 0; i < 11; i++) {
      const response = await fetch(url);
      const data = await response.json();

      allData = allData.concat(data.results);
      url = data.info.next;
    }

    //! Se esta tardando unos dos segundos en juntar todos los datos.
    return allData;
  }
}

// pokemon
// dragonball