const excludedDays = document.getElementById('excludedDays');
const noteContent = document.getElementById('noteContent');
const fillNotesSubmit = document.getElementById('fillNotesSubmit');
// const separationReason = document.getElementById('separationReason');
// const fillSeparationsSubmit = document.getElementById('fillSeparationsSubmit');

const parseExcludedDays = (text) => {
  if (text === null) throw Error();
  return text.split(',')
    .map((dayText) => dayText.trim())
    .filter((dayText) => /^\d+$/.test(dayText))
    .map((dayText) => Number(dayText));
};

const generateClickListener = (messageGetter) => () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        excludedDays: parseExcludedDays(excludedDays.value),
        ...messageGetter()
      }
    );
  });
};

fillNotesSubmit.addEventListener(
  'click',
  generateClickListener(() => ({
    content: noteContent.value
  }))
);
