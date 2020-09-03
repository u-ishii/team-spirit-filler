const remarkTextPromptText = `
備考に入力したいテキスト入力してください。
例: 在宅勤務
`.trim()

const excludedDaysPromptText = `
除外する日（物理出社する日）を , で区切って入力してください。
休日はあらかじめ除外されるため、入力は必要ありません。
例: 11,12,13
`.trim()

const requestRemarkText = () => {
    const input = prompt(remarkTextPromptText);
    if (input == null) throw Error();
    return input;
};

const requestExcludedDays = () => {
    const input = prompt(excludedDaysPromptText);
    if (input === null) throw Error();
    return input.split(',')
        .map(dayText => dayText.trim())
        .filter(dayText => /^\d+$/.test(dayText))
        .map(dayText => Number(dayText))
    ;
};

const workdayRows = ['days odd', 'days even'].flatMap(className => Array.from(document.getElementsByClassName(className)));
const remarkButtons = workdayRows.flatMap(row => Array.from(row.getElementsByClassName('vbttn')));
remarkButtons.forEach(remarkButton => {
    remarkButton.click();
    document.getElementById('dialogNoteText2').value = remarkText.value;
    document.getElementById('dialogNoteOk').click();
});
