const remarkContent = document.getElementById('remarkContent');
const remarkExcludedDays = document.getElementById('remarkExcludedDays');
const fillRemarksSubmit = document.getElementById('fillRemarksSubmit');

const parseExcludedDays = (text) => {
  if (text === null) throw Error();
  return text.split(',')
    .map((dayText) => dayText.trim())
    .filter((dayText) => /^\d+$/.test(dayText))
    .map((dayText) => Number(dayText));
};

fillRemarksSubmit.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        content: remarkContent.value,
        excludedDays: parseExcludedDays(remarkExcludedDays.value)
      }
    );
  });
});
