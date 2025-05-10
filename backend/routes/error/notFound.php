<?php
    http_response_code(405);
    echo <<<JSON 
        { 
            'code': 404,
            'message': 'not found'
        } 
    JSON;
?>
