// --- スマホ向けの基本スタイル ---
document.body.style.fontSize = "32px";   // 文字サイズ2倍
document.body.style.lineHeight = "1.6";

// =====================================================
// ① 見たいアイドル一覧（want.json）
// =====================================================
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

// =====================================================
// ② もう一回見たいアイドル一覧（seen.json の homepage があるもの）
// =====================================================
fetch("seen.json")
  .then(res => res.json())
  .then(data => {
    const again = data
      .filter(idol => idol.homepage) // homepage がある＝もう一回見たい
      .sort((a, b) => a.name.localeCompare(b.name));

    const ul = document.getElementById("again-list");

    again.forEach(idol => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${idol.homepage}" target="_blank">${idol.name}</a>`;
      ul.appendChild(li);
    });
  });

// =====================================================
// ③ 見たことあるアイドル一覧（seen.json）
// =====================================================
fetch("seen.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name));

    const ul = document.getElementById("seen-list");

    data.forEach(idol => {
      const li = document.createElement("li");

      // ▶ / ▼ の矢印
      const arrow = document.createElement("span");
      arrow.textContent = "▶ ";
      arrow.style.cursor = "pointer";

      // name（常に表示）
      const name = document.createElement("span");
      name.textContent = idol.name;
      name.style.cursor = "pointer";
      name.style.fontWeight = "bold";

      // note（プルダウンで表示）
      const note = document.createElement("div");
      note.textContent = `- ${idol.note || ""}`;
      note.style.display = "none";
      note.style.marginLeft = "1.5em";
      note.style.color = "#555";

      // クリックで note を開閉
      const toggle = () => {
        const isHidden = note.style.display === "none";
        note.style.display = isHidden ? "block" : "none";
        arrow.textContent = isHidden ? "▼ " : "▶ ";
      };

      arrow.addEventListener("click", toggle);
      name.addEventListener("click", toggle);

      li.appendChild(arrow);
      li.appendChild(name);
      li.appendChild(note);
      ul.appendChild(li);
    });
  });
