<?php
// Configurações do banco de dados
$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "exp";

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se houve algum erro na conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Consulta SQL para selecionar todos os registros da tabela Estabelecimento
$sql = "SELECT * FROM Estabelecimento";

// Executa a consulta SQL
$result = $conn->query($sql);

// Verifica se houve algum resultado
if ($result->num_rows > 0) {
    // Array para armazenar os dados dos estabelecimentos
    $data = array();

    // Loop através dos resultados e armazena os dados
    while ($row = $result->fetch_assoc()) {
        // Adiciona os dados do estabelecimento ao array
        $data[] = $row;
    }

    // Converte os dados em JSON
    $jsonData = json_encode($data);
    echo $jsonData;
} else {
    echo "Não foram encontrados registros na tabela Estabelecimento.";
}

// Fecha a conexão com o banco de dados
$conn->close();
?>