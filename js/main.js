var follow_list = [
  '136845026417486',//柯文哲
  '481065478629613',//The News Lens 關鍵評論網
]

DisplayPosts = function(posts) {
  var elem = document.querySelector("#columns")
  elem.innerHTML += posts.map(function(post){
    return "<div class='pin'>\
              <img src='" + post.full_picture + "'>\
              <p>" + post.message + "</p>\
              <p>" + post.created_time + "</p>\
            </div>"
  }).join('\n')
}

ValidPictureFilter = function(posts) {
  return posts.filter(function(post){
    return /^https/.exec(post.full_picture)
  })
}

ExtractPictureURLs = function(response) {
  return response.map(function(obj){
    return obj.full_picture
  }).filter(function(url){
    return /^https/.exec(url)
  })
}

yo = function() {
  for (var i in follow_list) {
    (new FBApi).queryPage(follow_list[i])
    .then(ValidPictureFilter)
    .then(DisplayPosts)  
  }
}

function FBApi (){
  this.queryPage = function(page) {
    return new Promise(function(resolve, reject) {
      FB.api(page + '/posts?fields=message,id,full_picture,created_time', function(response) {
        resolve(response.data)
      })
    })
  }
  this.callKP = function() {
    return new Promise(function(resolve, reject) {
      FB.api('136845026417486/posts?fields=message,id,full_picture,created_time', function(response) {
        resolve(response.data)
      })
    })
  }
}