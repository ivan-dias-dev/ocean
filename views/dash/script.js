function ola() {
  console.log("Olá mundo");
}

function criaCompra() {
  // Fazer uma solicitação para obter os dados necessários após o carregamento da página
  let token = localStorage.getItem("token");
  let email = localStorage.getItem("email");
  let userId = localStorage.getItem("userId");
  //console.log(userId,email,token)
  fetch("/user/dados", {
    method: "POST",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      valor: 10,
      quantidade: 2,
      status: "Em andamento",
      email: email,
      userId: userId,
      nome: "Tilápia",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
    });
}

function cardEditproduct() {
  addEventListener("click", (e) => {
    const Productid = e.target.parentElement.id;
    if (Productid) {
      console.log("click", Productid);
      fetch("/user/Produtos", {
        method: "GET",
        headers: {
          //Authorization: `${token}`,
          //"Content-Type": "application/json"
          id: Productid,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          document.getElementById("produto").value = data.nome
          document.getElementById("quantidade").value = data.quantidade
          document.getElementById("valor").value = data.valor
          document.getElementById("status").value = data.status
         //console.log(main, "main");
        });
    }
  });
  let body = (document.getElementById("body").innerHTML = `
    <div class="container">
      <div class="row justify-content-center align-items-center align-content-center rowCard">
        <div class="col-md-6 cardEdit">
        <div class="container mt-5">
        <h1>informações do Pedido</h1>
        <form>
          <div class="mb-3">
          <label for="noProdutome" class="form-label">Produto:</label>
          <input type="text" class="form-control" id="produto" name="produto" disabled>
          </div>
          <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade:</label>
            <input type="number" class="form-control" id="quantidade" name="quantidade" disabled>
          </div>
          <div class="mb-3">
          <label for="valor" class="form-label">Valor:</label>
          <input type="text" class="form-control" id="valor" name="valor" disabled>
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status:</label>
            <select class="form-select" id="status" name="status">
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <button type="submit" class="btn btn-warning">Voltar</button>
          <button type="submit" class="btn btn-danger">Cancelar</button>
          <button type="submit" class="btn btn-success">Salvar</button>
          
        </form>
      </div>
        </div>
      </div>
    </div>
  `);
  body = document.getElementById("body").style.backgroundColor =
    "rgb(163 188 209";
  console.log(body);
}
