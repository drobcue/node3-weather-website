const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

msg1.textContent = '';
msg2.textContent = '';

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    msg1.textContent = 'Loading...';
    fetch('/weather?address=' + location).then((res)=>{
        res.json().then(({error, location, forecast})=>{
            if(error){
                return msg1.textContent = error;
            }
            msg1.textContent = location;
            msg2.textContent = forecast;
            //console.log(forecast, 'At', location);
        });
    }).catch((err) =>{
        console.log(err);
    });
});