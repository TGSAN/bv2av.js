const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF';
const s = [11, 10, 3, 8, 4, 6, 2, 9, 5, 7];
const xor = 177451812n;
const add = 100618342136696320n;

var tr = [];
for (var i = 0; i < 58; i++) {
    tr[table[i]] = i;
}

function dec(x) {
    var r = 0n;
    for (var i = 0; i < 10; i++) {
        r += BigInt(tr[x[s[i]]]) * BigInt(58) ** BigInt(i);
    }
    return Number((r - add) ^ xor);
}

function enc(x) {
    var x = (BigInt(x) ^ BigInt(xor)) + add;
    var r = ['B', 'V'];
    for (var i = 0; i < 10; i++) {
        r[s[i]] = table[parseInt(Number(x / BigInt(58) ** BigInt(i) % BigInt(58)))];
    }
    return r.join('');
}