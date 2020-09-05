import { getTargetDayRows } from './day-row-helper'

chrome.runtime.onMessage.addListener((message) => {
  fillNotes(
    message.content,
    getTargetDayRows(message.excludedDays)
  );
});

const fillNotes = (content, targetDayRows) => {
  const noteButtons = targetDayRows
    .flatMap((row) => Array.from(row.getElementsByClassName('vbttn')))
  ;
  noteButtons.forEach((noteButton) => {
    noteButton.click();
    document.getElementById('dialogNoteText2').value = content;
    document.getElementById('dialogNoteOk').click();
  });
};
