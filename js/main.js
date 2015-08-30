
DisplayPosts = function(urls) {
  console.log(urls)
  var elem = document.querySelector("#posts")
  elem.innerHTML = urls.map(function(url){
    return "<img src='" + url + "'>"
  }).join('\n')
}

ExtractPictureURLs = function(response) {
  return response.map(function(obj){
    return obj.picture
  }).filter(function(url){
    return /^https/.exec(url)
  })
}

yo = function() {
  (new FBApi).callKP()
    .then(ExtractPictureURLs)
    .then(DisplayPosts)
}

function FBApi (){
  this.callKP = function() {
    return new Promise(function(resolve, reject) {
      FB.api('136845026417486/posts?fields=message,id,picture,created_time', function(response) {
        resolve(response.data)
      })
    })
  }
}