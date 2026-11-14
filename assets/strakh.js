/* Iradstrakh site scripts v2.1 */
(function () {
  // version for the visually impaired
  var KEY = "strakh_big";
  function setBig(on) {
    document.body.classList.toggle("big", on);
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
  }
  try { if (localStorage.getItem(KEY) === "1") document.body.classList.add("big"); } catch (e) {}
  var eye = document.getElementById("eye");
  if (eye) eye.addEventListener("click", function (e) {
    e.preventDefault();
    var on = !document.body.classList.contains("big");
    setBig(on);
    eye.textContent = on ? "Normal version" : "Version for the visually impaired";
  });

  // mobile menu
  var tg = document.querySelector(".navtoggle");
  if (tg) tg.addEventListener("click", function () { document.querySelector(".nav").classList.toggle("open"); });

  // banner
  var slides = document.querySelectorAll(".slide"), dots = document.querySelectorAll(".dots button"), cur = 0, t;
  function show(i) {
    if (!slides.length) return;
    cur = (i + slides.length) % slides.length;
    for (var k = 0; k < slides.length; k++) {
      slides[k].classList.toggle("on", k === cur);
      if (dots[k]) dots[k].classList.toggle("on", k === cur);
    }
  }
  function auto() { clearInterval(t); t = setInterval(function () { show(cur + 1); }, 7000); }
  for (var d = 0; d < dots.length; d++) (function (k) { dots[k].addEventListener("click", function () { show(k); auto(); }); })(d);
  var al = document.querySelector(".arrow.l"), ar = document.querySelector(".arrow.r");
  if (al) al.addEventListener("click", function () { show(cur - 1); auto(); });
  if (ar) ar.addEventListener("click", function () { show(cur + 1); auto(); });
  if (slides.length) auto();

  // Talas time (UTC+6), offices open Mon-Fri 9-18; Talas North Terminal daily 8-20
  function talasNow() { var n = new Date(); return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 6 * 3600000); }
  function isOpen(kind) {
    var n = talasNow(), wd = n.getDay(), h = n.getHours() + n.getMinutes() / 60;
    if (kind === "terminal") return h >= 8 && h < 20;
    return wd >= 1 && wd <= 5 && h >= 9 && h < 18;
  }
  var st = document.querySelectorAll("[data-open]");
  for (var s = 0; s < st.length; s++) {
    var o = isOpen(st[s].getAttribute("data-open"));
    st[s].textContent = o ? "open now" : "closed now";
    st[s].className = o ? "open" : "closed";
  }

  // office filter
  var fb = document.querySelectorAll(".offices-filter button");
  for (var f = 0; f < fb.length; f++) fb[f].addEventListener("click", function () {
    var c = this.getAttribute("data-c");
    for (var j = 0; j < fb.length; j++) fb[j].classList.toggle("on", fb[j] === this);
    var g = document.querySelectorAll("[data-city]");
    for (var i = 0; i < g.length; i++) g[i].style.display = (c === "all" || g[i].getAttribute("data-city") === c) ? "" : "none";
  });
})();
