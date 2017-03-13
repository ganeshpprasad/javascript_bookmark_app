// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmarks);

// Site bookmarking
function saveBookmarks(e){

  // Get form variablse
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {

  }

  var bookmarkItem = {
    name: siteName,
    url: siteUrl
  }

  // Local storage test
  // localStorage.setItem('test', 'Hello');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

// Test if bookmarks array exists
  if (localStorage.getItem('bookmarkArray') === null ) {
    // Init array
    var bookmarks = [];
    bookmarks.push(bookmarkItem);
// Add to localStorage
    localStorage.setItem('bookmarkArray', JSON.stringify(bookmarks));
  } else{
    // fetch bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarkArray'));
    // Add bookmark to array
    bookmarks.push(bookmarkItem);
    // console.log( JSON.parse(localStorage.getItem('bookmarkArray')) );
    // console.log( bookmarks );
    // Re set it to localStorage
    localStorage.setItem("bookmarkArray", JSON.stringify(bookmarks));
  }


    // Re fetchBookmarks
    fetchBookmarks();

    // Clear form
    document.getElementById('myForm').reset();

  // console.log(bookmark);

  // Prevent from form submitting
  e.preventDefault();

}

// deleteBookmark
function deleteBookmark(url){

  //  get bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarkArray'));
  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Delete the entry
          bookmarks.splice(i,1);
    }
  }

  // Re set it to localStorage
  localStorage.setItem("bookmarkArray", JSON.stringify(bookmarks));

  // Re fetchBookmarks
  fetchBookmarks();

}

// Fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarkArray'));

  var bookmarkResults = document.getElementById('bookmarksResults');

  // Build output
  bookmarkResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">' +
                                    ' <h3> ' + name +
                                    ' <a class="btn btn-default" target="_blank" href="' + url + '" >Visit</a> ' +
                                    ' <a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#" >Delete</a> ' +
                                    ' </h3> ' +
                                    ' </div> ';
  }
}

function validateForm(siteName, siteUrl){
  if (!siteName || !siteUrl) {
    alert("Please fill in form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please enter valid url");
    return false;
  }
  return true;
}
