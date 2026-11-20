const stage = document.querySelector('.stage');
const berries = [...document.querySelectorAll('.berry')];
const progress = document.querySelector('#progress');
const reward = document.querySelector('#reward');
const nest = document.querySelector('.nest');
const feed = document.querySelector('#feed');
const reset = document.querySelector('#reset');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let collected = 0;

for (const berry of berries) {
  berry.addEventListener('click', () => {
    if (berry.getAttribute('aria-pressed') === 'true') return;
    berry.setAttribute('aria-pressed', 'true');
    berry.textContent = '✓';
    collected += 1;
    progress.textContent = collected === berries.length
      ? 'Все ягоды найдены. Можно угостить птенца!'
      : 'Найдено ягод: ' + collected + ' из ' + berries.length + '.';
    feed.hidden = collected < berries.length;
  });
}
feed.addEventListener('click', () => {
  stage.dataset.time = 'night';
  reward.hidden = false;
  nest.hidden = false;
  reset.hidden = false;
  feed.hidden = true;
  progress.textContent = 'Птенец поел. Пора устроиться на ночлег.';
  reset.focus();
});
reset.addEventListener('click', () => {
  collected = 0;
  stage.dataset.time = 'sunset';
  for (const berry of berries) {
    berry.textContent = '●';
    berry.setAttribute('aria-pressed', 'false');
  }
  reward.hidden = nest.hidden = reset.hidden = feed.hidden = true;
  progress.textContent = 'Найдено ягод: 0 из 3.';
  berries[0].focus();
});
addEventListener('scroll', () => {
  if (motion.matches) return;
  const offset = Math.max(-20, Math.min(20, (innerHeight / 2 - stage.getBoundingClientRect().top) / 20));
  stage.style.setProperty('--drift', offset + 'px');
}, {passive: true});
