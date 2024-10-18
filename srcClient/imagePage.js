function imagePagePreparation()
{
    console.log("imagePagePreparation");
    $('#overlayImage')
    .css(
    {
        'padding-top': '30px'
    });

    var imagePath = getImageById(currentImageId);
    console.log("imagePath:"+JSON.stringify(imagePath));
    console.log("imagePath.imageName:"+imagePath.imageName);
    console.log("imagesMap:"+JSON.stringify(imagesMap));
    console.log("imagesMap:"+baseUrl + "img/" + imagesMap['img_' + currentImageId]);
    document.getElementById('displayImage').src = baseUrl + imagesMap['img_' + currentImageId];
    document.getElementById('imageName').textContent = imagePath.name;

    if (isUser)
    {
        $('#commentSection').show();
    } else
    {
        $('#commentSection').hide();
    }

    addCommentsToSection();
    correctLikeSection();
}

function addCommentsToSection() 
{
    var commentSection = document.getElementById('allCommentSection');
    commentSection.innerHTML = '';

    if (!storageDataAlbums || storageDataAlbums.length == 0)
    {
        return;
    }
    storageDataAlbums.forEach(album => 
    {
        if (album.comments && album.comments.length) 
        {
            album.comments.forEach(comment => 
            {
                if (comment.imageId === currentImageId) 
                {
                    var commentLine = document.createElement('div');
                    commentLine.textContent = `${comment.userId} (${comment.date}): ${comment.comment}`;
                    commentSection.appendChild(commentLine);
                }
            });
        }
    });
}

function correctLikeSection()
{
    document.getElementById('curLikes').textContent = getLikesSumForImage(currentImageId);

    document.querySelector('img[alt="Like Plus"]').src = 'imgClient/likeEmpPlus.png';
    document.querySelector('img[alt="Like Minus"]').src = 'imgClient/likeEmpMinus.png';
    if (isUser)
    {
        var value = getUserLikeValue(currentImageId);
        if (value > 0)
        {
            document.querySelector('img[alt="Like Plus"]').src = 'imgClient/likeFillPlus.png';
        } else if (value < 0)
        {
            document.querySelector('img[alt="Like Minus"]').src = 'imgClient/likeFillMinus.png';
        }
    }
}

function getLikesSumForImage(imgId) 
{
    for (let album of storageDataAlbums) 
    {
        for (let image of album.images) 
        {
            if (image.id === imgId) 
            {
                if (album.likes.length === 0) 
                {
                    return 0;
                }
                
                let likesSum = 0;
                for (let like of album.likes) 
                {
                    if (like.imageId === currentImageId) 
                    {
                        likesSum += like.userVal;
                    }
                }
                
                return likesSum;
            }
        }
    }
    return 0;
}

function getUserLikeValue(imgId) 
{
    for (let album of storageDataAlbums) 
    {
        for (let like of album.likes) 
        {
            if (like.imageId === imgId && like.userId === userId) 
            {
                return like.userVal;
            }
        }
    }
    return 0;
}

function imageBack()
{
    currentImageId = "";
    showOverlay('#overlayAlbum');
    showTheAlbum();
}

function openImagePage()
{    
    var currImgPath = baseUrl + imagesMap['img_' + currentImageId];
    window.open(currImgPath, '_blank');
}

function getImageById(imgName)
{
    for (const album of storageDataAlbums) 
    {
        for (const image of album.images) 
        {
            if (image.id === imgName)
            {
                return image;
            }
        }
    }
    return null;
}

function submitComment()
{
    var commentText = document.getElementById('commentInput').value;

    $.ajax(
    {
        url: apiAddComment,
        type: 'POST',
        data: 
        {
            user: userName,
            imageId: currentImageId,
            comment: commentText
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
                getAlbumImageData(currentAlbum, handleStorageData, imagePagePreparation);
            }        
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with albums creation');
        }
    });
}

function likePlus()
{
    if (isUser)
    {
        sendLike(1);
    }
}

function likeMinus()
{
    if (isUser)
    {
        sendLike(-1);
    }
}

function sendLike(val)
{
    $.ajax(
    {
        url: apiAddLike,
        type: 'POST',
        data: 
        {
            user: userName,
            albumName: currentAlbum,
            imageId: currentImageId,
            val: val
        },
        success: function(response) 
        {
            let parsedResponse;
            try 
            {
                parsedResponse = JSON.parse(response);
                getAlbumImageData(currentAlbum, handleStorageData, imagePagePreparation);
            } catch (e) 
            {
                console.error('Could not parse JSON response: ', e);
                parsedResponse = { status: 'NOK', message: 'Invalid response format' };
            }
    
            if (parsedResponse.status === 'OK')
            {   
                console.log("OK");
            }        
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with albums creation');
        }
    });
}