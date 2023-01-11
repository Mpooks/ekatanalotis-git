async function isItActive(){

    const response = await fetch('./activeornot.php');


    const ndate = new Date();
    function isLastDayOfMonth(date = new Date()) {

        const oneDayInMs = 1000 * 60 * 60 * 24;
      
        return new Date(date.getTime() + oneDayInMs).getDate() === 1;
      }
      if(isLastDayOfMonth(ndate)===1){
        let day = ndate.getDate();
        let month = ndate.getMonth() + 1;
        let year = ndate.getFullYear();
        let currentDate = `${year}-${month}-${day}`;
        var formData = new FormData();
        formData.append('thismonth', currentDate);
        const response = await fetch('./splitTok.php',{ method: 'POST', body: formData });
      }

}