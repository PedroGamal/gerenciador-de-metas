const{select, input, checkbox}= require('@inquirer/prompts')
let mensagem = "Bem vindo!";
let meta = {
    value:"Tomar 3,5L de água por dia.",
    checked: false
}
let metas = [meta]
const cadastrarMeta= async()=>{
    const meta = await input({message: "Digite a meta: "})
    if(meta.length == 0) {
        mensagem="A meta não pode ser vazia."
        return
    }
    
    metas.push({value: meta,checked:false})
    mensagem= "Meta cadastrada com sucesso!"
}
const listarMetas = async()=>{
    const respostas = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices:[...metas]
    })
    metas.forEach((m)=>{
        m.checked= false
    })
    
    if(respostas== 0 ){
        mensagem=" Nenhuma meta selecionada"
        return
    }
    
    

    respostas.forEach((resposta)=>{
        const meta = metas.find((me)=>{
            return me.value == resposta
        })
        meta.checked = true
    })
    mensagem= 'Meta(s) concluida(s)'
}
const metasRealizadas =async()=>{
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length == 0){
        mensagem="Não existe metas realizadas!"
        return
    }
    await select({
        message:"Metas realizadas: "+ realizadas.length,
        choices: [...realizadas]
    })

}
const metasAbertas = async()=>{
    const abertas = metas.filter((meta)=>{
        return meta.checked != true
    })
    if(metas.length== 0 ){
        mensagem= "Não existem metas abertas!"
        return}
        await select({
            message: "Metas abertas: " + abertas.length,
            choices:[...abertas]
        })
}
const deletarMetas= async()=>{
    const metasDesmarcadas= metas.map((meta)=>{
        
        return {value: meta.value, checked: false}
    })
    const itensDeletar = await checkbox({
        
        message:"Seleciona um item para deletar.",
        choices:[...metasDesmarcadas],
        instructions: false,
    })
    console.log(itensDeletar)
    if (itensDeletar.length == 0){
        mensagem="Nenhum item selecionado."
        return
    }
    itensDeletar.forEach((item)=> {
        metas = metas.filter((meta)=>{
            return meta.value != item
        })
    })
    mensagem="Meta(s) deletada(s) com sucesso"
}
const mostrarMensagem =()=>{
    console.clear();
    if (mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem= ""
    }
}

const start=async () => {
    
    while(true ){
        mostrarMensagem()
        const opcao = await select({
            message: "Menu > ",
            choices: [
                {  
                    name: "Cadastrar meta",
                    value: "Cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "Sair"
                }
            ]
        })
            

        switch(opcao){
            case "Cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break  
            case "Sair":
                console.log("até a próxima!")
                return
        }
    }
    
}
 start()