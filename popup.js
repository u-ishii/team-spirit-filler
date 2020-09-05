const excludedDays = document.getElementById('excludedDays');
const remarkContent = document.getElementById('remarkContent');
const fillRemarksSubmit = document.getElementById('fillRemarksSubmit');
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

fillRemarksSubmit.addEventListener(
  'click',
  generateClickListener(() => ({
    content: remarkContent.value
  }))
);
