const dateInput = document.querySelector('.date');
const room = document.querySelector('.room');
const timeInput = document.querySelector('.time');
const subject = document.querySelector('.subject');
const submit = document.querySelector('.btn');


const scheduleData = JSON.parse(localStorage.
  getItem('scheduleData')) || [];//sa umpisa wala pa unod ang array ti ma error ang localstorage get item gin gamitan 'or' o '||' para default array o ang empty array ang value na gamiton ka scheduleData na variable kay kung may ara na unod ang array ti ma gana na ang localStorage get item kay may ara nasa isave na data. amu ni natawag na ternary operator kung false ang sa left side ang right side ang gamiton na value para sa amu na na variable.ma false ang leftside kay kung ang array na isave ya wala unod is called null ang null is false.
  

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month:'long',day:'numeric',year: 'numeric' });
}//islan string format ang date kay ang default format ka html number ang date

function formatTime(timeString) {
  const time = new Date(`1970-01-01T${timeString}`);
  return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}// format ni para mag 12hrs lng ang time kay sa input tag sa html 24hrs iya format

function saveData() {
  localStorage.setItem('scheduleData',JSON
    .stringify(scheduleData));
}//isave ang scheduleData na variable kay ang variable gaka reset kung igwa mo o i-refresh ang page

function addToData() {
  const dateInfo = formatDate(dateInput.value);
  const roomInfo = room.value;
  const timeInfo = formatTime(timeInput.value);
  const subjectInfo = subject.value;
  
  const isOccupied = scheduleData.find(data => data.dateInfo === dateInfo &&
data.roomInfo === roomInfo &&
data.timeInfo === timeInfo);

  if(isOccupied) {
    alert(`This room has been already occupied on ${isOccupied.dateInfo}, at ${isOccupied.timeInfo}`)
  } else {
      scheduleData.push({
        dateInfo,
        roomInfo,
        timeInfo,
        subjectInfo
      });
    }

  dateInput.value ='';
  room.value ='1';
  timeInput.value ='';
  subject.value ='';
  saveData();
  displayData();
}//ang amu ni na function is ibutang mo ang mga gn pang input mo na date,time,room kag subject sa scheduleData na variable 

submit.addEventListener('click',() => {
  addToData();
})//so kung pinduton mo ni na button magana ang function sa babaw sini o ang addtoData

function displayData() {
  let html = '';
  scheduleData.forEach((info) => {
    html += `<tr>
      <th>${info.dateInfo}</th>
      <th>${info.roomInfo}</th>
      <th>${info.timeInfo}</th>
      <th>${info.subjectInfo}</th>
      <th><button class="deleteBtn">Delete</button>
    </tr>`
  });//gn pamutang  ang mga information sa table row
  
  saveData();//syempre tapos butang isave tasa 
   document.querySelector('.js-table').innerHTML = html; // idisplay na sa page o sa table ang gn pang input na information 
  
  document.querySelectorAll('.deleteBtn')
    .forEach((btn,index) => {
      btn.addEventListener('click',() => {
      //butangan functionality ang delete button na kung i click amu ni ang matabo
        scheduleData.splice(index,1);//ang amu ni na information ma delete.splice('ikapila na information',ang 1 isa lng ang idelete na information)
        saveData();//kay tungod may nadula isave ta luwat ang data kay may nagbag o 
        displayData()// idisplay na sa page
      })
    })
}
displayData();// gin tawag ang amu ni na function para idisplay na sa page ang mga information

function sortData() {
 let data = scheduleData.length;
 let swapped;

 do {
  swapped = false;
    for (let i = 0; i < data - 1; i++) {
      const dateA = new Date(scheduleData[i].dateInfo);
      const dateB = new Date(scheduleData[i + 1].dateInfo);
      const timeA = new Date('1970/01/01 ' + scheduleData[i].timeInfo);
      const timeB = new Date('1970/01/01 ' + scheduleData[i + 1].timeInfo);

     if (dateA > dateB || (dateA.getTime() === dateB.getTime() && timeA > timeB)) {
      [scheduleData[i], scheduleData[i + 1]] = [scheduleData[i + 1], scheduleData[i]];
      swapped = true;
    }
  }
} while (swapped);

  displayData();

}
