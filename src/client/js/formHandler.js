function handleSubmit(event) {
  event.preventDefault();

  // const urlText = document.getElementById('articleUrl').value;
  const urlText =
    'https://www.geeksforgeeks.org/how-to-add-update-an-attribute-to-an-html-element-using-javascript/';

  let processedData;
  let resultsSection;
  const resultsSubjectivity = document.getElementById('resultsSubjectivity');
  // let resultsPolarity = document.getElementById('resultsPolarity');
  const resultsConfidence = document.getElementById('resultsConfidence');
  const resultsAgreement = document.getElementById('resultsAgreement');
  const resultsIrony = document.getElementById('resultsIrony');

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
      // const processedData = await response.json();
      // return processedData;
    } catch (err) {
      console.log(err, 'error');
    }
  }

  postData('http://localhost:8088/analyze', { articleUrl: urlText })
    .then((res) => {
      processedData = res;
    })
    .then(() => {
      console.log(processedData);

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
