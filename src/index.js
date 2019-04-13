import './scss/style.scss'
import axios from 'axios'
import app from './modules/state'


let button = document.querySelector('button')
button.onclick = e=>{
  app.setState('FETCHING_DATA', getBook)
}

const getBook = ()=>{
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699`)
    .then(response=>{
      app.setState('DATA_RETRIEVED', ()=>{ organizeData(response) })
    })
    .catch(err=>{
      console.log(err)
    })
}

const organizeData = response=>{
  let data = {
    title: response.data.items[0].volumeInfo.title
    ,author: response.data.items[0].volumeInfo.authors[0]
    ,datePublished: response.data.items[0].volumeInfo.publishedDate
    ,description: response.data.items[0].volumeInfo.description
  }
  dataToHtml(data)
}

const dataToHtml = data=>{
  let content = document.querySelector('#content')
  content.innerHTML = ''
  for(let key in data){
    let elt = `
      <div>
        <div>${data[key]}</div>
      </div>
      <br>
    `
    content.innerHTML+=elt
  }
  app.setState('VIEW_UPDATED')
}
