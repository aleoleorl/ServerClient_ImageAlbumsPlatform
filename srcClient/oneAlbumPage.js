function showTheAlbum() 
{
    $('#albumImages')
    .css(
    {
        'display': 'flex',
        'flex-wrap': 'wrap', 
        'justify-content': 'center',       
        'width': '75%',
        'margin': '0 auto',
        'padding': '10px'
    });
    
    const imageList = $('#albumImages');
    imageList.empty();

    oneAlbumDescription();
    oneAlbumBackButton();
    
    if (isUser) 
    {
       oneAlbumUploadImageButton();        
    }
    
    getAlbumImageData(currentAlbum, handleAlbumImageData)

    return;
}

function oneAlbumDescription()
{
    const imageList = $('#albumImages');
    const albumIndex = albumsArray.indexOf(currentAlbum);
    
    if (albumIndex !== -1) 
    {
        const albumDescription = albumsDescArray[albumIndex];
        const addImageDiv = $('<div></div>');
        addImageDiv.css(
        {
            'border': '1px solid #ccc',
            'padding-top': '10px',
            'width': '100%',
            'margin': '10px 0',
            'background-color': '#eeeeeeff'
        });

        const descriptionLabel = $('<label></label>').html("<strong>Album description:</strong><br>" + albumDescription);

        descriptionLabel.css(
        {
            'display': 'block',
            'font-size': '16px',
            'color': '#333',
            'margin-bottom': '0px',
            'text-align': 'center'
        });
        
        addImageDiv.append(descriptionLabel); 
        imageList.append(addImageDiv);
    } else 
    {
        console.log("Album not found in albumsArray.");
    }
}

function oneAlbumBackButton()
{
    const imageList = $('#albumImages');
    const addImageDiv = $('<div></div>')
    .css(
    {
        'margin': '10px',
        'flex': '1 1 calc(20% - 20px)',
        'max-width': 'calc(20% - 20px)',
        'text-align': 'center',
        'padding-top': '20px'
    });
    const addAlbumImg = $('<img src="imgClient/back.png" alt="back">')
    .css(
     {
        'max-width': '100%',
        'width': '100px',
        'height': '100px', 
        'display': 'block',
        'margin': '0 auto'
    });
    addImageDiv.append(addAlbumImg);
    addImageDiv.append('<label>back</label>');
    addImageDiv.on('click', backAlbum);
    imageList.append(addImageDiv);
}

function oneAlbumUploadImageButton()
{
    const imageList = $('#albumImages');
    const addImageDiv = $('<div></div>')
    .css(
    {
        'position': 'relative',
        'margin': '10px',
        'flex': '1 1 calc(20% - 20px)',
        'max-width': 'calc(20% - 20px)',
        'text-align': 'center',
        'padding-top': '20px'
    });
    const addAlbumImg = $('<img src="imgClient/addImage.png" alt="loading">')
    .css(
    {
        'max-width': '100%',
        'height': 'auto',
        'display': 'block',
        'margin': '0 auto',
        'width': '100px',
        'height': '100px'
    });
    const label2 = $('<label>load image</label>')
    .css(
    {
        'position': 'absolute',
        'left': '50%',
        'top' : '80%',
        'transform': 'translate(-50%, 0%)',
        'white-space': 'nowrap'
    });
    addImageDiv.append(addAlbumImg);
    addImageDiv.append(label2);
    addImageDiv.on('click', addImage);
    imageList.append(addImageDiv);
}

function getAlbumImageData(albumName, callback, callback2) 
{
    $.ajax(
    {
        url: apiGetAlbumImagesData,
        type: 'GET',
        data: 
        { 
            albumName: albumName
        },
        success: function(response) 
        {
            if (callback && typeof callback === "function") 
            {
                callback(JSON.parse(response));
            }   
            if (callback2 && typeof callback2 === "function") 
            {
                callback2();
            }           
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with getting album data');
        }
    });
}

function handleAlbumImageData(response) 
{
    handleStorageData(response);
    showPlaceholders(response);
    
    if (response.images && response.images.length)
    {
        response.images.forEach(image => 
        {
            loadImage(image.id, function() 
            {
                updateImage(image.id);
            });
        });
    }
    
    $('#information').text("Album \"" + currentAlbum + "\"");
}

function handleStorageData(newData) 
{
    let existingAlbum = storageDataAlbums.find(album => album.albumId === newData.albumId);

    if (existingAlbum) 
    {
        existingAlbum.images = newData.images;
        existingAlbum.likes = newData.likes;
        existingAlbum.comments = newData.comments;
    } else 
    {
        storageDataAlbums.push(
        {
            albumId: newData.albumId,
            images: newData.images,
            likes: newData.likes,
            comments: newData.comments
        });
    }
}  

function showPlaceholders(response)
{
    const imageList = $('#albumImages');
    if (!response.images || response.images.length == 0)
    {
        return;
    }
    response.images.forEach(image => 
    {
        const imageDiv = $('<div></div>')
        .attr('id', `img_${image.id}`)
        .css(
        {
            'position': 'relative',
            'margin': '10px',
            'flex': '1 1 calc(20% - 20px)',
            'max-width': 'calc(20% - 20px)',
            'text-align': 'center',
            'padding-top': '20px'
        });
        const albumImg = $('<img id="plc_'+image.id+'" src="imgClient/defImage.png" alt="image">')
        .css(
        {
            'max-width': '100%',
            'height': 'auto',
            'display': 'block',
            'margin': '0 auto',
            'width': '100px',
            'height': '100px'    
        });
        const label = $('<label>'+image.name+'</label>')
        .css(
        {
            'display': 'block',
            'margin-bottom': '10px' 
            
        });

        imageDiv.append(albumImg);
        imageDiv.append(label);


        const infoRow = $('<div></div>').css(
        {
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'margin-top': '5px'
        });

        const commentsIcon = $('<img src="imgClient/comm.png" alt="comments">')
        .css(
        {
            'width': '25px',
            'height': '25px',
            'margin-right': '5px'
        });

        const commentsCount = $('<label></label>')
        .text(response.comments.filter(comment => comment.imageId === image.id).length)
        .css(
        {
            'margin-right': '10px'
        });

        const likePlusIcon = $('<img src="imgClient/likeFillPlus.png" alt="like plus">')
        .css(
        {
            'width': '25px',
            'height': '25px',
            'margin-right': '5px'
        });

        const likesSum = $('<label></label>')
            .text(response.likes
            .filter(like => like.imageId === image.id)
            .reduce((sum, like) => sum + like.userVal, 0));

        const likeMinusIcon = $('<img src="imgClient/likeFillMinus.png" alt="like minus">')
        .css(
        {
            'width': '25px',
            'height': '25px',
            'margin-right': '5px',
            'margin-left': '5px'
        });
        
        infoRow.append(commentsIcon, commentsCount, likePlusIcon, likesSum, likeMinusIcon);
        imageDiv.append(infoRow);

        imageDiv.on('click', function() 
        {
            showImagePage(image.id);
        });
        imageList.append(imageDiv);
    });  
}

function loadImage(imageId, callback) 
{
    if (imagesMap['img_'+imageId])
	{
        if (callback && typeof callback === "function")
		{
			callback();
		}
		return;
	}
    $.ajax(
	{
        url: apiGetImage,
        type: 'GET',
        data: 
		{ 
			imageId: imageId 
		},
        success: function(response) 
		{
            imagesMap['img_'+imageId] = response.imageUrl;
			if (callback && typeof callback === "function")
			{
				callback();
			}
        },
        error: function(xhr, status, error) 
		{
            console.error('Error loading image: ' + error);
        }
    });
    return;    
}

function updateImage(imageId) 
{    
    const imageUrl = baseUrl + imagesMap['img_' + imageId];
    const img = $("#plc_"+imageId);
    img.attr('src', imageUrl)
    .css(
    {
        'width': '100px',
        'height': '100px'
    });        
}

function addImage() 
{
    showOverlay('#overlayAddImage');
    $('#addImagePart').show();
}

function showImagePage(imageId)
{
    currentImageId = imageId;
    showOverlay('#overlayImage', false);
    imagePagePreparation();    
}

function backAlbum() 
{
    currentAlbum="";
    showOverlay('#overlayAlbumList');
    clearOverlayWarningLabel();
    getAlbums();
}

function requestAddImage(formData)
{
    $.ajax(
    {
        url: apiAddImage,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) 
        {
            $('#uploadStatusLabel').text('Image '+ formData.get('imageName') +' uploaded successfully.');
        },
        error: function(xhr, status, error) 
        {
            $('#uploadStatusLabel').text('Error uploading image.');
            console.error('Error: ' + error);
        }
    });    
}

function preventDefaults(e) 
{
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) 
{
    preventDefaults(e);
    $('#addImagePart').addClass('dragover');
}

function unhighlight(e) 
{
    preventDefaults(e);
    $('#addImagePart').removeClass('dragover');
}

function formDragAndDropPreparation()
{
    var imageName='';
    var defaultName ='';

    $('#addImagePart').on('dragenter', highlight);
    $('#addImagePart').on('dragover', highlight);
    $('#addImagePart').on('dragleave', unhighlight);
    $('#addImagePart').on('drop', unhighlight);

    $('#addImagePart').on('drop', function(event) 
    {
        preventDefaults(event);
        const files = event.originalEvent.dataTransfer.files;
        $('#fileInput').prop('files', files);
        defaultName = files[0].name;
        $('#imageName').val(defaultName);
    });

    $('#fileInput').on('change', function(event) 
    {
        const files = event.target.files;
        defaultName = files[0].name;
        $('#imageName').val(defaultName);
    });
    
    $('#imageUploadForm').on('submit', function(event) 
    {
        imageName = $('#imageName').val();
        if (imageName !=="")
        {
            event.preventDefault();
            const formData = new FormData(this);
        
            formData.append('currentAlbum', currentAlbum);
            formData.append('currentUser', userName);
            formData.append('defaultName', defaultName);
            formData.append('imageName', imageName);

            requestAddImage(formData);
        }
    });
}

function preventDefaults(e) 
{
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) 
{
    preventDefaults(e);
    $('#addImagePart').addClass('dragover');
}

function unhighlight(e) 
{
    preventDefaults(e);
    $('#addImagePart').removeClass('dragover');
}