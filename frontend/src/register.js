import axios from 'axios';
import { notifyError, notifyOk } from './dialogUtil.js';
import { el } from './documentUtil.js';

window.addCity = function() {
    const name = el('name').value;
    const population = el('population').value;
    const area = el('area').value;

    // TODO Validación de datos
    if (name === '') {
        notifyError('El nombre es un campo obligatorio');
        return;
    }

    axios.post('http://localhost:8080/cities', {
        name: name,
        population: population,
        area: area
    });

    // TODO Confirmar al usuario que todo ha ido bien (o mal)
    notifyOk('Ciudad registrada');

    // TODO Limpiar el formulario
    el('name').value = '';
    el('population').value = '';
    el('area').value = '';
};