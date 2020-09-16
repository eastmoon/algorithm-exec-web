@rem
@rem Copyright 2020 the original author jacky.eastmoon
@rem All commad module need 3 method :
@rem [command]        : Command script
@rem [command]-args   : Command script options setting function
@rem [command]-help   : Command description
@rem Basically, CLI will not use "--options" to execute function, "--help, -h" is an exception.
@rem But, if need exception, it will need to thinking is common or individual, and need to change BREADCRUMB variable in [command]-args function.
@rem NOTE, batch call [command]-args it could call correct one or call [command] and "-args" is parameter.
@rem

:: ------------------- batch setting -------------------
@rem setting batch file
@rem ref : https://www.tutorialspoint.com/batch_script/batch_script_if_else_statement.htm
@rem ref : https://poychang.github.io/note-batch/

@echo off
setlocal
setlocal enabledelayedexpansion

:: ------------------- declare CLI file variable -------------------
@rem retrieve project name
@rem Ref : https://www.robvanderwoude.com/ntfor.php
@rem Directory = %~dp0
@rem Object Name With Quotations=%0
@rem Object Name Without Quotes=%~0
@rem Bat File Drive = %~d0
@rem Full File Name = %~n0%~x0
@rem File Name Without Extension = %~n0
@rem File Extension = %~x0

set CLI_DIRECTORY=%~dp0
set CLI_FILE=%~n0%~x0
set CLI_FILENAME=%~n0
set CLI_FILEEXTENSION=%~x0

:: ------------------- declare CLI variable -------------------

set BREADCRUMB=cli
set COMMAND=
set COMMAND_BC_AGRS=
set COMMAND_AC_AGRS=

:: ------------------- declare variable -------------------

for %%a in ("%cd%") do (
    set PROJECT_NAME=%%~na
)
set PROJECT_ENV=dev

:: ------------------- execute script -------------------

call :main %*
goto end

:: ------------------- declare function -------------------

:main (
    call :argv-parser %*
    call :%BREADCRUMB%-args %COMMAND_BC_AGRS%
    call :main-args %COMMAND_BC_AGRS%
    IF defined COMMAND (
        set BREADCRUMB=%BREADCRUMB%-%COMMAND%
        call :main %COMMAND_AC_AGRS%
    ) else (
        call :%BREADCRUMB%
    )
    goto end
)
:main-args (
    for %%p in (%*) do (
        if "%%p"=="-h" ( set BREADCRUMB=%BREADCRUMB%-help )
        if "%%p"=="--help" ( set BREADCRUMB=%BREADCRUMB%-help )
    )
    goto end
)
:argv-parser (
    set COMMAND=
    set COMMAND_BC_AGRS=
    set COMMAND_AC_AGRS=
    set is_find_cmd=
    for %%p in (%*) do (
        IF NOT defined is_find_cmd (
            echo %%p | findstr /r "\-" >nul 2>&1
            if errorlevel 1 (
                set COMMAND=%%p
                set is_find_cmd=TRUE
            ) else (
                set COMMAND_BC_AGRS=!COMMAND_BC_AGRS! %%p
            )
        ) else (
            set COMMAND_AC_AGRS=!COMMAND_AC_AGRS! %%p
        )
    )
    goto end
)

:: ------------------- Main mathod -------------------

:cli (
    goto cli-help
)

:cli-args (
    goto end
)

:cli-help (
    echo This is a Command Line Interface with project %PROJECT_NAME%
    echo If not input any command, at default will show HELP
    echo.
    echo Options:
    echo      --help, -h        Show more information with CLI.
    echo.
    echo Command:
    echo      start             Start service with docker compose.
    echo      down              Stop service with docker compose.
    echo      into              Into container, if service is start.
    echo.
    echo Run 'cli [COMMAND] --help' for more information on a command.
    goto end
)

:: ------------------- Command "start" mathod -------------------

:cli-start-docker-prepare (
    @rem Create .env for docker-compose
    echo Current Environment %PROJECT_ENV%
    echo TAG=%PROJECT_NAME% > .env

    goto end
)

:cli-start-website-prepare (
    echo ^> Build Website image
    docker build --rm -t website:%PROJECT_NAME% ./docker/website

    echo ^> Create Website tmp directory
    IF NOT EXIST cache\website (
        mkdir cache\website
    )

    echo ^> Upgrade Website library
    docker run -ti --rm^
        -v %cd%\src\website\:/repo/^
        -v %cd%\cache\website\:/repo/node_modules/^
        website:%PROJECT_NAME% bash -l -c "yarn install"

    goto end
)

:cli-start-algorithm-prepare (
    echo ^> Build Algorithm image
    copy src\algorithm\.dependencies docker\algorithm
    docker build --rm -t algorithm:%PROJECT_NAME% ./docker/algorithm
    del docker\algorithm\.dependencies

    goto end
)

:cli-start (
    echo ^> Build ebook Docker images with gitbook tools
    call :cli-start-docker-prepare
    call :cli-start-website-prepare
    call :cli-start-algorithm-prepare

    echo ^> Startup docker container instance
    @rem Run next deveopment with stdout
    docker-compose -f ./docker/docker-compose-%PROJECT_ENV%.yml up -d
    ::docker exec -ti web_service_%PROJECT_NAME% bash -l -c "cd /repo && yarn start"
    goto end
)

:cli-start-args (
    for %%p in (%*) do (
        if "%%p"=="--dev" ( set DEVELOPER=1 )
    )
    goto end
)

:cli-start-help (
    echo Start service with docker compose.
    echo.
    echo Options:
    echo.
    goto end
)

:: ------------------- Command "down" mathod -------------------

:cli-down (
    @rem Close docker container instance by docker-compose
    docker-compose -f ./docker/docker-compose-%PROJECT_ENV%.yml down

    goto end
)

:cli-down-args (
    goto end
)

:cli-down-help (
    echo Close docker container instance by docker-compose.
    goto end
)


:: ------------------- Command "into" mathod -------------------

:cli-into (
    echo ^> Go into container with stdout

    IF defined INTO_WEBSITE (
        docker exec -ti web_service_%PROJECT_NAME% bash
    )
    IF defined INTO_ALGORITHM (
        docker exec -ti alg_service_%PROJECT_NAME% bash
    )

    goto end
)

:cli-into-args (
    for %%p in (%*) do (
        if "%%p"=="--web" ( set INTO_WEBSITE=1 )
        if "%%p"=="--alg" ( set INTO_ALGORITHM=1 )
    )
    goto end
)

:cli-into-help (
    echo Go into container.
    echo.
    echo Options:
    echo      --web             Into website container.
    echo      --alg             Into algorithm container.
    echo.
    goto end
)

:: ------------------- End method-------------------

:end (
    endlocal
)
