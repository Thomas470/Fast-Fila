window.addEventListener("DOMContentLoaded", function() {
  var quadradosContainer = document.getElementsByClassName("quadrados-container")[0];
  var mensagemErro = document.createElement("p");
  mensagemErro.style.color = "red";
  mensagemErro.style.display = "none";

  // Faz a requisição AJAX para obter os dados dos estabelecimentos
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var estabelecimentos = JSON.parse(xhr.responseText);

      // Obtém o horário atual
      var dataAtual = new Date();
      var horarioAtual = dataAtual.toLocaleTimeString('pt-BR', { hour12: false });
      console.log("Horario Atual:", horarioAtual);

      // Cria listas separadas para retângulos verdes e vermelhos
      var quadradosVerdes = [];
      var quadradosVermelhos = [];

      // Loop através dos estabelecimentos
      for (var i = 0; i < estabelecimentos.length; i++) {
        var estabelecimento = estabelecimentos[i];

        // Cria o elemento de quadrado
        var quadrado = document.createElement("div");
        quadrado.classList.add("quadrado");

        // Cria os elementos internos do quadrado
        var retangulo = document.createElement("div");

        // Verifica se o horário atual está dentro do intervalo
        if (horarioAtual >= estabelecimento.horario_inicial && horarioAtual <= estabelecimento.horario_final) {
          retangulo.classList.add("retangulo-vermelho");
          quadradosVermelhos.push(quadrado); // Adiciona ao array de retângulos vermelhos
        } else {
          retangulo.classList.add("retangulo-verde");
          quadradosVerdes.push(quadrado); // Adiciona ao array de retângulos verdes
        }

        var quadradoContent = document.createElement("div");
        quadradoContent.classList.add("quadrado-content");

        var nome = document.createElement("h3");
        nome.textContent = estabelecimento.Nome;

        var descricao = document.createElement("p");
        descricao.textContent = estabelecimento.Descricao;

        var horario = document.createElement("p");
        horario.textContent = "Horario de Pico:" + estabelecimento.horario_inicial + " - " + estabelecimento.horario_final;

        // Adiciona os elementos ao quadrado
        quadradoContent.appendChild(nome);
        quadradoContent.appendChild(descricao);
        quadradoContent.appendChild(horario);

        quadrado.appendChild(retangulo);
        quadrado.appendChild(quadradoContent);

        // Adiciona o quadrado ao container
        quadradosContainer.appendChild(quadrado);
      }

      // Combina as duas listas em uma única lista ordenada
      var quadradosOrdenados = quadradosVerdes.concat(quadradosVermelhos);

      // Adiciona os quadrados ordenados ao container
      for (var j = 0; j < quadradosOrdenados.length; j++) {
        quadradosContainer.appendChild(quadradosOrdenados[j]);
      }

      // Exibe a mensagem de erro se não houver estabelecimentos correspondentes
      if (quadradosOrdenados.length === 0) {
        quadradosContainer.appendChild(mensagemErro);
      }
    }
  };

  xhr.open("GET", "php/connect.php", true);
  xhr.send();

  // Função para filtrar os quadrados com base na pesquisa
  function filtrarQuadrados() {
    var searchTerm = document.getElementById('search-input').value.toLowerCase();
    var quadrados = quadradosContainer.querySelectorAll('.quadrado');
    var nomeEncontrado = false;

    for (var i = 0; i < quadrados.length; i++) {
      var quadrado = quadrados[i];
      var quadradoText = quadrado.textContent.toLowerCase();

      if (quadradoText.startsWith(searchTerm)) {
        quadrado.style.display = 'block';
        nomeEncontrado = true;
      } else {
        quadrado.style.display = 'none';
      }
    }

    // Exibe a mensagem de erro se não houver estabelecimentos correspondentes à pesquisa
    if (!nomeEncontrado) {
      mensagemErro.style.display = 'block';
    } else {
      mensagemErro.style.display = 'none';
    }
  }

  // Adiciona o evento de escuta ao campo de pesquisa
  var searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', filtrarQuadrados);
});
