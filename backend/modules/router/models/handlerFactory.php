<?php

function methodNotAllow ( $conn ) // needs to keep same interface
{
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}

function createHandler ($method, $customHandlers = [], $prefix = 'handle') : callable 
{
    $handlers = [
        'POST'      => "{$prefix}Post",
        'GET'       => "{$prefix}Get",
        'PUT'       => "{$prefix}Put",
        'PATCH'     => "{$prefix}Put",
        'DELETE'    => "{$prefix}Delete"
    ];

    $handlers = array_merge($handlers, $customHandlers);
    $handler = $handlers[$method] ?? null;

    return is_callable($handler) ? $handler : methodNotAllow; 
}

?>