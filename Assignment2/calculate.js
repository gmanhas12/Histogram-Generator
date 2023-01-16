function init() {
  document
    .getElementById('fileInput')
    .addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event) {
  const reader = new FileReader();
  reader.onload = handleFileLoad;
  reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
  data = event.target.result;
  let arr = [];
  arr = convert(data);
  let gradeArr = [];
  let sum = 0;
  for (let x = 0; x < arr.length; x++) {
    gradeArr.push(arr[x][1]);
    sum += arr[x][1];
  }
  sum = sum / arr.length;
  sum = Math.round(sum * 100) / 100;
  let mean = document.getElementById('mean');
  mean.value = sum;

  let middle = Math.floor(gradeArr.length / 2)
  let nums = gradeArr.sort((a, b) => {
    return a - b;
  });
  let mdn = gradeArr.length % 2 !== 0 ? nums[middle] : (nums[middle - 1] + nums[middle]) / 2;
  let median = document.getElementById('median');
  median.value = mdn;
  
  let lowest = document.getElementById('lowest');
  lowest.value = Math.min(...gradeArr);
  let highest = document.getElementById('highest');
  highest.value = Math.max(...gradeArr);

  let histo = document.querySelectorAll('.histogram input[type=text]');
  for (let x = 0; x < histo.length; x++) {
    histo[x].value='';
  }
  let bound = document.querySelectorAll('.bound input[type=text]');
  for (let x = 0; x < arr.length; x++) {
    for (let y= 1; y < bound.length; y++) {
      if (arr[x][1] >= parseFloat(bound[y].value)) {
        histo[y-1].value += 'ඞ';
        break;
      }
    }
  }
}

function convert(str,delimiter= ',') {
  let con = [];
  let arr = [];
  const rows = str.slice(str.indexOf('\n') + 1).split('\r\n');
  for (let x = 0; x < rows.length; x++) {
    const data = rows[x].split(delimiter);
    data[0] = data[0].trim();
    data[1]= parseFloat(data[1]);
    con.push(data);
  }
  arr = con;
  return arr;
}
