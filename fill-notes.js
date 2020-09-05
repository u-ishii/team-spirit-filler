chrome.runtime.onMessage.addListener((message) => {
  fillNotes(
    message.content,
    message.getTargetDayRows()
    // message.excludedDays
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
