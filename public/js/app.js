

console.log('Client side js is running.')
const form=document.querySelector('form')
const input=document.querySelector('input')
const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')

//onClickListener for search button
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=input.value
    m1.textContent='Loading...'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
               m1.textContent=data.error
            else{
                m1.textContent=(data.location)
                m2.textContent=(data.weather.desc+', '+data.weather.temp+' degrees celsius')
            }
    
        })
    })
})
//fetch is a client side browser api
