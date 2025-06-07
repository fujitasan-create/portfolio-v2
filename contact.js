document.getElementById('contact-form').addEventListener('submit',async function (e){
    e.preventDefault();

    const data={
        name:document.getElementById('name').value,
        email:document.getElementById('email').value,
        message:document.getElementById('message').value
    };

    const statusMessage=document.getElementById('status-message');

    try{
        const res =await fetch('https://contactformapi-ay2q.onrender.com/contact',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });

        if(res.ok){
            statusMessage.textContent='送信完了！';
            statusMessage.styleColor='green';
            e.target.reset();
        }else{
            statusMessage.textContent='送信に失敗しました';
            statusMessage.color='red';
        }
    }catch(err){
        statusMessage.textContent='送信に失敗しました。ネットワークをお確かめください'
        statusMessage.style.color='red';
    }
});