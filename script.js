// script.js

async function fetchData() {
    const studentId = document.getElementById('studentIdInput').value.trim();
    const errorDiv = document.getElementById('error');
    const infoDiv = document.getElementById('info');
    const tableWrapper = document.querySelector('.table-wrapper');
    const tableBody = document.querySelector('#resultTable tbody');
  
    if (!studentId) {
      errorDiv.textContent = 'Please enter your Student ID';
      infoDiv.style.display = 'none';
      tableWrapper.style.display = 'none';
      return;
    }
  
    try {
      const response = await fetch(`http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=241&studentId=${studentId}`);
      const result = await response.json();
  
      if (result.length > 0) {
        errorDiv.textContent = '';
        infoDiv.style.display = 'block';
        tableWrapper.style.display = 'block';
  
        const studentInfo = result[0];
  
        infoDiv.innerHTML = `
          <p><strong>Semester Name:</strong> ${studentInfo.semesterName}</p>
          <p><strong>Semester Year:</strong> ${studentInfo.semesterYear}</p>
          <p><strong>Student ID:</strong> ${studentInfo.studentId}</p>
          <p><strong>Total CGPA:</strong> ${studentInfo.cgpa || 'N/A'}</p>
        `;
  
        tableBody.innerHTML = '';
        result.forEach((course) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${course.customCourseId}</td>
            <td>${course.courseTitle}</td>
            <td>${course.pointEquivalent}</td>
            <td>${course.gradeLetter}</td>
            <td>${course.totalCredit}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        errorDiv.textContent = 'No data found for this Student ID';
        infoDiv.style.display = 'none';
        tableWrapper.style.display = 'none';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      errorDiv.textContent = 'Something went wrong. Please try again later.';
      infoDiv.style.display = 'none';
      tableWrapper.style.display = 'none';
    }
  }
  