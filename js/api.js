const urlApi = 'https://rickandmortyapi.com/api/character'

async function getData() {
  const response = await fetch(urlApi)
    .then((response) => {
      return response.json()
    })
  const data = response

  console.log(data);
  return data
}

getData()