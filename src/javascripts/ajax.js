




var xhr = new XMLHttpRequest()
xhr.onreadystatechange = ()=>{
    if (xhr.readyState===4){
        if (xhr.status===200) {
            
            document.getElementById('ajax').innerHTML = xhr.responseText
        } else {
            alert(xhr.statusText)
        }
    }
}
xhr.open('Get', `/admin/order/${order._id}/updateOrder`)
sendAjax=()=>{
    xhr.send()
    document.getElementById('body').style.display = "none"
}