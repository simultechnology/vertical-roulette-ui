const slot = document.getElementById('slot') as HTMLElement;
const spinButton = document.getElementById('spin-button') as HTMLButtonElement;

const choices = ['🍒', '🍋', '🍉', '🍇', '⭐️', '⚽️', '🐼'];
const duration = 15000;
const totalSlots = 100;

function spinToResult(result: string) {
  let slots = [];

  for (let i = 0; i < totalSlots; i++) {
    slots.push(choices[i % choices.length]);
  }

  // slotsをランダムにシャッフルし、同じ要素が連続しないように配置
  slots = shuffleAvoidingDuplicates(slots);

  // 最後の要素と result が同じ場合、入れ替え
  if (slots[slots.length - 1] === result) {
    // 適当な位置と入れ替え（ここでは2つ前の要素と入れ替え）
    [slots[slots.length - 1], slots[slots.length - 2]] = [slots[slots.length - 2], result];
  } else {
    // result を追加
    slots.push(result);
  }

  slot.innerHTML = slots.map(choice => `<div>${choice}</div>`).join('');

  slot.style.transition = 'none';
  slot.style.transform = 'translateY(0)';

  let elemHeight = document.querySelectorAll('#slot div')[0].clientHeight;

  // 確実にリフローを発生させる
  setTimeout(() => {
    console.log(slot.scrollHeight);
    console.log(slot.clientHeight);
    slot.style.transition = `transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
    slot.style.transform = `translateY(-${slot.clientHeight - elemHeight}px)`;
  }, 100);

}

spinButton.addEventListener('click', () => {
  const result = '🍇';
  spinToResult(result);
  console.log(result);
});

// 同じ要素が連続しないようにシャッフルする関数
function shuffleAvoidingDuplicates(arr: string[]): string[] {
  let shuffled = arr.slice(); // 元の配列をコピーして使用

  // Fisher-Yatesアルゴリズムでシャッフル
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 隣接する要素が同じ場合に再シャッフル
  for (let i = 1; i < shuffled.length; i++) {
    if (shuffled[i] === shuffled[i - 1]) {
      // 重複を避けるために別の位置と入れ替え
      const j = (i + 1) % shuffled.length;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }

  return shuffled;
}
