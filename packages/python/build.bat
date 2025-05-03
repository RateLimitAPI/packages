@echo off
echo Building Python package...

cd %~dp0
pip install -e .

echo.
echo Package installed in development mode. To create a distributable package, run:
echo pip install build
echo python -m build
echo.
echo The resulting package will be in the 'dist' directory.
echo.
