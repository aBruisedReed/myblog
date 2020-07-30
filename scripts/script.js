function moveToWrite() {
  let title = document.getElementById("write_input").value;
  window.localStorage.setItem('temp', title); //제목 데이터 저장
  location.href='write_article.html';
}

function writeButton() {
  let para = CKEDITOR.instances.editor1.getData();
  let title = document.getElementById('title_write').value;
  console.log("title:"+title);
  console.log("article:"+para);
  addList(title, para);
  let arr = JSON.parse(window.localStorage.getItem('list'));
  location.href='index.html';
}

function loadTitle() { //메인에서 적은 임시 제목 가져오기
  document.getElementById('title_write').value = window.localStorage.getItem('temp');
}

function addList(title, para) {
  if(window.localStorage.getItem('list') == null) { //리스트가 비어있다면 초기화
    window.localStorage.setItem('list', JSON.stringify([]));
  }
  let arr = JSON.parse(window.localStorage.getItem('list'));
  let obj = {};
  obj.title = title;
  obj.para = para;
  obj.date = new Date();
  obj.like = 0;
  arr.push(obj);
  window.localStorage.setItem('list', JSON.stringify(arr));
}

function loadList() { //메인에서 글 불러오는 함수
  let arr = JSON.parse(window.localStorage.getItem('list'));
  // console.log(arr);
  
  for(let i=arr.length-1; i>=0; i--) {
    // let like = arr[i].like; 메인에서 보일 필요가 없다.
    let article = document.getElementById("art");
    let img = document.createElement("img");
    img.setAttribute("src", "https://loremflickr.com/320/240?lock="+Math.floor(Math.random()*200));
    //랜덤이미지, 로딩이 느리므로 로컬로 저장해서 쓰는게 나을듯.
    let tt = document.createElement("h3");
    tt.innerHTML = arr[i].title;
    tt.setAttribute("id", "index_article_title");
    let p = document.createElement("p");
    p.setAttribute("id", "index_article_p");
    p.innerHTML = arr[i].para;
    let newDiv = document.createElement("div");
    newDiv.appendChild(img);
    newDiv.appendChild(tt);
    newDiv.appendChild(p);
    newDiv.setAttribute("class", "articles")
    newDiv.setAttribute("onclick", "moveShow()");
    newDiv.setAttribute("style", "cursor: pointer");
    article.appendChild(newDiv);
  }
}

function findList() {
  let arr = JSON.parse(window.localStorage.getItem('list'));
  for(let i=0; i<arr.length; i++) {
    if(arr[i].title == window.localStorage.getItem('temp')) {
      console.log("find!"+arr[i].title);
      return i;
    }
  }
}

function moveShow() {
  document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    while(target.nodeName != 'DIV') {
      target = target.parentNode;
    }
    target = target.childNodes[1];
    // console.log("target:"+target.innerHTML);
    window.localStorage.setItem('temp', target.innerHTML);
  }, false);
  location.href='show_article.html';
}

function showArticle() {
  let arr = JSON.parse(window.localStorage.getItem('list'));
  let i = findList();
  let article = document.getElementById('article');
  let img = document.createElement("img");
  img.setAttribute("src", "https://loremflickr.com/320/240?lock="+Math.floor(Math.random()*200));
  //랜덤이미지, 로딩이 느리므로 로컬로 저장해서 쓰는게 나을듯.
  img.setAttribute("id", "photo");
  let tt = document.createElement("h2");
  tt.innerHTML = arr[i].title;
  let p = document.createElement("p");
  p.innerHTML = arr[i].para;
  let likeBtn = document.createElement("button");
  likeBtn.setAttribute("id", "like_button");
  likeBtn.setAttribute("onclick", "likeClicked()");
  likeBtn.innerHTML = "♥︎ Like";
  let likeCount = document.createElement("span");
  likeCount.setAttribute("id", "like_count");
  likeCount.innerHTML = arr[i].like;
  let newDiv = document.createElement("div");
  // newDiv.setAttribute("id", "article")
  newDiv.appendChild(img);
  newDiv.appendChild(tt);
  newDiv.appendChild(p);
  newDiv.appendChild(likeBtn);
  newDiv.appendChild(likeCount);
  newDiv.setAttribute("onclick", "moveShow()");
  newDiv.setAttribute("style", "cursor: pointer");
  article.appendChild(newDiv);
  arr[i]
}