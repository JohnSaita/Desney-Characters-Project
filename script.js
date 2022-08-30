// Querry Character Name
const charName =document.querySelector('h3');
//Querry Character Image
const charImg =document.querySelector('#image')



//random number
const num =Math.floor(Math.random()*50);
const num2=Math.floor(Math.random()*50);


//GET data from Disney API

fetch('https://api.disneyapi.dev/characters')
.then(res=>res.json())
.then(data=>{
  charName.innerText=data.data[num].name;
  charImg.src=data.data[num].imageUrl;


//Configuring sidebr characters
    //querry sidebar characters
const sidebarChar=document.getElementsByClassName('preview');


for(val of sidebarChar){
  const num2=Math.floor(Math.random()*50);

  const image=val.querySelector('img')
  const char=val.querySelector('.char')
  char.style.textAlign="center"
  char.style.color='red'
  image.src= data.data[num2].imageUrl;
  char.innerText = data.data[num2].name;

  //setting onclick listener to the sidebar div
  val.addEventListener('click', ()=>{
    charName.innerText = char.innerText;
    charImg.src = image.src;
  })
}

  //configuring search button
  const searchBtn = document.querySelector('#search-form');

    //querry user input

  searchBtn.addEventListener('submit', (e) => {
    const searchInput=document.querySelector('#search').value
    e.preventDefault();
    const array = data.data;
    const searchObj = array.find(isTrue);

    function isTrue(char) {
      return char.name === searchInput;
    }
    if (typeof array.find(isTrue) != 'undefined') {
      charName.innerText = searchObj.name;
      charImg.src = searchObj.imageUrl
    } else {
      charName.innerText = 'Character Does Not Exist Try Again'
      charImg.src="./images/dne.png"
    }
    searchBtn.reset()
  })
})

//like and dislike button configuration

  //like button configuration

const like=document.querySelector('#like');
let count =0

like.addEventListener('click',()=>{
 count++
 like.innerHTML=`${count} &#128077;`
})

  //dislike button configuration
  let disCount=0;
const dislike =document.querySelector('#dislike');
dislike.addEventListener('click',()=>{
  disCount++
  dislike.innerHTML=`${disCount} &#128078; `

})

//adding comments and user names
    //Querry userName

    const form =document.querySelector('#form');

form.addEventListener('submit',(e)=>{


let user=form.querySelector('#userName').value;
const comment=form.querySelector('textarea').value;

  e.preventDefault();
  if(user==='' && comment!=''){
    user='Anonymous-User';
    submitEvent(user,comment);
  }else if(user !='' && comment ===''){
    alert('Add comment first')
  }else if(user==='' && comment===''){
    alert('add comment first');
  }
  else{
    submitEvent(user,comment)
  }
})
function submitEvent(user,comment){

  const d =new Date();
  const year=d.getFullYear();
  const month=d.getMonth();
  const date =d.getDate();

  let day=`${date}/${month}/${year}`

  const li =document.createElement('li');
  li.innerHTML=`<span>${user}: ${day} </span><p>${comment}</p>`
  form.querySelector('ul').appendChild(li);
  form.reset()
}


