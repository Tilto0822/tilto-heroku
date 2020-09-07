let year = 0;
let month = 0;
let trcount = 1;
let inString = '';

function addCell(text) {
    if (trcount === 1) inString += '<tr>';
    inString += `<td class="tb-value">${text}</td>`;
    if (trcount === 7) {
        inString += '</tr>';
        trcount = 1;
    } else trcount++;
}

function makeCalender() {
    document.getElementById('days').innerHTML = '';
    document.getElementById('year_text').innerText = year;
    document.getElementById('month_text').innerText = month + 1;
    document.getElementById('date_text').innerText = `${year}/${month + 1}`;
    inString = '';
    let firstDay = new Date(year, month, 1).getDay();
    let lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) addCell('');
    for (let i = 1; i <= lastDay; i++) addCell(i.toString());
    if (((firstDay + lastDay) % 7) !== 0) for (let i = 0; i < 7 - ((firstDay + lastDay) % 7); i++) addCell('');
    document.getElementById('days').innerHTML = inString;
}

function previousMonth() {
    if (month === 0) {
        year--;
        month = 11;
    } else month--;
    makeCalender();
}

function nextMonth() {
    if (month === 11) {
        year++;
        month = 0;
    } else month++;
    makeCalender();
}

document.addEventListener("DOMContentLoaded", function() {
    let now = new Date();
    year = now.getFullYear();
    month = now.getMonth();
    makeCalender();
});