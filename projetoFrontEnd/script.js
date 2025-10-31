const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const msg = document.getElementById("msg");
const lista = document.getElementById("lista");
const imgInput = document.getElementById("imgInput");

addBtn.addEventListener("click", () => {
  const texto = input.value.trim();

  // Validação do texto
  if (texto.length < 5) {
    msg.textContent = "Erro: mínimo de 5 caracteres!";
    msg.className = "error";
    input.style.borderColor = "red";
    return;
  }

  msg.textContent = "Item adicionado com sucesso!";
  msg.className = "success";
  input.style.borderColor = "green";

  // Cria o elemento <li>
  const li = document.createElement("li");
  const textDiv = document.createElement("div");
  textDiv.className = "text";

  // Cria o ícone da imagem
  const img = document.createElement("img");
  img.alt = "ícone";

  // Se o usuário escolheu uma imagem, usa o FileReader
  if (imgInput.files && imgInput.files[0]) {
    const file = imgInput.files[0];
    if (file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      msg.textContent = "Erro: apenas arquivos PNG são permitidos!";
      msg.className = "error";
      return;
    }
  } else {
    // Se não escolheu imagem, usa um ícone padrão
    img.src = "https://cdn-icons-png.flaticon.com/512/992/992651.png";
  }

  const span = document.createElement("span");
  span.textContent = texto;

  textDiv.appendChild(img);
  textDiv.appendChild(span);

  // Botão de editar
  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.addEventListener("click", () => {
    const novoTexto = prompt("Editar item:", span.textContent);
    if (novoTexto && novoTexto.trim().length >= 5) {
      span.textContent = novoTexto.trim();
      msg.textContent = "Item editado com sucesso!";
      msg.className = "success";
    } else {
      msg.textContent = "Erro: mínimo de 5 caracteres para editar!";
      msg.className = "error";
    }
  });

  // Botão de excluir
  const delBtn = document.createElement("button");
  delBtn.textContent = "Excluir";
  delBtn.addEventListener("click", () => {
    li.remove();
    msg.textContent = "Item excluído!";
    msg.className = "error";
  });

  // Botões para mudar a ordem
  const upBtn = document.createElement("button");
  upBtn.textContent = "↑";
  upBtn.addEventListener("click", () => {
    if (li.previousElementSibling) {
      lista.insertBefore(li, li.previousElementSibling);
    }
  });

  const downBtn = document.createElement("button");
  downBtn.textContent = "↓";
  downBtn.addEventListener("click", () => {
    if (li.nextElementSibling) {
      lista.insertBefore(li.nextElementSibling, li);
    }
  });

  // Monta o item da lista
  li.appendChild(textDiv);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  li.appendChild(upBtn);
  li.appendChild(downBtn);

  lista.appendChild(li);

  // Limpa campos
  input.value = "";
  imgInput.value = "";
});
