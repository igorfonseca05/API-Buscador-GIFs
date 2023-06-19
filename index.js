
const form = document.querySelector('form')
const out = document.querySelector('.out')
const button = document.querySelector('button')

const getGif = async (textInput) => {
  try {
    const response = await
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=q80WpgPaNzCH0RIELuI49xcNU6ikEWI0&limit=1&q=${textInput}`)

    if (!response.ok) {
      throw new Error('Não foi possível obter os dados')
    }

    return response.json()

  } catch (error) {
    console.log(error)
  }

}

const showGifOnScreen = async (textInput) => {
  const gif = await getGif(textInput);

  if (gif) {
    const image = document.createElement('img')
    image.setAttribute('src', `${gif.data[0].images.downsized.url}`)
    image.setAttribute('alt', `${gif.data[0].title}`)
    out.insertAdjacentElement('afterbegin', image)
  }

}

button.addEventListener('click', ()=> {
  button.setAttribute('class', 'buttonmove')
})

button.addEventListener('click', ()=> {
  button.classList.remove('buttonmove')
})

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const textInput = event.target.search.value;

  if (textInput.length) {
    getGif(textInput)
    showGifOnScreen(textInput)
  }

  event.target.reset();
})
