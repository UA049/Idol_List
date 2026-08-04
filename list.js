// --- 見たいアイドル一覧（want.json） ---
fetch("want.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name));

    const ul = document.getElementById("want-list");

    data.forEach(idol => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${idol.homepage}" target="_blank">${idol.name}</a>`;
      ul.appendChild(li);
    });
  });

// --- 見たことあるアイドル一覧（seen.json） ---
fetch("seen.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name));

    const ul = document.getElementById("seen-list");

    data.forEach(idol => {
      const li = document.createElement("li");

      // name（常に表示）
      const name = document.createElement("div");
      name.textContent = idol.name;
      name.style.cursor = "pointer";
      name.style.fontWeight = "bold";

      // note（プルダウンで表示）
      const note = document.createElement("div");
      note.textContent = idol.note || "";
      note.style.display = "none";
      note.style.marginLeft = "1em";
      note.style.color = "#555";

      // クリックで note を開閉
      name.addEventListener("click", () => {
        note.style.display = note.style.display === "none" ? "block" : "none";
      });

      li.appendChild(name);
      li.appendChild(note);
      ul.appendChild(li);
    });
  });
