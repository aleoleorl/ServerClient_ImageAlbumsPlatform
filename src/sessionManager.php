<?php
require_once 'iSessionManager.php';

class SessionManager implements ISessionManager
{
    public static $inactiveTime = 600;

    public function startSession()
    {
        session_start();

        if (!isset($_SESSION['LAST_ACTIVITY'])) 
        {
            $_SESSION['LAST_ACTIVITY'] = time();
        }
        if (!isset($_SESSION['variableList'])) 
        {
            $_SESSION['variableList'] = array();
        }
    }

    public function checkInactivity()
    {
        if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > self::$inactiveTime)) 
        {
            $this->destroySession();
            return false;
        }
        $_SESSION['LAST_ACTIVITY'] = time();
        return true;
    }

    public function destroySession()
    {
        session_unset();
        session_destroy();
    }

    public function checkAndCloseSession()
    {
        if (isset($_SESSION['login'])) 
        {
            destroySession();
        }        
    }

    function addValuesToList($value1, $value2) 
    {
        $_SESSION['variableList'][] = array($value1, $value2);
    }  

    function valueExists($value1, $value2 = null) 
    {
        foreach ($_SESSION['variableList'] as $pair) 
        {
            if ($pair[0] == $value1)
            {
                return true;
            }
        }
        return false;
    }

    public function updateSessionVariable($value1, $value2) 
    {
        foreach ($_SESSION['variableList'] as &$pair) 
        {
            if ($pair[0] == $value1) 
            {
                $pair[1] = $value2;
                break;
            }
        }
    }    
}
?>