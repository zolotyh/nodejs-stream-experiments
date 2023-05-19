const API_URL = 'http://localhost:3000';
const URL = '/long-json-stream'


const bufferedAPICall = async () => {
  return await fetch(`${API_URL}${URL}`).then((data) => data.json());
}

const streamApiCall = () => {
  return fetch(`${API_URL}${URL}`);
}

const initialize = () => {
  document.querySelector('.server-stream').addEventListener('click', async () => {
    const resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = 'Loading... (long request and buffer on browser side)'
    const data = await bufferedAPICall();

    resultDiv.innerHTML = '';
    const ul = document.createElement('ul');
    resultDiv.appendChild(ul);

    data.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `${JSON.stringify(item)}`
      ul.appendChild(li);
    });
  });

  document.querySelector('.full-stream').addEventListener('click', async () => {
    const chunks = [];
    const resultDiv = document.querySelector('.result');

    resultDiv.innerHTML = 'Loading...'
    const response = await fetch(`${API_URL}${URL}`).then((data) => data.body.getReader());

    let decoder = new TextDecoder("utf-8")


    let isRendered = false;
    let ul;

    while (true) {
      const { done, value } = await response.read();

      if (done) {
        break;
      }

      let textValue = decoder.decode(value);

      if(textValue.startsWith('[')){
        textValue = textValue.substring(1)
      }

      if(textValue.endsWith(']')){
        textValue = textValue.substring(0, value.length - 1)
      }

      if(textValue){

        if(!isRendered){
          isRendered = true;
          resultDiv.innerHTML = '';
          ul = document.createElement('ul');
          resultDiv.appendChild(ul);
        }

        textValue.split(',').forEach((item) => {
          if(!item) return;
          const li = document.createElement('li');
          li.innerHTML = item;
          ul.appendChild(li);
        })
      }

      chunks.push(value);
      console.log('chunk', textValue);
    }
  });
}

initialize();
