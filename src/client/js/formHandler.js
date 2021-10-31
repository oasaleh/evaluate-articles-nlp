async function postData(backendServerUrl = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(backendServerUrl, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    cache: 'no-cache',
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
  document.getElementById('loadingBar').style.display = 'block';
  const urlText = document.getElementById('articleUrl').value;

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

      resultsSubjectivity.innerText = processedData.subjectivity.toLowerCase();
      // resultsPolarity.innerText = processedData.polarity.toLowerCase();
      resultsConfidence.innerText = processedData.confidence.toLowerCase();
      resultsAgreement.innerText = processedData.agreement.toLowerCase();
      resultsIrony.innerText = processedData.irony.toLowerCase();
    });
}

export { handleSubmit };
