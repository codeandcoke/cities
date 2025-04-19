import axios from 'axios';
import { el, icon, td } from './documentUtil';
import { notifyOk } from './dialogUtil';

window.readCities = function() {
    axios.get('http://localhost:8080/cities')
        .then((response) => {
            const cityList = response.data;
            const cityTable = el('tableBody');
            
            cityList.forEach(city => {
                const row = document.createElement('tr');
                row.id = 'city-' + city.id;
                row.innerHTML = td(city.name) +
                                td(city.population) +
                                td(city.area) +
                                '<a class="btn btn-warning" href="modify.html?id=' + city.id + '">' +
                                icon('edit') + 
                                '</a> ' +
                                '<a class="btn btn-danger" href="javascript:removeCity(' + city.id + ')">' +
                                icon('delete') +
                                '</a>';
                cityTable.appendChild(row);
            })
        });
};

window.removeCity = function(id) {
    if (confirm('¿Está seguro de que desea eliminar esta ciudad?')) {
        axios.delete('http://localhost:8080/cities/' + id)
            .then((response) => {
                if (response.status == 204) {
                    notifyOk('Ciudad eliminada correctamente');
                    el('city-' + id).remove();
                }
            });
    }
};