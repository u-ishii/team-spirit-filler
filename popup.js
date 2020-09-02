
const remarkText = document.getElementById('remarkText');
const remarkFillButton = document.getElementById('remarkFillButton');
remarkFillButton.addEventListener('click', () => {
    const workdayRows = ['days odd', 'days even'].flatMap(className => Array.from(document.getElementsByClassName(className)));
    const remarkButtons = workdayRows.flatMap(row => Array.from(row.getElementsByClassName('vbttn')));
    remarkButtons.forEach(remarkButton => {
        remarkButton.click();
        document.getElementById('dialogNoteText2').value = remarkText.value;
        document.getElementById('dialogNoteOk').click();
    });
});
