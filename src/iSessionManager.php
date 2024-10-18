<?php
interface ISessionManager
{
    public function startSession();
    public function checkInactivity();
    public function destroySession();
}
