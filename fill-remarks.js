chrome.runtime.onMessage.addListener((message, q, b) => {
  fillRemarks(
    message.content,
    message.excludedDays
  );
});

const pickDayFromId = (id) => {
  const result = /\d{4}-\d{2}-(\d{2})/.exec(id);
  if (result === null || result.length === 2) return null;
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
    .some(className => row.className.includes(className))
  ;
};

const fillRemarks = (content, excludedDays) => {
  const isNotExcludedDay = (row) => {
    return !excludedDays.includes(pickDayFromId(row.id));
  };
  const dayRows = Array.from(document.getElementsByClassName('days'));
  const targetDayRows = dayRows
    .filter(isWorkday)
    .filter(isUnappliedDay)
    .filter(isNotExcludedDay)
  ;
  const remarkButtons = targetDayRows
    .flatMap((row) => Array.from(row.getElementsByClassName('vbttn')))
  ;
  remarkButtons.forEach((remarkButton) => {
    remarkButton.click();
    document.getElementById('dialogNoteText2').value = content;
    document.getElementById('dialogNoteOk').click();
  });
};
