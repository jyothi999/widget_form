let i;
let clockId;
let time = 0;
let clockOff = true;
let arrayData = [];
let urlString =
  "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1";

let ourRequest = new XMLHttpRequest();
ourRequest.open("GET", urlString);

ourRequest.onload = function() {
  let ourData = JSON.parse(ourRequest.responseText);
  arrayData = ourData.articles;
  for (i = 0; i <= arrayData.length; i++) {
    console.log(arrayData[i].title);

    let x = document.createElement("LI");
    let div = document.createElement("DIV");
    div.setAttribute("class", "card");
    let div1 = document.createElement("DIV");
    if (arrayData[i].urlToImage) {
      div1.setAttribute("id", "auto-resize-image");
      div1.style.backgroundImage = "url(" + arrayData[i].urlToImage + ")";
    }
    div.appendChild(div1);

    let div2 = document.createElement("DIV");
    div2.setAttribute("class", "infoContainer");
    div2.setAttribute("id", "dataContainer");

    let source = document.createElement("H3");
    source.setAttribute("id", "newsSrc");
    source.append(arrayData[i].source["name"]);

    let name = document.createElement("H4");
    name.setAttribute("id", "name");
    if (arrayData[i].author) {
      name.append(arrayData[i].author);
    }

    let titleHtml = document.createElement("H5");
    titleHtml.setAttribute("id", "title");

    let publish = document.createElement("H6");
    publish.setAttribute("id", "publishedAt");
    let ts = new Date(arrayData[i].publishedAt);
    publish.append(ts.toGMTString());

    let desc = document.createElement("P");
    desc.setAttribute("id", "description");
    desc.append(arrayData[i].description);

    let content = document.createElement("p");
    content.setAttribute("id", "articleCont");
    content.append(arrayData[i].content);

    let readMore = document.createElement("A");
    readMore.setAttribute("id", "moreUrl");
    readMore.setAttribute("href", arrayData[i].url);
    let r = document.createTextNode("Read More....");
    readMore.appendChild(r);

    div.appendChild(div2);

    x.appendChild(div);
    div2.appendChild(source);
    div2.appendChild(name);
    div2.appendChild(publish);
    div2.appendChild(titleHtml);
    div2.appendChild(desc);
    div2.appendChild(content);
    div2.appendChild(readMore);
    document.getElementById("newsEle").appendChild(x);

    titleHtml.append(arrayData[i].title);
  }
};
ourRequest.send();

function showMore() {
  //removes the link
  document.getElementById("moreUrl").style.display = "none";
  //shows the #more
  document.getElementById("articleCont").style.display = "block";
}

setTimeout(function() {
  location.reload();
}, 30000);

if (clockOff) {
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
  clockOff = false;
}
function displayTime() {
  const clock = document.getElementById("clock");
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function searchFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("newsEle");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("div")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
