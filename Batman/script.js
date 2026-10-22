
const wallpaper = document.querySelector('.wallpaper');
const veil = document.querySelector('.veil');
const man = document.querySelector('.man');
const wayne = document.querySelector('.wayne');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal(x, y) {
  veil.style.setProperty('--x', `${x}px`);
  veil.style.setProperty('--y', `${y}px`);
  const manBounds = man.getBoundingClientRect();
  wayne.style.setProperty('--x', `${x - manBounds.left}px`);
  wayne.style.setProperty('--y', `${y - manBounds.top}px`);
  wayne.style.opacity = '1';
  if (!reducedMotion) {
    const offsetX = (x / window.innerWidth - 0.5) * 18;
    const offsetY = (y / window.innerHeight - 0.5) * 10;
    man.style.transform = `translateX(calc(-50% + ${offsetX}px)) translateY(${offsetY}px)`;
  }
}

wallpaper.addEventListener('pointermove', (event) => reveal(event.clientX, event.clientY));
wallpaper.addEventListener('pointerleave', () => {
  veil.style.setProperty('--x', '50%');
  veil.style.setProperty('--y', '50%');
  wayne.style.opacity = '0';
  man.style.transform = 'translateX(-50%)';
});
  

 