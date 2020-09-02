const workdayRows = ['days odd', 'days even'].flatMap(className => Array.from(document.getElementsByClassName(className)));
const remarkButtons = workdayRows.flatMap(row => Array.from(row.getElementsByClassName('vbttn')));
remarkButtons.forEach(remarkButton => {
    remarkButton.click();
    document.getElementById('dialogNoteText2').value = '在宅勤務';
    document.getElementById('dialogNoteOk').click();
});