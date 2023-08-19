document.getElementById("submitId").onclick = async function(event){
    event.preventDefault()
    var cpf = document.getElementById("cpfId").value
    var nome = document.getElementById("nomeId").value 
    var nasc = document.getElementById("nascId").value
    var corpo = {cpf: cpf, nome: nome, nasc: nasc}
    console.log(corpo)
    await fetch("http://localhost:8080/cadastro", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(corpo)}).then(res => res.json()).then(data => {
        console.log(data)
    })
    //alert(cpf)
    //alert(name)
    //alert(nasc)
}

document.getElementById("mybtn").onclick = async function(){

    await fetch("http://localhost:8080").then(res => res.json()).then(data => {
        var tabela = document.getElementById("tabela")
        var cabecalho = document.getElementById("cabecalho")
        console.log(data)
        cabecalho.innerHTML = ""
        tabela.innerHTML = ""
        cabecalho.innerHTML = `<tr>
                               <td><b>CPF</b></td>
                               <td><b>NOME</b></td>
                               <td style="text-align: end"><b>NASCIMENTO</b></td>
                               </tr>`
        data.forEach(element => {
            console.log(element.cpf,element.nome,element.data_nascimento)
            
            tabela.innerHTML += `<tr>
                                 <td>${element.cpf}</td>
                                 <td>${element.nome}</td>
                                 <td>${element.data_nascimento}</td>
                                 </tr>`
        });
    })


}

//element.cpf + ' ' + element.nome + ' ' + element.data_nascimento + '<br>'