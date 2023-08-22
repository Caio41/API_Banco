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




document.getElementById("submitBuscaId").onclick = async function(){
    var cpf_procurado = document.getElementById("buscaCpfId").value
    var usuarios = []
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
            if(element.cpf == cpf_procurado){
                usuarios.push(element)
            }
           
        });

        if(usuarios.length==0){
            console.log("não encontrado")
            tabela.innerHTML += "Usuário não encontrado"
        } else {
            tabela.innerHTML += `<tr>
                             <td>${usuarios[0].cpf}</td>
                             <td>${usuarios[0].nome}</td>
                             <td>${usuarios[0].data_nascimento}</td>
                             </tr>`
        }
    })


}



//element.cpf + ' ' + element.nome + ' ' + element.data_nascimento + '<br>'