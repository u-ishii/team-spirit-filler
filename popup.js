const remarkContent = document.getElementById('remarkContent');
const remarkExcludedDays = document.getElementById('remarkExcludedDays');
const fillRemarksSubmit = document.getElementById('fillRemarksSubmit');
fillRemarksSubmit.addEventListener('click', () => {
  console.log('xxxx');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        remarkContentText: remarkContent.value,
        remarkExcludedDaysText: remarkExcludedDays.value
      }
    );
  });
});
