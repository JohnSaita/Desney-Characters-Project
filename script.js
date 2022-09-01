
  //Character json-server URL
  const url = 'https://api.disneyapi.dev/characters';
  const URL = 'http://localhost:3000/characters';
  // Querry Character Name
  const charName = document.querySelector('h3');
  //Querry Character Image
  const charImg = document.querySelector('#image');

  //querry like and Dislike Button button
  const like = document.querySelector('#like');
  const dislike = document.querySelector('#dislike');



  //random number
  const num = Math.floor(Math.random() * 50);



  //-------------------GET data from Disney API-------------------------------

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const desneyData=data.data

          //-----------------search and comment----------------------------------------
          //configuring search button
          const searchBtn = document.querySelector('#search-form');

          //querry user input
          searchBtn.addEventListener('submit', (e) => {
            const searchInput = document.querySelector('#search').value
            e.preventDefault();
            const array = desneyData;
            const searchObj = array.find(isTrue);

            function isTrue(char) {
              return char.name === searchInput;
            }
            if (typeof array.find(isTrue).name != 'undefined') {
              charName.innerText = searchObj.name;
              charImg.src = searchObj.imageUrl;
              likeBtn();
              fetch(URL)
                .then(res => res.json())
                .then(data => {
                  const charLocal = data.find(obj);
                  function obj(char) {
                    return char.name===charName.innerText
                  }
                  if (charLocal === undefined) {
                    fetchMethod(URL, 'POST', {
                      'name': charName.innerText,
                      'imageUrl': charImg.src,
                      'likes': like.innerText,
                      'dislike': dislike.innerText
                    });
                  } else {
                    fetchMethod(`${URL}/${charLocal.id}`, 'PATCH', {
                      'likes': like.innerText,
                      'dislike': dislike.innerText
                    })
                  }
              })



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
          charName.innerText = desneyData[num].name;
      charImg.src = desneyData[num].imageUrl;
      fetch(URL)
        .then(res=>res.json())
        .then(dataLocal => {
          const charSearch = dataLocal.find(isAvailable)
          function isAvailable(char) {
            return char.imageUrl===charImg.src
          }
          if (charSearch === undefined) {
            fetchMethod(URL, 'POST', {
              'name': charName.innerText,
              'imageUrl': charImg.src,
              'likes': 0,
              'dislike':0
            })
            likeBtn()
          }
        });



          //Configuring sidebr characters
          //querry sidebar characters
          const sidebarChar = document.getElementsByClassName('preview');


          for (val of sidebarChar) {
            const num2 = Math.floor(Math.random() * 50);
            const image = val.querySelector('img')
            const char = val.querySelector('.char')
            char.style.textAlign = "center"
            char.style.color = 'red'
            image.src = desneyData[num2].imageUrl;
            char.innerText = desneyData[num2].name;
            //setting onclick listener to the sidebar div
            val.addEventListener('click', () => {
              charName.innerText = char.innerText;
              charImg.src = image.src;
              likeBtn();
            });
          }
          //-----------------------------------------------------------------------------------


          //-------------Setting Like and Dislike Button------------------------------------------

          likeBtn()
          function likeBtn() { //like and dislike button configuration

            //like button configuration

            fetch(URL)
              .then(res => res.json())
              .then(dataLocal => {
                const itemChar = dataLocal.find(isAvailable)
                function isAvailable(char) {
                  return char.imageUrl === charImg.src
                }
                if (itemChar != undefined) {

                  let count = itemChar.likes
                  like.innerHTML = count;

                  like.addEventListener('click', () => {
                    count++
                    like.innerHTML = count

                    // const characterFound = data.find((item) => item.imageUrl === charImg.src)

                    //updating likes on the server
                    fetchMethod(`${URL}/${itemChar.id}`, 'PATCH', { 'likes': count })

                  });
                  //dislike button configuration
                  let disCount = itemChar.dislike
                  dislike.innerHTML = disCount
                  dislike.addEventListener('click', () => {
                    disCount++
                    dislike.innerHTML = disCount
                    //updating dislikes on the server
                    fetchMethod(`${URL}/${itemChar.id}`, 'PATCH', { 'dislike': disCount });

                  });
                }

              });


          }
          //--------------------------------------------------------------------------------------
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

