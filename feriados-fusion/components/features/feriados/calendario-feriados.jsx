/* /components/features/movies/movie-detail.jsx */

import PropTypes from 'prop-types'
import Content, { useContent } from 'fusion:content';
import React, { useState } from 'react'
import './feriados-style.css'

const mesesArray = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

const diasArray = [
    "Dom",
    "Lun",
    "Mar",
    "Mie",
    "Jue",
    "Vie",
    "Sab"
];

function formatDate(date) {
    var monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Augosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];

    var weekDays = [
        "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();

    return weekDays[date.getDay()] + ' ' + day + ' de ' + monthNames[monthIndex];
}

const FeriadosHeader = (props) => {
    const { anioSeleccionado, mesesAnioActual } = props;
    const anioAnterior = (new Date).getFullYear() - 1,
        anioActual = (new Date).getFullYear(),
        anioSiguiente = (new Date).getFullYear() + 1;
    var today = new Date();
    let nextHolidayMonth;
    let nextHolidayDate;
    let nextHolidayDateDescription;

    for (let i = 0; i < mesesAnioActual.length; i++) {
        if (mesesAnioActual[i].id >= today.getMonth() + 1) {
            if (!mesesAnioActual[i].feriados) continue;
            nextHolidayMonth = mesesAnioActual[i].id - 1;
            for (let j = 0; j < mesesAnioActual[i].feriados.length; j++) {
                if (mesesAnioActual[i].feriados[j].dia >= today.getDate()) {
                    nextHolidayDate = mesesAnioActual[i].feriados[j].dia;
                    nextHolidayDateDescription = mesesAnioActual[i].feriados[j].descripcion;
                    break;
                }
            }
            if (nextHolidayDate) break;
        }
    }

    function getDiasFaltantes() {
        return Math.round(((new Date(anioActual, nextHolidayMonth, nextHolidayDate)) - today) / (1000 * 60 * 60 * 24))
    }

    function getProximaFecha() {
        return formatDate(new Date(anioActual, nextHolidayMonth, nextHolidayDate));
    }

    return (
        <div className="header">
            <div className="years">
                <a id="previous-year" className={"year " + (anioSeleccionado == anioAnterior ? 'active' : '')}>{anioAnterior}</a>
                <a id="current-year" className={"year " + (anioSeleccionado == anioActual ? 'active' : '')}>{anioActual}</a>
                <a id="next-year" className={"year " + (anioSeleccionado == anioSiguiente ? 'active' : '')}>{anioSiguiente}</a>
            </div>
            <div className="descriptions">
                <ul>
                    <li className="description"><span></span><label>Feriados inamovibles</label></li>
                    <li className="description"><span></span><label>Feriados trasladables</label></li>
                    <li className="description"><span></span><label>Días no laborables</label></li>
                </ul>
            </div>
            <div className="info-card">
                <div className="next">
                    <span>Próximo feriado en</span>
                    <span className="remaining-days">{getDiasFaltantes()} días</span>
                </div>
                <div className="next-info">
                    <span className="next-date">{getProximaFecha()}</span>
                    <span className="next-description">{nextHolidayDateDescription}</span>
                </div>
            </div>
        </div>
    )
}

const Evento = (props) => {
    const { dia, descripcion } = props

    return (
        <span>
            {dia} - {descripcion}
        </span>
    )
}

const Dia = (props) => {
    const { dia, feriado } = props

    return (
        <td className={feriado ? `holiday-type-${feriado.tipo.id}` : ''}>{dia}</td>
    )
}

const Mes = (props) => {
    const { nombreMes, feriadosEnMes, mesIdx, anio } = props;
    const primerDia = (new Date(anio, mesIdx)).getDay();
    const totalDias = (32 - new Date(anio, mesIdx, 32).getDate());
    let diasVacios = new Array(primerDia).fill(null);
    let diasDelMes = Array.from([...Array(totalDias).keys()], x => x + 1);
    let semanasDeSiete = chunk(diasVacios.concat(diasDelMes), 7);

    function getFeriadoOrNull(nroDia) {
        if (feriadosEnMes) {
            return feriadosEnMes.feriados.find(f => f.dia == nroDia);
        } else {
            return null;
        }
    }

    function getEventosMes() {
        let eventos = [];
        if (feriadosEnMes) {
            feriadosEnMes.feriados.map((feriado, i) =>
                eventos.push(<Evento dia={feriado.dia} descripcion={feriado.descripcion} />)
            );
        }
        return eventos;
    }

    return (
        <div className="month-container">
            <section className="month">
                <header><h1>{nombreMes}</h1></header>
                <table>
                    <tr>
                        {diasArray.map(diaSemana => (
                            <th>{diaSemana}</th>
                        ))}
                    </tr>

                    {semanasDeSiete.map(semana => (
                        <tr>
                            {semana.map(diaDeLaSemana => (
                                <Dia dia={diaDeLaSemana} feriado={getFeriadoOrNull(diaDeLaSemana)} />
                            ))}
                        </tr>
                    ))}
                </table>
            </section>
            <div className="events">
                {getEventosMes()}
            </div>
        </div>
    )

}

const CalendarioFeriados = (props) => {
    const { anio, title } = props.customFields
    const dataAnioActual = useContent({
        source: 'feriados-argentina',
        query: { year: (new Date).getFullYear() }
    })
    const dataAnioSeleccionado = useContent({
        source: 'feriados-argentina',
        query: { year: anio }
    })

    function crearCalendario() {
        var meses = [];
        mesesArray.map((mes, i) => {
            meses.push(<Mes nombreMes={mes} feriadosEnMes={dataAnioSeleccionado.meses.find(m => m.id == i + 1)} anio={dataAnioSeleccionado.anio} mesIdx={i} />);
        })
        return (meses)
    }

    return (
        <div>
            <h1>{title}</h1>
            {dataAnioActual && dataAnioSeleccionado && <FeriadosHeader anioSeleccionado={dataAnioSeleccionado.anio} mesesAnioActual={dataAnioActual.meses} />}
            <div className="calendar-months">
                {dataAnioSeleccionado && crearCalendario()}
            </div>
        </div>
    )
}

function chunk(arr, len) {
    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

CalendarioFeriados.label = 'Calendario de Feriados'
CalendarioFeriados.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.text.isRequired,
        anio: PropTypes.number.isRequired
    })
}
export default CalendarioFeriados