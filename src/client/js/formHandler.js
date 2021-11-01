import { isValid } from './isValid';

async function postData(backendServerUrl = '', data = {}) {
  const response = await fetch(backendServerUrl, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (err) {
    console.log(err, 'error');
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const urlText = document.getElementById('articleUrl').value;
  if (!isValid(urlText)) {
    alert('Please enter a valid URL');
    return;
  }
  document.getElementById('loadingBar').style.display = 'block';

  let processedData;
  let resultsSection;
  const resultsSubjectivity = document.getElementById('resultsSubjectivity');
  const resultsConfidence = document.getElementById('resultsConfidence');
  const resultsAgreement = document.getElementById('resultsAgreement');
  const resultsIrony = document.getElementById('resultsIrony');

  postData('http://localhost:8088/analyze', { articleUrl: urlText })
    .then((res) => {
      processedData = res;
    })
    .then(() => {
      document.getElementById('loadingBar').style.display = 'none';
      resultsSection = document.getElementById('resultsSection');
      resultsSection.setAttribute('style', 'display: flex;');

      resultsSubjectivity.innerText = processedData.subjectivity;
      resultsConfidence.innerText = processedData.confidence;
      resultsAgreement.innerText = processedData.agreement;
      resultsIrony.innerText = processedData.irony;
    });
}

export { handleSubmit };
