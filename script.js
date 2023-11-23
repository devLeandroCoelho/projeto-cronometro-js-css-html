let cronometro;
let voltaAtual = 0;
let tempoUltimaVolta = 0;
let tempoVoltaAnterior = 0;
let voltas = [];

function formatarTempo(tempo) {
  const milissegundos = tempo % 1000;
  const segundos = Math.floor(tempo / 1000) % 60;
  const minutos = Math.floor(tempo / (1000 * 60)) % 60;
  const horas = Math.floor(tempo / (1000 * 60 * 60));

  return (
    (horas < 10 ? '0' : '') + horas + ':' +
    (minutos < 10 ? '0' : '') + minutos + ':' +
    (segundos < 10 ? '0' : '') + segundos + '.' +
    (milissegundos < 10 ? '00' : (milissegundos < 100 ? '0' : '')) + milissegundos
  );
}

function iniciarCronometro() {
  cronometro = setInterval(() => {
    tempoUltimaVolta += 10; // Aumentando em 10 milissegundos a cada intervalo (1000ms = 1s)
    document.getElementById('cronometro').innerHTML = formatarTempo(tempoUltimaVolta);
  }, 10); // Intervalo definido para 10 milissegundos
}

function pararCronometro() {
  clearInterval(cronometro);
}

function resetCronometro() {
  tempoUltimaVolta = 0;
  document.getElementById('cronometro').innerHTML = formatarTempo(tempoUltimaVolta);
  pararCronometro();
  voltas = [];
  voltaAtual = 0;
  tempoVoltaAnterior = 0;
  atualizarListaVoltas();
}

function registrarVolta() {
  if (voltaAtual > 0) {
    const diferencaTempo = tempoUltimaVolta - tempoVoltaAnterior;
    voltas.push(diferencaTempo);
  } else {
    voltas.push(tempoUltimaVolta);
  }
  
  tempoVoltaAnterior = tempoUltimaVolta;
  voltaAtual++;
  atualizarListaVoltas();
}

function atualizarListaVoltas() {
  const listaElement = document.getElementById('listaVoltas');
  listaElement.innerHTML = '';

  for (let i = 0; i < voltas.length; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = `Volta ${i + 1}: ${formatarTempo(voltas[i])}`;
    listaElement.appendChild(listItem);
  }
}
