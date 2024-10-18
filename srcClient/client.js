$(document).ready(function() 
{	
    $('#signOutBtn').hide();
    showOverlay('#overlayAlbumList');

    getAlbums();

    formEventPreparation();
    formDragAndDropPreparation();
});

function formEventPreparation()
{
    $('#loginForm1').on('submit', function(event)
    {
        event.preventDefault();
        const login = $('#login').val();
        const password = $('#password').val();
        loging(login, password);
    });
    $('#loginForm2').on('submit', function(event)
    {
        event.preventDefault();
        const login = $('#login2').val();
        const password = $('#password2').val();
        const mail = $('#mail2').val();
        register(login, password, mail);
    });
    $('#loginForm3').on('submit', function(event)
    {
        event.preventDefault();
        const name = $('#name').val();
        const desc = $('#desc').val();
        requestAddAlbum(name, desc);
    });     
}

function showOverlay(overlay, isHide = true) 
{
    if (isHide)
    {
        $('#overlayLogin').hide();
        $('#overlayRegister').hide();
        $('#overlayAddAlbum').hide();
        $('#overlayAlbum').hide();
        $('#overlayAlbumList').hide();
        $('#overlayAddImage').hide();
        $('#overlayImage').hide();
    }
    $(overlay).show();
}

function clearOverlayWarningLabel() 
{
    $('#overlayAddAlbumLabel').text("");
    $('#overlayLoginLabel').text("");
    $('#overlayRegisterLabel').text("");

    $('#login').val("");
    $('#login2').val("");
    $('#password').val("");
    $('#password2').val("");
    $('#mail2').val("");
    $('#desc').val("");

    $('#information').text("Albums");
}

function onClickLoginBtn() 
{
    showOverlay('#overlayLogin');
}

function onClickRegisterBtn() 
{    
    showOverlay('#overlayRegister');
} 

function onClickSignOutBtn() 
{
    clearOverlayWarningLabel();
    logoutUser();
} 

function closeOverlayLogin()
{
    clearOverlayWarningLabel();
    showOverlay('#overlayAlbumList');
    getAlbums();
}
function closeOverlayRegister()
{
    clearOverlayWarningLabel();
    showOverlay('#overlayAlbumList');
    getAlbums();
}
function closeOverlayAddAlbum()
{
    clearOverlayWarningLabel();
    showOverlay('#overlayAlbumList');
    getAlbums();
}
function closeOverlayAddImage()
{
    clearOverlayWarningLabel();
    showOverlay('#overlayAlbum');
    showTheAlbum();
    $('#information').text("Album \"" + currentAlbum + "\"");
}