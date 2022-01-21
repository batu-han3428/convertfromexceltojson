let bas = [];
let btn_upload = document.getElementById("btn-upload-csv");
btn_upload.addEventListener('click', ()=> 
{
    if(document.getElementById('upload-csv').files[0] !== undefined){

        Papa.parse(document.getElementById('upload-csv').files[0], {
            download:true,
            header:false,
            encoding: "ISO-8859-9",
            complete: function(results){
      
                bas = [];

                var json = "[";                                 

                const olustur = (sayi)=>{                          
                    return `"${bas[sayi]}":`;                                                     
                }

                let o = 0;

                results.data.map((veriler, index)=>{

                    if(index === 0){
                        veriler.forEach(element => {
                            bas.push(element)
                        });                                       
                    }else{
                        if(veriler[0] !== ''){
                            json += `{`;
                        
                            veriler.forEach(element=>{
                                if(o===bas.length)
                                    o = 0;
                                json+=olustur(o)                                    
                                json+=`"${element}",`;  
                                o++;               
                            })
                    
                            if(results.data.length === index+2)
                                json+=`}`;
                            else
                                json+=`},`;
                        }                         
                    }
                });
                    
                json+= "]";                   
                
                $.ajax({
                    url: 'https://localhost:5001/api/Convert/ConvertToJson',
                    type: 'POST',
                    contentType: "application/json",
                    dataType: 'json',
                    data: JSON.stringify(json),
                    success: function (data) {
                        createTable(data)      
                        dowloadFile()                
                    },
                    error: function (request, status, error) {
                        setTimeout(() => {
                            console.clear();
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Beklenmeyen Bir Hata Oluştu..!'
                            })                                                     
                        }, 500);                        
                    }
                });
            }
        });      
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lütfen Dosya Seçiniz..!'
        })
    }
} );      

const dowloadFile = () =>{

    fetch('https://localhost:5001/api/Convert/DownloadJson')
    .then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'dosya.json';
        document.body.appendChild(a); 
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    })
    .catch((a) => console.error(a));

}

Number.prototype.formatMoney = function (fractionDigits, decimal, separator) {
    
    fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
    
    decimal = typeof (decimal) === "undefined" ? "." : decimal;
    
    separator = typeof (separator) === "undefined" ? "," : separator;
    
    var number = this;
    
    var neg = number < 0 ? "-" : "";
    
    var wholePart = parseInt(number = Math.abs(+number || 0).toFixed(fractionDigits)) + "";
    
    var separtorIndex = (separtorIndex = wholePart.length) > 3 ? separtorIndex % 3 : 0;
    
    return neg +
    
    (separtorIndex ? wholePart.substr(0, separtorIndex) + separator : "") +
    
    wholePart.substr(separtorIndex).replace(/(\d{3})(?=\d)/g, "$1" + separator) +
    
    (fractionDigits ? decimal + Math.abs(number - wholePart).toFixed(fractionDigits).slice(2) : "");

};

const createTable = (a) => {

    let html = `
    <div id='table' class="table-responsive mt-3 mx-auto" style="width:90% !important; overflow:scroll-y; max-height:200px;">
        <table class="table table-striped table-light table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
    `;

    bas.forEach((deger,index)=>{
        html+=`            
            <th scope="col">${deger}</th>
        `;
    })

    html+=`                           
                </tr>
            </thead>
            <tbody>                   
    `;

    a.map((value,index)=>{
      
        html +=`
            <tr>
                <th scope="row">${index+1}</th>
        `;

        let k = JSON.stringify(value).replace("{","").replace(/"/g,"").replace(/}/g,"").split(":").join().split(",");
     
        k.forEach((deger,index)=>{                
            if(index%2 !== 0){
               
                if(!isNaN(deger))
                    html+=`            
                        <td scope="col">${Number(deger).formatMoney(2, ',', '.')}</td>
                    `;
                    // <td scope="col">${deger}</td>
                else
                    html+=`            
                        <td scope="col">${deger}</td>
                    `;
            }                  
        })

        html +=`
            </tr>     
        `;

    });

    html += `        
            </tbody>
        </table>
    </div>
    `;

    if(!$('#table').is('div'))
        document.getElementById('fileUpload').insertAdjacentHTML('beforeend',html);
    else{
        document.getElementById('table').remove();
        document.getElementById('fileUpload').insertAdjacentHTML('beforeend',html);
    }
}