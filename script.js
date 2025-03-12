setInterval(() => {
  let d = new Date();
  let hh = d.getHours();
  let mm = d.getMinutes();
  let ss = d.getSeconds();
  let digiTime = `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;

  let hAngle = (hh % 12) * 30 + mm * 0.5;
  let mAngle = mm * 6 + ss * 0.1;
  let sAngle = ss * 6;

  hour.style.transform = `rotate(${hAngle}deg)`;
  minute.style.transform = `rotate(${mAngle}deg)`;
  second.style.transform = `rotate(${sAngle}deg)`;
  document.getElementById("digital").innerText = `${digiTime}`;
}, 1000);
