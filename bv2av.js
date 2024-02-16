const table = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';
const max_avid = 1n << 51n;
const base = 58n;
const bvid_len = 12n;
const xor = 23442827791579n;
const mask = 2251799813685247n;

let tr = [];
for (let i = 0; i < base; i++) {
    tr[table[i]] = i;
}

/**
 * avid to bvid
 * @param {bigint} avid
 * @returns {string} bvid
 */
function enc(avid) {
    let r = ['B', 'V'];
    let idx = bvid_len - 1n;
    let tmp = (max_avid | avid) ^ xor;
    while (tmp !== 0n) {
        r[idx] = table[tmp % base];
        tmp /= base;
        idx -= 1n;
    }
    [r[3], r[9]] = [r[9], r[3]];
    [r[4], r[7]] = [r[7], r[4]];
    return r.join('');
}

/**
 * bvid to avid
 * @param {string} bvid
 * @returns {bigint} avid
 */
function dec(bvid) {
    let r = bvid.split('');
    [r[3], r[9]] = [r[9], r[3]];
    [r[4], r[7]] = [r[7], r[4]];
    let tmp = 0n;
    for(let char of r.slice(3)) {
        console.log(char)
        let idx = BigInt(tr[char]);
        tmp = tmp * base + idx;
    }
    let avid = (tmp & mask) ^ xor;
    return avid;
}
