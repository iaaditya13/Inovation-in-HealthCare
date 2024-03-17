document.addEventListener('DOMContentLoaded', () => {
    let reportCount = 1;
  
    const reportsContainer = document.getElementById('reports');
    const reportDetails = document.getElementById('reportDetails');
    const newReportForm = document.getElementById('newReportForm');
    const newReportText = document.getElementById('newReportText');
    const newReportKeyword = document.getElementById('newReportKeyword');
    const newReportDoctor = document.getElementById('newReportDoctor');
    const addReportBtn = document.getElementById('addReportBtn');
  
    let currentOpenReportId = null;
  
    const addReportToDOM = (report) => {
      const button = document.createElement('button');
      button.innerHTML = `
        <strong>Date:</strong> ${report.date}<br>
        <strong>Keyword:</strong> ${report.keyword}<br>
        <strong>Consulted:</strong> ${report.consulted}
      `;
      button.classList.add('report-button');
      button.onclick = () => {
        if (currentOpenReportId !== report.id) {
          reportDetails.style.display = 'block';
          reportDetails.textContent = report.fullReport;
          currentOpenReportId = report.id;
        } else {
          reportDetails.style.display = 'none';
          currentOpenReportId = null;
        }
      };
      reportsContainer.appendChild(button);
    };
  
    addReportBtn.addEventListener('click', () => {
      newReportForm.style.display = 'block';
      reportDetails.style.display = 'none';
      currentOpenReportId = null;
    });
  
    newReportForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const keyword = newReportKeyword.value.trim();
      const doctor = newReportDoctor.value.trim();
      const fullReport = newReportText.value.trim();
  
      if (!keyword || !doctor || !fullReport) {
        alert('Please fill out all fields.');
        return;
      }
  
      reportCount++;
      const newReport = {
        id: reportCount,
        date: new Date().toLocaleDateString(),
        keyword: keyword, 
        consulted: doctor, 
        fullReport: fullReport, 
      };
      addReportToDOM(newReport);
      newReportText.value = '';
      newReportKeyword.value = '';
      newReportDoctor.value = '';
      newReportForm.style.display = 'none';
    });
  });