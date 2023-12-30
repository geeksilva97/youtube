<<<<<<< HEAD
# youtube.com/edigleyssonsilva

A bunch of YouTube samples
=======
# Dev journal
dang github

Esses dias conversanod com um amigo meu sobre uma oportunidade ele mencinou a entrevista técnica. Ele falou que fez uma
implementação de um parser que reoslve operações matematicas.

tipo add(5, 3). o parser lê e da o resultado 8. mas fica mais complicado como add(3, subtract(3, 5)) que tem que dar
como resultado 1, final, primeiro vamos fazer a subtracao 3-5 resultando em -2 e só depois a adição 3 + (-2) que resulta
em 1.

O ponto é que achei um porblema interessante, sobretudo pra quem acha que aprender sobre compiladores/interpretadores
é perdade de tempo. O que você mais tira é conhecimento daí. conhecimento das suas ferramntas. Voce vai entender como
funciona sua linguagem e sua runtime preferida.

no mais basico nivel voce aprende a fazer uns parsers bem legais. agora, nesse momento me senti compelido a implementar
isso... vamos ver no que vai dar. O que for rolado vou docmentando aqui.

meu plano é ver em quanto tempo sai e depois ir um passo a lém criando uma copia smples do awilix, usando um parser
também.

- instalei o jest
- é bom ter um TDD em casos assim de input e output
- Escrevi alguns casos de teste
    
describe('math operation parser', () => {
  it('parsers inline operations', () => {

  })
  it.todo('parsers nested operations recursively')
  it.todo('raises an exception when it cannot parse')
});

<<<<<<< HEAD
Comecei com uma regex complexa, mas deu trabalho demais

const REGEX = /(?<operation>add|subtract|divide|multiply)\((?<first_operand>[a_zA_Z0-9])\s*,\s*(?<second_operand>.*)\)/gm;

Estava tentanto ja extrair cada pedado, tipo

operando, operador 1 e operador 2.

os operadores poderiam ser tanto um numero - literal - quando uma outra chamada de funcao, como uma recursao


Foi complicado fazer isso, resolvi entao só pegar o que fica entre os parenteses e fazer split

/^(?<operation>add|subtract|divide|multiply)\((?<params>.*)\)/gm
>>>>>>> fc878d0 (update regex)
=======
De fato usar regex é acumular problemas. mas deu certo, consegui usar uma regex -- ainda nao tentei melhorar - que
extrai a operacao, os parametros e recursivamente vai reaplicado se necessario.
>>>>>>> 1c221b9 (add test for float/double numbers)
