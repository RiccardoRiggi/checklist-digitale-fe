export function getData(date: Date){
    if(date!=null){
        date = new Date(date);
        return aggiungiZeri(date.getDate())+"/"+aggiungiZeriMese(date.getMonth())+"/"+date.getFullYear();
    }else{
        return "";
    }
}

export function getOra(date: Date){
    if(date!=null){
        date = new Date(date);
        return aggiungiZeri(date.getHours())+":"+aggiungiZeri(date.getMinutes())+":"+aggiungiZeri(date.getSeconds());
    }else{
        return "";
    }
}

function aggiungiZeri(giorno: number) {
    if(giorno>9){
        return giorno;
    }else{
        return "0"+(giorno);
    }

}

function aggiungiZeriMese(giorno: number) {
    if(giorno>9){
        return giorno+1;
    }else{
        return "0"+(giorno+1);
    }

}
