import console from 'console';
import readline from 'readline/promises';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
    async function pausar() {
    await rl.question("\nPressione Enter para continuar...");
}
async function executar() {
   
    let escolha = ""; 
    let desejaCadastrarEspada = "";
    let quantidadeCadastro = "";
    let listaEspada = [];
    let precoEspada = [];
    let Quantidadeestoque = [];
    let saldoConta = 10000;
    
    do {
        console.clear();
        console.log("\n--- Mestre das espadas ---");
        console.log("1- Ver Loja");
        console.log("2- Cadastro Espadas");
        console.log("3- Saldo conta")
        console.log("4- Sair");
        escolha = await rl.question("O que deseja fazer? \n");
        console.log("----------------------------");

        if (escolha === "1"){
            console.clear();

            if (listaEspada.length === 0){
                console.log("Espadas indisponiveis...")
            }
            else{
                console.clear();
                console.log("===FICHA DA ESPADA===")

                listaEspada.forEach ((espada, index) => {

                    let raridadeEspada = ""

                    if (precoEspada[index] < 100 ){
                        raridadeEspada = "Comum"
                    }
                    else if (precoEspada[index] >= 100 && precoEspada[index] <= 500){
                        raridadeEspada = "Raro"
                    }
                    else if (precoEspada[index] >= 500 && precoEspada[index] <= 1000){
                        raridadeEspada = "Ultra raro"
                    }
                    else if (precoEspada[index] >= 1000 && precoEspada[index] <= 10000){
                        raridadeEspada = "lendario"
                    }
                    else{
                        raridadeEspada = "mitico"
                    }
                    console.log("---------------------")
                    console.log(`${index}. ${espada}`);
                    console.log(`RS ${precoEspada[index].toFixed(2)}`);
                    console.log(`Raridade: ${raridadeEspada}`);
                    console.log(`estoque: ${Quantidadeestoque[index]}`)
                    
                    
                });
                    let desicaoCompra = await rl.question("Deseja comprar alguma?\n ");

                    if (desicaoCompra === "sim"){
                        
                        let qualComprar = Number(await rl.question("Qual?(Digite por numero)\n "));

                        if (qualComprar >= 0 && qualComprar < listaEspada.length){

                            if (Quantidadeestoque[qualComprar] > 0) {

                                if (saldoConta >= precoEspada[qualComprar]) {
                                    Quantidadeestoque[qualComprar] -= 1;
                                    saldoConta -= precoEspada[qualComprar];
                                    console.log(`\nSucesso! Você comprou a espada: ${listaEspada[qualComprar]}`);
                                } 
                                else{
                                    console.log("\nErro: Você não tem saldo suficiente para esta espada.");
                                }

                            } 
                            else {
                                    console.log("\nErro: Esta espada está esgotada no momento!");
                            }
                        }    
                        else {
                            console.log("Numero invalido! Essa espada não exixte...")
                            await pausar();
                        }
                    }
                    else {
                        await pausar();
                    }
            }
            await pausar();
            
        }
        else if (escolha === "2"){
            console.clear();
            console.log("===CADASTROS DE ESPADAS===")
            desejaCadastrarEspada = await rl.question("Deseja cadastrar espadas?(sim/não) ");
            if (desejaCadastrarEspada === "sim"){
                
                quantidadeCadastro = await rl.question("Deseja casatrar 1 ou 5 espadas?(1/5) ");

                if (quantidadeCadastro === "1"){

                console.clear();
                    
                let nomeEspada = await rl.question("Qual o nome da Espada? \n");
                let preco = Number(await rl.question("Qual é o preço da espada?\n"));
                let estoque = Number(await rl.question("Quantidade de espadas no estoque?\n"));

                listaEspada.push (nomeEspada);
                precoEspada.push (preco);
                Quantidadeestoque.push (estoque);
                console.log(`${nomeEspada} cadastrada com sucesso`);

                await pausar();}

                else{

                    console.clear();
                    
                    for (let i = 0; i < 5; i++){

                        console.clear();

                        let nomeEspada = await rl.question("Qual o nome da Espada? \n");
                        let preco = Number(await rl.question("Qual é o preço da espada?\n"));
                        let estoque = Number(await rl.question("Quantidade de espadas no estoque\n"));

                        listaEspada.push (nomeEspada);
                        precoEspada.push (preco);
                        Quantidadeestoque.push (estoque);
                        console.log(`${nomeEspada} cadastrada com sucesso`);

                        await pausar();
                      }

                    }
                }
            }
            else if (escolha === "3") {
                console.log("Saldo da conta: "+saldoConta.toFixed(2));
                await pausar();
            }
            else if (escolha === "4"){
                console.log("até logo mestre...");
            }
            else {
                console.log("Opção inválida! Escolha um número de 1 a 4.");
                await pausar();
            }

    } while (escolha !== "4");


    rl.close();
}

executar();