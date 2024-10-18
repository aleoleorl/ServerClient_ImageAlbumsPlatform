const baseUrl = 'http://localhost/cit_album/';

var apiAuth = 'http://localhost/cit_album/api/auth/index.php';
var apiRegister = 'http://localhost/cit_album/api/register/index.php';
var apiLogout = 'http://localhost/cit_album/api/logout/index.php';
var apiAddAlbum = 'http://localhost/cit_album/api/addAlbum/index.php';
var apiGetAlbums = 'http://localhost/cit_album/api/getAlbums/index.php';
var apiAddImage = 'http://localhost/cit_album/api/addImage/index.php';
var apiGetAlbumImagesData = 'http://localhost/cit_album/api/getAlbumImagesData/index.php';
var apiGetImage = 'http://localhost/cit_album/api/getImage/index.php';
var apiAddComment = 'http://localhost/cit_album/api/addComment/index.php';
var apiAddLike = 'http://localhost/cit_album/api/addLike/index.php';

var isUser = false;
var userName = "guest";
var userId=0;
let albumsArray = [];
let albumsDescArray = [];
var currentAlbum="";
var storageDataAlbums = [];
var imagesMap = {};
var currentImageId="";
var likes=0;