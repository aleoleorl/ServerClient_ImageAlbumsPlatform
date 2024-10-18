function loging(login, password)
{
    $.ajax(
    {
        url: apiAuth,
        type: 'POST',
        data: 
        {
            login: login,
            password: password
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
                isUser = true;
                userName = login;
                userId = parsedResponse.id;
                $('#userLabel').text('Hello, ' + userName);

                $('#registerBtn').hide();
                $('#loginBtn').hide();
                $('#signOutBtn').show();

                clearOverlayWarningLabel();
                showOverlay ('#overlayAlbumList');
                getAlbums();
                return 0;
            }  else
            {
                $('#overlayLoginLabel').text('Can\'t log in. ' + parsedResponse.message);
                return 1;
            }          
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with authentification');
            return 1;
        }
    });
}

function register(login, password, mail)
{
    $.ajax(
    {
        url: apiRegister,
        type: 'POST',
        data: 
        {
            login: login,
            password: password,
            mail: mail
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
                if (loging(login, password) === 1)
                {
                    $('#overlayRegisterLabel').text('User registered, but can\'t log in. Try to log in again.');
                }
            }  else
            {
                $('#overlayRegisterLabel').text('Can\'t register. ' + parsedResponse.message);
            }          
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            $('#overlayRegisterLabel').text('Problem with registration');
        }
    });
}

function logoutUser() 
{
    $.ajax(
    {
        url: apiLogout,
        type: 'POST',
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
                isUser = false;
                userName = 'Guest';
                $('#userLabel').text('Hello, Guest');

                $('#registerBtn').show();
                $('#loginBtn').show();
                $('#signOutBtn').hide();
                
                showOverlay('#overlayAlbumList');
                getAlbums();
            } else 
            {
                console.error('Logout failed: ' + response);
            }
        },
        error: function(xhr, status, error) 
        {
            console.error('Error: ' + error);
            alert('Problem with logout');
        }
    });
}