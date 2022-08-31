document.addEventListener('DOMContentLoaded', () => {

  //Character json-server URL
  const url = 'https://api.disneyapi.dev/characters';
  const URL = 'https://my-json-server.typicode.com/JohnSaita/Desney-Characters-Project/characters';
  // Querry Character Name
  const charName = document.querySelector('h3');
  //Querry Character Image
  const charImg = document.querySelector('#image');

  //querry like and Dislike Button button
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');



  //random number
  const num = Math.floor(Math.random() * 50);
  const num2 = Math.floor(Math.random() * 50);


//-------------------GET data from Disney API-------------------------------

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //-------------send Data to Local Server------------------------------
      //Pesting Disney character to json server
      let desneyData = data.data
      fetch(URL)
        .then(res => res.json())
        .then(data => {
          if (data.length === 0) {
            //push data to json server
            for (item of desneyData) {
              fetchMethod(URL, 'POST', {
                'name': item.name,
                'imageUrl': item.imageUrl,
                'likes': 0,
                'dislike': 0,
                'comments': []
              })
            }
          }
        });
      //----------------------------------------------------------------------------
    });
  //--------------------------Fetching Data from Local api--------------------------
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      //-----------------search and comment----------------------------------------
      //configuring search button
      const searchBtn = document.querySelector('#search-form');

      //querry user input
      searchBtn.addEventListener('submit', (e) => {
        const searchInput = document.querySelector('#search').value
        e.preventDefault();
        const array = data;
        const searchObj = array.find(isTrue);

        function isTrue(char) {
          return char.name === searchInput;
        }
        if (typeof array.find(isTrue).name != 'undefined') {
          charName.innerText = searchObj.name;
          charImg.src = searchObj.imageUrl;


        } else {
          charName.innerText = 'Character Does Not Exist'
          charImg.src = "./images/dne.png"

        }
        searchBtn.reset()
      });

      //adding comments and user names
      //Querry userName

      const form = document.querySelector('#form');

      form.addEventListener('submit', (e) => {


        let user = form.querySelector('#userName').value;
        const comment = form.querySelector('textarea').value;

        e.preventDefault();
        if (user === '' && comment != '') {
          user = 'Anonymous-User';
          submitEvent(user, comment);
        } else if (user != '' && comment === '') {
          alert('Add comment first')
        } else if (user === '' && comment === '') {
          alert('add comment first');
        }
        else {
          submitEvent(user, comment)
        }
      });

      //Displaying comments on DOM

      function submitEvent(user, comment) {

        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const date = d.getDate();

        let day = `${date}/${month}/${year}`

        const li = document.createElement('li');
        li.innerHTML = `<span>${user}: ${day} </span><p>${comment}</p>`
        form.querySelector('ul').appendChild(li);
        form.reset()
      }
//--------------------------------------------------------------------------------------

 //---------------setting character displayed on the Page--------------------
      charName.innerText = data[num].name;
      charImg.src = data[num].imageUrl;

       //Configuring sidebr characters
            //querry sidebar characters
            const sidebarChar = document.getElementsByClassName('preview');


            for (val of sidebarChar) {
              const num2 = Math.floor(Math.random() * 50);

              const image = val.querySelector('img')
              const char = val.querySelector('.char')
              char.style.textAlign = "center"
              char.style.color = 'red'
              image.src = data[num2].imageUrl;
              char.innerText = data[num2].name;
              //setting onclick listener to the sidebar div
              val.addEventListener('click', () => {
                charName.innerText = char.innerText;
                charImg.src = image.src;
                like.innerHTML = `&#128077;`
                likeBtn()
                console.log('i have been clicked')
              });
            }
//-----------------------------------------------------------------------------------

//-------------Setting Like and Dislike Button------------------------------------------
      likeBtn()

      function likeBtn() { //like and dislike button configuration

        //like button configuration
        const itemChar=data.find((char)=>char.imageUrl === charImg.src)
        let count = itemChar.likes
        like.innerHTML = `${count} &#128077;`;

        like.addEventListener('click', () => {
          count++
          like.innerHTML = `${count} &#128077;`;

          for (item of data) {
            if (item.imageUrl === charImg.src) {
              //updating likes on the server
          fetchMethod(`${URL}/${item.id}`, 'PATCH', { 'likes': count });

            }
          }
        });
        //dislike button configuration
        let disCount = itemChar.dislike
        dislike.innerHTML = `${disCount} &#128078;`
        dislike.addEventListener('click', () => {
          disCount++
          dislike.innerHTML = `${disCount} &#128078;`
          //updating dislikes on the server
          // fetchMethod(`${URL}/${charId}`, 'PATCH', { 'dislike': disCount });
        });
      }
//--------------------------------------------------------------------------------------


    });
  //---------------------------------------------------------------------------------

    });
// Fetch Method POST AND PATCH
function fetchMethod(url, method, obj) {
  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(data => data)
  .catch(error=>console.log(error))
}

