import { getTargetDayRows } from './day-row-helper'

chrome.runtime.onMessage.addListener((message) => {
  switch (message.target) {
    case 'note':
      fillNotes(message.content, message.excludedDays);
      break;
    case 'divergence':
      break;
  }
});

const fillNotes = (content, excludedDays) => {
  const dayRows = getTargetDayRows(excludedDays);
  const noteButtons = dayRows
    .flatMap((row) => Array.from(row.getElementsByClassName('vbttn')))
  ;
  noteButtons.forEach((noteButton) => {
    noteButton.click();
    document.getElementById('dialogNoteText2').value = content;
    document.getElementById('dialogNoteOk').click();
  });
};
