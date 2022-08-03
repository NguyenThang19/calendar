$(document).ready(function(){
  //Get Current Date, Month, Year and day
  let date = new Date();
  let arrDateTime = [];
  let arrValueForDateInPut = [];
  // Current hour
  let curHour = date.getHours();
  // Current Minutes
  let curMinute=date.getMinutes();
  // Month Array
  const arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arrWeeks = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  // Setup Default
  $('#date-input').prop('readonly',true);
  // Function for value date input section 
    const setValueDateInput = () => {
      let dayChoise = $('.calendarBody__calendarDays > .to-day').html();
      let monthChoise = $('.calendarHeading__infoCalendar > .month').html();
      let yearChoise = $('.calendarHeading__infoCalendar > .year').html();
      let weekDayChoise = arrWeeks[new Date(yearChoise, monthChoise - 1, dayChoise).getDay()];
      arrValueForDateInPut[2] = weekDayChoise;
      arrValueForDateInPut[3] = dayChoise;
      arrValueForDateInPut[4] = monthChoise;
      arrValueForDateInPut[5] = yearChoise;
    }

    const fellValueForDateInput = () => {
    $('#date-input').val(`${arrValueForDateInPut[0]}:${arrValueForDateInPut[1]} - ${arrValueForDateInPut[2]}  ${arrValueForDateInPut[3]} / ${arrValueForDateInPut[4]} / ${arrValueForDateInPut[5]}`);
    }

  // Function Generate Calendar
  const generateCalendar = () => {
       // Get Last Day of Current Month
      const lastDayCurrent = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
      // Get First Day of Current Month
      const firstDayCurrent = new Date(date.getFullYear(),date.getMonth(),1).getDay();
      // Get Last Day Prev Month
      const prevLastDay = new Date(date.getFullYear(), date.getMonth(),0).getDate();
      // Get next Day of Next Month
      const currLastDayOfWeek = new Date(date.getFullYear(), date.getMonth()+1,0).getDay();
      let nextDayOfNextMonth = 7 - currLastDayOfWeek - 1;
      $('.month').html(arrMonth[date.getMonth()]);
      $('.year').html(date.getFullYear());
      let days = "";

      // Prev Days of Prev Month
      for(let x = firstDayCurrent - 1; x > 0; x--){
          days += `<div class="prev-days">${prevLastDay - x + 1}</div>`;
      }
      
      if( firstDayCurrent === 0){
          for( let k = 6; k > 0; k--){
              days +=`<div class="prev-days">${prevLastDay - k}</div>`
          }
      }

      // Days of Current Month
      for(let i = 1; i <= lastDayCurrent; i++){
         
          if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
              days += `<div class="to-day curr-Day">${i}</div>`;
         }else{
          days += `<div>${i}</div>`;
         }
      }

      // Days of Next Day 
      for(j=1; j <= nextDayOfNextMonth + 1; j ++ ){
          days += `<div class = "next-days">${j}</div>`;
          $('.calendarBody__calendarDays').html(days);
      };

      // Set To Day
      $('.calendarBody__calendarDays div').click( function () {
        $('.calendarBody__calendarDays > div.to-day').removeClass("to-day");
        $(this).addClass('to-day');
        setValueDateInput();
        fellValueForDateInput();
        checkDataInput();
      })
  };

  // To Prev Month
  $('.calendarHeading_iconPrevMonth').click( () => {
    let prevMonth = parseInt($('.calendarHeading__infoCalendar > span.month').html());
    let nextYear = parseInt($('.calendarHeading__infoCalendar > span.year').html());
    let presentMonth = new Date().getMonth();
    let presentYear = new Date().getFullYear();
    if( prevMonth > (presentMonth + 1) ){
      date.setMonth(date.getMonth()-1);
      generateCalendar();
      setMinDate();
    }else if (presentYear < nextYear){
      date.setMonth(date.getMonth() - 1);
      generateCalendar();
      setMinDate();
      $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','1');
    }else{
      generateCalendar();
      setMinDate();
      $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','0.2');
    }
    checkDataInput();
});
  // To Next Month
  $('.calendarHeading_iconNextMonth').click( () => {
      date.setMonth(date.getMonth()+1);
      generateCalendar();
      setMinDate();
      checkDataInput();
      $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','1');
  });
  generateCalendar();

  // Function TIME PICKER SECTION
  const timPicker = () => {
      let hours = "";
      let minutes = "";
      let setHours = [];
      let setMinutes = [];
      // Set time 
      function setHour (){
        for(let i = 0; i < 24; i++){
          setHours.push(i);
        }
      };

      function setMinute(){
        for(let i = 0; i < 60; i++){
          if(i < 10)
          {
            i = "0"+i;
          }
          setMinutes.push(i);
        }
      };

      setHour();
      setMinute();

      // Update time
      const updateTime = () => {
        // Pick Time
        // Hour
        $("#example-picker").picker({
            data: setHours,
            lineHeight: 30,
            selected: curHour
          }, function (s) {
            hours = `${s}`;
            arrDateTime[0] = hours;
            arrValueForDateInPut[0] = hours;
            $(".example-picker").data("value", s);
            let getContentHours = $(`#example-picker > .picker-scroller > .option:nth(${s})`).html();
            let getElementsHour = $(`#example-picker > .picker-scroller > .option:nth(${s})`);
            let getElementHours = $(`#example-picker > .picker-scroller > .option`);
             if(s === getContentHours ){
              getElementHours.removeClass('font-style-timepicker');
              getElementHours.removeClass('f-14');
              getElementHours.css('opacity', '0.5');
              getElementsHour.addClass('font-style-timepicker');
              $(`#example-picker .picker-scroller > .option:nth(${s-2})`).addClass('f-14');
            }
            fellValueForDateInput();
          });    
          
        //   Minute
          $("#example-pickers").picker({
            data: setMinutes,
            lineHeight: 30,
            selected: curMinute
          }, function (s) {
            minutes = `${s}`;
            arrDateTime[1] = minutes;
            $(".example-pickers").data("value", s);
            let getContentHours = $(`#example-pickers .picker-scroller > .option:nth(${s})`).html();
            let getElementsHour = $(`#example-pickers .picker-scroller > .option:nth(${s})`);
            let getElementHours = $(`#example-pickers .picker-scroller > .option`);
            if(getContentHours === s){
              getElementHours.removeClass('font-style-timepicker');
              getElementHours.removeClass('f-14');
              getElementHours.css('opacity', '0.5');
              getElementsHour.addClass('font-style-timepicker');
              $(`#example-pickers .picker-scroller > .option:nth(${s-2})`).addClass('f-14');
            }
            arrValueForDateInPut[1] = s;
            fellValueForDateInput();
          });
      }
      updateTime();
    }
   timPicker();

  // Reset Calendar
  // function resetCalendar(){
  //   $('.calendarBody__calendarDays > div.to-day').removeClass("to-day");
  //   $('.calendarBody__calendarDays').find(".curr-Day").addClass("to-day");
  // }

  // Set Min Date 
  const setMinDate = () => {
    let nodeListDay = $('.calendarBody__calendarDays > div');
    let nodeListPrevDay = $('.calendarBody__calendarDays > div.prev-days');
    let nodeListNextDay = $('.calendarBody__calendarDays > div.next-days');
    let months = $('.calendarHeading__infoCalendar > span.month').html();
    let years = $('.calendarHeading__infoCalendar > span.year').html();
    if(parseInt(years) === new Date().getFullYear() && parseInt(months -1) === new Date().getMonth())
    {
      for(let i = (nodeListPrevDay.length); i < (nodeListDay.length - nodeListPrevDay.length - nodeListNextDay.length); i++){
        let valueNodeItem = nodeListDay[i].innerText;
        if(parseInt(valueNodeItem) < new Date().getDate()){
          nodeListDay[i].classList.add('disable-day');
          }
        }
      }
  }

  // Touch Events Change Month Calendar
  function changeCalendar() {
    let calendarBody = $('.pickCalendar__calendarBody')[0];
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    function checkDirection (){
      if(touchStartX > touchEndX && Math.abs(touchEndY - touchStartY) <= 40){
        date.setMonth(date.getMonth()+1);
        generateCalendar();
        setMinDate();
        $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','1');
        checkDataInput();
      }else if(touchStartX < touchEndX && Math.abs(touchEndY - touchStartY) <= 40){
        let prevMonth = parseInt($('.calendarHeading__infoCalendar > span.month').html());
        let nextYear = parseInt($('.calendarHeading__infoCalendar > span.year').html());
        let presentMonth = new Date().getMonth();
        let presentYear = new Date().getFullYear();
        if( prevMonth > (presentMonth + 1) ){
          date.setMonth(date.getMonth()-1);
          generateCalendar();
          setMinDate();
          checkDataInput();
        }else if (presentYear < nextYear){
          date.setMonth(date.getMonth() - 1);
          generateCalendar();
          setMinDate();
          checkDataInput();
          $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','1');
        }else{
          generateCalendar();
          setMinDate();
          checkDataInput();
          $('.pickCalendar__calendarHeading > .calendarHeading_iconPrevMonth').css('opacity','0.2');
        }
      }
    }
    calendarBody.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    });
    calendarBody.addEventListener('touchend',e => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      checkDirection();
    })
  };
  changeCalendar();

  // Function check data input
  function checkDataInput(){
    let checkDay = $('.calendarBody__calendarDays > div.to-day').html();
    if(checkDay == null){
      $(".calendarSection__btn--save").addClass('disactive-btn');
    }else{
      $(".calendarSection__btn--save").removeClass('disactive-btn');
    }
  }

  // checkDataInput();

  // Form Input Click
  $("#input-date").click( function (event){
    $('.calendarSection').slideDown("slow");
    $('.container-calendar').css('visibility','visible');
    $("#input-date").blur();
    setValueDateInput();
    fellValueForDateInput();
    // resetCalendar();
    // generateCalendar();
    timPicker();
    setMinDate();
  });
  // Event Button Save
  $(".calendarSection__btn--save").click( () => {
    $('#input-date').val(`${arrValueForDateInPut[0]}:${arrValueForDateInPut[1]} - ${arrValueForDateInPut[2]}  ${arrValueForDateInPut[3]} / ${arrValueForDateInPut[4]} / ${arrValueForDateInPut[5]}`);
    $('.calendarSection').slideUp("slow");
    setTimeout(() => {
    $('.container-calendar').css('visibility','hidden');
    }, 400);
    curHour = arrValueForDateInPut[0];
    curMinute = arrValueForDateInPut[1];
  });

  // Bubbling Event
  $('.container-calendar').click( () => {
    
    $('.calendarSection').slideUp("slow");
    setTimeout(() => {
      $('.container-calendar').css('visibility','hidden');
    }, 400);
  });

  $('.calendarSection').click( (event) => {
    event.stopPropagation();
  });

  // Button Close
  $('.calendarSection__btn--close').click( () => {
    $('.calendarSection').slideUp("slow");
    $('.container-calendar').css('visibility','hidden');
  });

})