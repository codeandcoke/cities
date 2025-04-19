window.loadCity = function() {
    const queryParams = new URLSearchParams(window.location.search);
    const cityId = queryParams.get('id');
    // TODO Cargar la ciudad cuyo id es cityId y rellenar el formulario con esos datos
    
};

window.modifyCity = function() {
    // TODO Recoger los datos del formulario

    // TODO Validar formulario

    // TODO Llamar al backend para modificar la ciudad
};
