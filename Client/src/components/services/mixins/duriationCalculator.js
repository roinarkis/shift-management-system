export default{

    data(){
        return{
            duriation: ''
        }
    },
    methods:{
       calcDuriation(startTime,endTime)
       {
    let diffInMilliSeconds = Math.abs(endTime - startTime) / 1000;
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    var minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    if(Number(startTime.getHours())>Number(endTime.getHours())){ //shift started on day x and ended in x+1
        var newDuriationHours = Number(endTime.getHours())+(23-Number(startTime.getHours()));
        var newDuriationMinutes = Number(endTime.getMinutes()) +(60-Number(startTime.getMinutes()));
        if(newDuriationMinutes>59){
        newDuriationMinutes = newDuriationMinutes % 60;
        newDuriationHours++;
        }
        if(newDuriationMinutes<10){
            newDuriationMinutes = '0' + newDuriationMinutes;
           }
        this.duriation = String(newDuriationHours) +':'+String(newDuriationMinutes);
    }
    else{
        if(minutes<10){
            minutes = '0' + String(minutes);
        }
    this.duriation = String(hours) +':'+String(minutes);
    }
}
    }}