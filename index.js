//Get element for html
const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');
let photoArray = [];
let ready = false;
let imageLoad = 0;
let totalImage = 0;
let count = 10;
// image loading fucntion
function loadImage() {
  imageLoad++;
  if (imageLoad === totalImage) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }

}
//API setup


const apiKey = 'EbjZJWCeniA36buH0PyrfXl9t8pfA2Knp-JK1GeiRO4'; //expensive Api
// const apiKey ='8jP3xQitHC3uClSdvWSwyrZVguDmUf_Q1L1pVTz1b7U';
// const apiKey = '-lU3AJ9ouM_EaUB8FzuLw_YrnPXBO0_fwmyndrTTKDA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//create function to set attrubute
function setAttributes(element, attrubutes) {
  for (const key in attrubutes) {
    element.setAttribute(key, attrubutes[key])
  }

}

//Adding photos

function displayPhoto() {
  imageLoad = 0;
  totalImage = photoArray.length;
  photoArray.forEach((photo) => {
    //creating a tag
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target','_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //creating img tag
    const img = document.createElement('img');
    // img.setAttribute('src',photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // btn.setAttribute('');
    img.addEventListener('load', loadImage)

    // put img and a tag in image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  })
}

//Api Call

async function getPhoto() {

  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray[0].links.download);
    displayPhoto();
    // console.log(data[0].urls.regular);
    // console.log(data);
  } catch (err) {
    //catch error here
    console.log(err)
  }
}

// load more pic while coming to end 

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhoto();
  }
})
//call function

getPhoto();