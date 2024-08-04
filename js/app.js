var slot = document.getElementById('slot');
var spinButton = document.getElementById('spin-button');
var choices = ['🍒', '🍋', '🍉', '🍇', '⭐️', '⚽️', '🐼'];
var duration = 15000;
var totalSlots = 100;
function spinToResult(result) {
    var _a;
    var slots = [];
    for (var i = 0; i < totalSlots; i++) {
        slots.push(choices[i % choices.length]);
    }
    // slotsをランダムにシャッフルし、同じ要素が連続しないように配置
    slots = shuffleAvoidingDuplicates(slots);
    // 最後の要素と result が同じ場合、入れ替え
    if (slots[slots.length - 1] === result) {
        // 適当な位置と入れ替え（ここでは2つ前の要素と入れ替え）
        _a = [slots[slots.length - 2], result], slots[slots.length - 1] = _a[0], slots[slots.length - 2] = _a[1];
    }
    else {
        // result を追加
        slots.push(result);
    }
    slot.innerHTML = slots.map(function (choice) { return "<div>".concat(choice, "</div>"); }).join('');
    slot.style.transition = 'none';
    slot.style.transform = 'translateY(0)';
    var elemHeight = document.querySelectorAll('#slot div')[0].clientHeight;
    // 確実にリフローを発生させる
    setTimeout(function () {
        console.log(slot.scrollHeight);
        console.log(slot.clientHeight);
        slot.style.transition = "transform ".concat(duration, "ms cubic-bezier(0.33, 1, 0.68, 1)");
        slot.style.transform = "translateY(-".concat(slot.clientHeight - elemHeight, "px)");
    }, 100);
}
spinButton.addEventListener('click', function () {
    var result = '⭐️';
    spinToResult(result);
});
// 同じ要素が連続しないようにシャッフルする関数
function shuffleAvoidingDuplicates(arr) {
    var _a, _b;
    var shuffled = arr.slice(); // 元の配列をコピーして使用
    // Fisher-Yatesアルゴリズムでシャッフル
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [shuffled[j], shuffled[i]], shuffled[i] = _a[0], shuffled[j] = _a[1];
    }
    // 隣接する要素が同じ場合に再シャッフル
    for (var i = 1; i < shuffled.length; i++) {
        if (shuffled[i] === shuffled[i - 1]) {
            // 重複を避けるために別の位置と入れ替え
            var j = (i + 1) % shuffled.length;
            _b = [shuffled[j], shuffled[i]], shuffled[i] = _b[0], shuffled[j] = _b[1];
        }
    }
    return shuffled;
}
