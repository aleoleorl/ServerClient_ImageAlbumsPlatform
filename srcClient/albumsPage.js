function getAlbums()
{
    $.ajax(
    {
        url: apiGetAlbums,
        type: 'GET',
        success: function(response) 
        {
            let parsedResponse;
            try 
            {
                    parsedResponse = JSON.parse(response);
            } catch (e) 
            {
                    console.error('Could not parse JSON response: ', e);
                    parsedResponse = { status: 'NOK', message: 'Invalid response format' };
            }
        
            if (parsedResponse.status === 'OK' && parsedResponse.albums && parsedResponse.albums.length)
            {
                parsedResponse.albums.forEach(album => 
                {
                    if (!albumsArray.includes(album.name))
                    {
                        albumsArray.push(album.name);
                        albumsDescArray.push(album.description);
                    }
                });
                showAlbums();
            }        
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with getting albums');
        }
    });
}

function showAlbums() 
{
    $('#albumList')
    .css(
    {
        'display': 'flex',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
        'width': '75%',
        'margin': '0 auto',
        'padding': '30px'
    });
    
    const albumList = $('#albumList');
    albumList.empty();
    
    if (isUser) 
    {
        albumsAddButton();        
    }
    albumsListButton();        
}

function albumsAddButton()
{
    const albumList = $('#albumList');
    const addAlbumDiv = $('<div></div>')
    .css(
    {
        'margin': '10px',
        'flex': '1 1 calc(20% - 20px)',
        'max-width': 'calc(20% - 20px)',
        'text-align': 'center',
        'padding-top': '20px'
    });
    const addAlbumImg = $('<img src="imgClient/addAlbum.png" alt="creation">')
    .css(
    {
        'max-width': '100%',
        'height': 'auto',
        'display': 'block',
        'margin': '0 auto'
    });
    addAlbumDiv.append(addAlbumImg);
    addAlbumDiv.append('<label>add album</label>');
    addAlbumDiv.on('click', addAlbum);
    albumList.append(addAlbumDiv);
}

function albumsListButton()
{
    const albumList = $('#albumList');
    if (!albumsArray || albumsArray.length == 0)
    {
        return;
    }
    albumsArray.forEach(album => 
    {
        const albumDiv = $('<div></div>')
        .css(
        {
            'margin': '10px',
            'flex': '1 1 calc(20% - 20px)',
            'max-width': 'calc(20% - 20px)',
            'text-align': 'center',
            'padding-top': '20px'
        });
        const albumImg = $('<img src="imgClient/openAlbum.png" alt="Open Album">')
        .css(
         {
            'max-width': '100%',
            'height': 'auto',
            'display': 'block',
            'margin': '0 auto'
        });
        albumDiv.append(albumImg);
        albumDiv.append(`<label>${album}</label>`);
        albumDiv.on('click', function() 
        {
            openAlbum(album);
        });
        albumList.append(albumDiv);
    });
}

function addAlbum() 
{
    showOverlay('#overlayAddAlbum');
}

function openAlbum(albumName) 
{
    showOverlay('#overlayAlbum');
    $('#information').text("Album \"" + albumName + "\"");
    currentAlbum = albumName;
    showTheAlbum();
}

function requestAddAlbum(name, desc)
{
    $.ajax(
    {
        url: apiAddAlbum,
        type: 'POST',
        data: 
        {
            user: userName,
            name: name,
            desc: desc
        },
        success: function(response) 
        {
            let parsedResponse;
            try 
            {
                parsedResponse = JSON.parse(response);
            } catch (e) 
            {
                console.error('Could not parse JSON response: ', e);
                parsedResponse = { status: 'NOK', message: 'Invalid response format' };
            }
    
            if (parsedResponse.status === 'OK')
            {    
                showOverlay('#overlayAlbumList');
                clearOverlayWarningLabel();
                getAlbums();
            }  else
            {
                $('#overlayAddAlbumLabel').text(parsedResponse.message);
            }          
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with albums creation');
        }
    });
}