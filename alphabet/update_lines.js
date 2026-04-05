const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 将 pairsCount 从 6 改为 10
content = content.replace(/const pairsCount = 6;/, 'const pairsCount = 10;');

// 替换右侧小写字母部分，添加打乱逻辑
const oldLower = `<div class="match-side">
                    ${letters.map(l => `<div class="match-item" data-letter="${l.lower}" onclick="selectLineItem('${l.lower}', 'lower')">${l.lower}</div>`).join('')}
                </div>`;

const newLower = `<div class="match-side">
                    ${[...letters].sort(() => Math.random() - 0.5).map(l => `<div class="match-item" data-letter="${l.lower}" onclick="selectLineItem('${l.lower}', 'lower')">${l.lower}</div>`).join('')}
                </div>`;

content = content.replace(oldLower, newLower);

// 修改胜利条件从6改为10
content = content.replace(/if \(lineMatches === 6\) {/, 'if (lineMatches === 10) {');

fs.writeFileSync('index.html', content);
console.log('Done!');
