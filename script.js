const broj0 = document.querySelector('.broj0');
const diler = document.querySelector('.broj1');
const btnHit = document.querySelector('.hit');
const btnHold = document.querySelector('.hold');
const btnNewGame = document.querySelector('.nova-igra');
const btnUlozi = document.querySelector('.ulozi');
const ulog = document.querySelector('.ulog');
const cipovi = document.querySelector('.cipovi');
const poruka = document.querySelector('.poruka');
const ukupno = document.querySelector('ukupni-cipova');
const slikaKarte = document.querySelector('.slika');

// Stalne vrijednosti
let hitBrojac = 0;
slikaKarte.classList.add('hidden');

let dileroveKarte = 0;
let broj1 = 0;
poruka.style.display = 'none';
let pocetniBroj = 0;
let igraSe = true;
let moraDaUlozi = false;
let blokiranjeUlogFunkcije = true;
// Dilerove karte

// Hit listener
btnHit.addEventListener('click', function () {
  if (moraDaUlozi) {
    if (igraSe) {
      hitBrojac++;
      let randomKarta = Math.trunc(Math.random() * 13) + 1;

      pocetniBroj += randomKarta;
      broj0.textContent = pocetniBroj;
      console.log(randomKarta);
      console.log(pocetniBroj);

      // Pobeda!
      if (pocetniBroj === 21) {
        poruka.style.display = 'block';

        poruka.textContent = 'Pobedili ste';
        igraSe = false;
        diler.textContent = dileroveKarte;

        cipovi.textContent =
          Number(cipovi.textContent) + Number(ulog.value) * 3;
        // Ako ima >=21
      } else if (pocetniBroj >= 21) {
        poruka.style.display = 'block';
        poruka.textContent = 'Izgubili ste';
        igraSe = false;
        pocetniBroj = 0;
        diler.textContent = dileroveKarte;
      }
      slikaKarte.classList.remove('hidden');
      slikaKarte.src = `karta-${randomKarta}.png`;
    }
  } else {
    poruka.style.display = 'block';
    poruka.textContent = 'Morate da ulozite';
  }
});
// HOLD
btnHold.addEventListener('click', function () {
  if (igraSe) {
    if (dileroveKarte > 21) {
      poruka.style.display = 'block';

      poruka.textContent = 'Pobedili ste';
      cipovi.textContent = Number(cipovi.textContent) + Number(ulog.value) * 3;
      diler.textContent = dileroveKarte;
    } else if (broj0.textContent > dileroveKarte) {
      poruka.style.display = 'block';

      poruka.textContent = 'Pobedili ste';
      cipovi.textContent = Number(cipovi.textContent) + Number(ulog.value) * 3;
      diler.textContent = dileroveKarte;
    } else {
      poruka.style.display = 'block';

      poruka.textContent = 'Izgubili ste. Probajte ponovo';
      diler.textContent = dileroveKarte;
    }
    igraSe = false;
  }
});
// NEWGAME
btnNewGame.addEventListener('click', function () {
  igraSe = true;
  pocetniBroj = 0;
  broj0.textContent = 0;
  poruka.style.display = 'none';
  moraDaUlozi = false;
  blokiranjeUlogFunkcije = true;
  dileroveKarte = 0;
  diler.textContent = 0;
  slikaKarte.classList.add('hidden');
});

// Ulog
btnUlozi.addEventListener('click', function () {
  if (blokiranjeUlogFunkcije) {
    blokiranjeUlogFunkcije = false;
    if (Number(ulog.value) > Number(cipovi.textContent)) {
      poruka.style.display = 'block';
      poruka.textContent = 'Ulozili ste vise nego sto imate';
    } else {
      cipovi.textContent = cipovi.textContent - Number(ulog.value);
      moraDaUlozi = true;
      poruka.style.display = 'none';
    }
  }
  // Dilerove karte
  let randomKartaDiler = Math.trunc(Math.random() * 13) + 1;
  for (let i = 1; i < 3; i++) {
    dileroveKarte += randomKartaDiler;
  }
  if (dileroveKarte < 11) {
    for (let i = 1; i < 2; i++) {
      dileroveKarte += randomKartaDiler;
    }
  }
});
