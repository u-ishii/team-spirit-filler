
const requestRemarkText = () => {
    const promptText = `
備考に入力したいテキスト入力してください。
例: 在宅勤務
    `.trim()
        const input = prompt(promptText);
    if (input == null) throw Error();
    return input;
};

const requestExcludedDays = () => {
    const promptText = `
除外する日（物理出社する日）を , で区切って入力してください。
休日はあらかじめ除外されるため、入力は必要ありません。
    例: 11,12,13
    `.trim()
    const input = prompt(promptText);
    if (input === null) throw Error();
    return input.split(',')
        .map(dayText => dayText.trim())
        .filter(dayText => /^\d+$/.test(dayText))
        .map(dayText => Number(dayText))
    ;
};

const pickDayFromId = (id) => {
    const dayRegex = /\d{4}-\d{2}-(\d{2})/;
    return Number(dayRegex.exec(id)[1]);
};

const isUnappliedDay = (row) => {
    return row
        .getElementsByClassName('vapply')
        .flatMap(applyCell => applyCell.getElementsByClassName('png-add'))
        .length > 0
};

const fillRemarks = (remarkText, excludedDays) => {
    const isNotExcludedDay = (row) => {
        return !excludedDays.includes(pickDayFromId(row.id));
    }
    const workdayRows = ['days odd', 'days even']
        .flatMap(className => Array.from(document.getElementsByClassName(className)))
        .filter(isUnappliedDay)
        .filter(isNotExcludedDay)
    ;
    const remarkButtons = workdayRows
        .flatMap(row => Array.from(row.getElementsByClassName('vbttn')))
    ;
    remarkButtons.forEach(remarkButton => {
        remarkButton.click();
        document.getElementById('dialogNoteText2').value = remarkText;
        document.getElementById('dialogNoteOk').click();
    });
}
