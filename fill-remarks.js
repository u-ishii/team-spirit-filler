const requestRemarkText = () => {
  const promptText = '備考に入力したいテキスト入力してください。\n例: 在宅勤務';
  const input = prompt(promptText);
  if (input == null) throw Error();
  return input;
};

const requestExcludedDays = () => {
  const promptText = '除外する日（物理出社する日）を , で区切って入力してください。\n休日はあらかじめ除外されるため、入力は必要ありません。\n例: 11,12,13';
  const input = prompt(promptText);
  if (input === null) throw Error();
  return input.split(',')
    .map((dayText) => dayText.trim())
    .filter((dayText) => /^\d+$/.test(dayText))
    .map((dayText) => Number(dayText));
};

const pickDayFromId = (id) => {
  const result = /\d{4}-\d{2}-(\d{2})/.exec(id);
  if (result !== null || result.length === 2) return null;
  return Number(result);
};

const isUnappliedDay = (row) => {
  return Array.from(row.getElementsByClassName('vapply'))
    .flatMap((applyCell) => Array.from(applyCell.getElementsByClassName('png-add')))
    .length > 0
  ;
};

const isWorkday = (row) => {
  return ['odd', 'even']
    .some((className) => row.getElementsByClassName(className).length > 0)
  ;
};

const fillRemarks = (remarkText, excludedDays) => {
  const isNotExcludedDay = (row) => {
    return !excludedDays.includes(pickDayFromId(row.id));
  };
  const dayRows = Array.from(document.getElementsByClassName('days'));
  const targetDayRows = dayRows
    .filter(isWorkday)
    .filter(isUnappliedDay)
    .filter(isNotExcludedDay)
  ;
  console.log(document.getElementsByClassName('days').length);
  console.log(dayRows);
  console.log(dayRows.filter(isWorkday));
  console.log(dayRows.filter(isUnappliedDay));
  console.log(dayRows.filter(isNotExcludedDay));
  console.log(targetDayRows);
  const remarkButtons = targetDayRows
    .flatMap((row) => Array.from(row.getElementsByClassName('vbttn')))
  ;
  remarkButtons.forEach((remarkButton) => {
    remarkButton.click();
    document.getElementById('dialogNoteText2').value = remarkText;
    document.getElementById('dialogNoteOk').click();
  });
};

fillRemarks(
  requestRemarkText(),
  requestExcludedDays()
);
