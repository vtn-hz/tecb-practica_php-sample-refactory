<?php 

/**
 * ToDo...
 *  This module reads every directory searching 
 *  route.xml file, this is inefficient so its
 *  need a routerCache.php and reload it by
 *  command line when a new route was added. 
 */
function getRoutes(): array
{
    $routes = [];
    $modulesPath =  './modules';

    // Buscar subcarpetas dentro de /modules
    $moduleDirs = glob($modulesPath . '/*', GLOB_ONLYDIR);

    foreach ($moduleDirs as $moduleDir) {
        $routesFile = $moduleDir . '/routes.xml';

        // Verificar si existe routes.xml en la carpeta
        if (!file_exists($routesFile)) {
            continue;
        }

        // Cargar el XML
        $xml = simplexml_load_file($routesFile);

        // Leer cada módulo y sus rutas
        foreach ($xml->module as $module) {
            foreach ($module->route as $route) {
                $routeName = (string) $route['name'];
                $routePath = (string) $route;

                $path = "./modules/{$module['name']}/routes/{$routePath}";
                
                if (file_exists($path))
                    $routes[$routeName] = $path;
            }
        }
    }

    return $routes;
}
