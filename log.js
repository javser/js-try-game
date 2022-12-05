export function log(data) {
  if (!window.logger) {
    window.logger = document.body.appendChild(document.createElement('pre'));
    logger.style = 'outline:1px dashed #ccc';
  }
  let tData = '';
  if (typeof data === 'object') {
    tData = 'obj:\n' + JSON.stringify(data, '', 2);
  } else {
    tData = 'txt:\n' + data;
  }

  logger.textContent = tData + '\n' + logger.textContent;
}
