import {getTargetButtons} from './day-row-helper';

chrome.runtime.onMessage.addListener((message) => {
  switch (message.target) {
    case 'note':
      fillNotes(message.content, message.excludedDays);
      break;
    case 'divergence':
      fillDivergences(message.reason, message.excludedDays);
      break;
  }
});

const fillNotes = (content, excludedDays) => {
  getTargetButtons('vbttn', excludedDays)
      .forEach((button) => {
        button.click();
        document.getElementById('dialogNoteText2').value = content;
        document.getElementById('dialogNoteOk').click();
      });
};

const fillDivergences = (reason, excludedDays) => {
  const loopFill = (buttons) => {
    if (buttons.length === 0) {
      return;
    }
    buttons[0].click();
    const dialog = document.getElementById('dialogDivergenceReason');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (dialog.style.display === 'none') {
          loopFill(buttons.slice(1));
          observer.disconnect();
        }
      });
    });
    observer.observe(dialog, {attributes: true, attributeFilter: ['style']});
    Array.from(dialog.getElementsByTagName('textarea'))
        .forEach((textarea) => {
          textarea.value = reason;
        });
    dialog.getElementsByClassName('std-button1')[0].click();
  };
  loopFill(getTargetButtons('vacc', excludedDays));
};
