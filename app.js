const dias = document.querySelectorAll(".dia");
const semanaID = new Date().toISOString().slice(0,10);

// Tema
function trocarTema(t) {
  document.body.className = `theme-${t}`;
  localStorage.setItem("tema", t);
}

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo) trocarTema(temaSalvo);

// Salvar semana
function salvarSemana() {
  const dados = [];
  dias.forEach(d => {
    dados.push({
      dia: d.dataset.dia,
      inicio: d.children[1].value,
      fim: d.children[2].value,
      texto: d.children[3].value
    });
  });

  localStorage.setItem("semana-" + semanaID, JSON.stringify(dados));
  gerarGrafico(dados);
  alert("Semana salva!");
}

// Histórico + gráfico
function gerarGrafico(dados) {
  const valores = dados.map(d => d.texto.length > 5 ? 1 : 0);

  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: dados.map(d => d.dia),
      datasets: [{
        data: valores
      }]
    }
  });
}

// PDF
function gerarPDF() {
  html2pdf().from(document.body).set({
    filename: "planner-semanal.pdf",
    html2canvas: { scale: 2 }
  }).save();
}

// Carregar última semana
const salvo = localStorage.getItem("semana-" + semanaID);
if (salvo) gerarGrafico(JSON.parse(salvo));

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
