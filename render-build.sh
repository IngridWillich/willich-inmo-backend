#!/bin/bash
set -e # Detiene el script si hay errores

# Instala dependencias
npm install

# Compila TypeScript
npm run build

# Ejecuta migraciones (opcional pero recomendado para producción)
npm run migration:run

echo "✅ Build completado exitosamente!"