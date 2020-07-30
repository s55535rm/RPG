let flag = true;
//プレイヤーデータ
let plyName = prompt("名前をどうぞ");
plySt0.textContent = plyName;
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 30, 50, 75, 105, 140, 180, 225, 275];
let plyImg = document.getElementById("plyImg");
for (let i = 0; i < 7; i++) {
    let plySti = document.getElementById("plySt" + i);
}
//プレイヤーの回復
plyImg.addEventListener("mousedown", () => {
    if (flag) {
        plyImg.src = "img/playerC.png";
    }
});
plyImg.addEventListener("mouseup", () => {
    if (flag) {
        plyImg.src = "img/playerA.png";
        plyHp += plyHeal;
        if (plyHp > plyHpMax) {
            plyHp = plyHpMax;
        }
        plySt2.textContent = "HP:" + plyHp;
    }
});
//敵データ
let eneLv = 0;
let eneName = [
    "ぷよぷよ",
    "こうもり",
    "ジェリー",
    "くちなわさん",
    "ポチ",
    "鬼いちゃん",
    "Q太郎",
    "ゾンビ",
    "たまたま",
    "プーさん",
];
eneSt0.textContent = eneName[eneLv];
let eneHp = [10, 20, 30, 40, 50, 65, 85, 110, 140, 200];
let eneHpMax = [10, 15, 20, 25, 30, 35, 40, 45, 50, 200];
let eneAtt = [2, 1, 4, 9, 20, 30, 30, 35, 16, 27];
let enekill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let eneExp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let eneCnt = [5, 1, 2, 3, 5, 6, 5, 5, 2, 3];
let eneCntMax = [5, 1, 2, 3, 5, 6, 5, 5, 2, 5];
let eneImg = document.getElementById("eneImg");
for (let i = 0; i < 5; i++) {
    let eneSti = document.getElementById("eneSt" + i);
}
//プレイヤーの攻撃
eneImg.addEventListener("mousedown", () => {
    if (flag) {
        eneImg.src = "img/enemyB" + eneLv + ".png";
    }
});
eneImg.addEventListener("mouseup", () => {
    if (flag) {
        eneImg.src = "img/enemyA" + eneLv + ".png";
        if (eneHp[eneLv] > 0) {
            eneHp[eneLv] -= plyAtt;
            if (eneHp[eneLv] < 0) {
                eneHp[eneLv] = 0;
            }
        } else {
            if (eneLv == 9) {
                flag = false;
                clearInterval(loop);
                eneImg.src = "img/clear.png";
            }
            eneHp[eneLv] = eneHpMax[eneLv];
            enekill[eneLv]++;
            eneSt4.textContent = "倒した回数:" + enekill[eneLv];
            //経験値
            plyExp += eneExp[eneLv];
            plySt5.textContent = "経験値:" + plyExp;
            plyExpNext -= eneExp[eneLv];
            if (plyExpNext < 0) {
                plyExpNext = 0;
            }
            //レベルアップの処理
            if (plyExpNext == 0) {
                plyExpNext = plyExpNeed[plyLv];
                plyLv++;
                if (plyLv > 11) {
                    plyLv = 11;
                }
                plySt1.textContent = "レベル:" + plyLv;
                plyHpMax = plyLv * 3 + 6;
                plyHp = plyHpMax;
                plySt2.textContent = "HP:" + plyHp;
                plyAtt++;
                plySt3.textContent = "攻撃力:" + plyAtt;
                plyHeal++;
                plySt4.textContent = "回復魔法:" + plyHeal;
            }
            plySt6.textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
        }
        eneSt2.textContent = "HP:" + eneHp[eneLv];
    }
});
//敵の攻撃
let eneSec = document.getElementById("eneSec");
let loop = setInterval(() => {
    if (eneCnt[eneLv] > 0) {
        eneCnt[eneLv]--;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneLv] + "秒";
    } else {
        plyImg.src = "img/playerB.png";
        plyHp -= eneAtt[eneLv];
        if (plyHp > 0) {
            plySt2.textContent = "HP:" + plyHp;
            eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneLv] + "秒";
        } else {
            plyHp = 0;
            clearInterval(loop);
            flag = false;
            plySt2.textContent = "HP:" + plyHp;
            eneSec.textContent = "ゲームオーバー";
        }
        setTimeout(() => {
            if (flag) {
                eneCnt[eneLv] = eneCntMax[eneLv];
                plyImg.src = "img/playerA.png";
                eneSec.textContent = "モンスターの攻撃まで" + eneCnt[eneLv] + "秒";
            }
        }, 500);
    }
}, 1000);
//次のモンスター
let right = document.getElementById("right");
right.addEventListener("mouseup", () => {
    if (flag) {
        eneImg.src = "img/enemyA" + eneLv + ".png";
    }
});
right.addEventListener("mousedown", () => {
    if (flag) {
        eneLv++;
        if (eneLv > 9) {
            eneLv = 9;
        }
    }
    eneSt0.textContent = eneName[eneLv];
    eneSt1.textContent = "レベル:" + eneLv;
    eneSt2.textContent = "HP:" + eneHpMax[eneLv];
    eneSt3.textContent = "攻撃力:" + eneAtt[eneLv];
    eneSt4.textContent = "倒した回数:" + enekill[eneLv];
});
//逃げる
let left = document.getElementById("left");
left.addEventListener("mouseup", () => {
    if (flag) {
        eneImg.src = "img/enemyA" + eneLv + ".png";
    }
});
left.addEventListener("mousedown", () => {
    if (flag) {
        eneLv--;
        if (eneLv < 0) {
            eneLv = 0;
        }
    }
    eneSt0.textContent = eneName[eneLv];
    eneSt1.textContent = "レベル:" + eneLv;
    eneSt2.textContent = "HP:" + eneHpMax[eneLv];
    eneSt3.textContent = "攻撃力:" + eneAtt[eneLv];
    eneSt4.textContent = "倒した回数:" + enekill[eneLv];
});