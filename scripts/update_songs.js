#!/usr/bin/env node
/**
 * Song Data Update Script (Node.js)
 *
 * Usage:
 *     node scripts/update_songs.js              # Show status
 *     node scripts/update_songs.js --generate   # Generate JS data
 *     node scripts/update_songs.js --update     # Update index.html
 *     node scripts/update_songs.js --list       # List all songs
 */

const fs = require('fs');
const path = require('path');

// MinIO 配置
const MINIO_BASE_URL = 'https://minio.xlwang.top/api/v1/buckets/music/objects/download?preview=true&prefix=';

// 生成 MinIO URL
function generateMinioUrl(audioPath) {
  const encoded = encodeURIComponent(audioPath);
  return MINIO_BASE_URL + encoded;
}

// Project paths
const projectRoot = path.resolve(__dirname, '..');
const musicDir = path.join(projectRoot, 'music');
const indexHtml = path.join(musicDir, 'index.html');
const chineseDir = path.join(musicDir, 'chinese');
const englishDir = path.join(musicDir, 'english');

// Audio extensions
const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];

// Hard-coded song metadata
const songDatabase = {
  // Chinese songs
  '两只老虎.mp3': {
    name: '两只老虎',
    emoji: '🐯',
    desc: '动物认知',
    lyrics: '两只老虎，两只老虎\n跑得快，跑得快\n一只没有耳朵\n一只没有尾巴\n真奇怪，真奇怪'
  },
  '小星星.mp3': {
    name: '小星星',
    emoji: '⭐',
    desc: '睡前安抚',
    lyrics: '一闪一闪亮晶晶\n满天都是小星星\n挂在天上放光明\n好像许多小眼睛'
  },
  '一分钱.mp3': {
    name: '一分钱',
    emoji: '💰',
    desc: '品德教育',
    lyrics: '我在马路边捡到一分钱\n把它交给警察叔叔手里\n叔叔拿了钱对我把头点\n我高兴地说了声：叔叔再见'
  },
  '小燕子.mp3': {
    name: '小燕子',
    emoji: '🐦',
    desc: '动物认知',
    lyrics: '小燕子，穿花衣\n年年春天来这里\n我问燕子你为啥来\n燕子说，这里的春天最美丽'
  },
  '拔萝卜.mp3': {
    name: '拔萝卜',
    emoji: '🥕',
    desc: '团队合作',
    lyrics: '拔萝卜，拔萝卜\n嗨吆嗨吆拔萝卜\n嗨吆嗨吆拔不动\n老太婆，快快来\n快来帮我们拔萝卜'
  },
  '找朋友.mp3': {
    name: '找朋友',
    emoji: '👋',
    desc: '社交能力',
    lyrics: '找呀找呀找朋友\n找到一个好朋友\n敬个礼，握握手\n你是我的好朋友'
  },
  '丢手绢.mp3': {
    name: '丢手绢',
    emoji: '🎈',
    desc: '游戏互动',
    lyrics: '丢，丢，丢手绢\n轻轻地放在小朋友的后面\n大家不要告诉他\n快点快点捉住他'
  },
  '小兔子乖乖.mp3': {
    name: '小兔子乖乖',
    emoji: '🐰',
    desc: '安全意识',
    lyrics: '小兔子乖乖，把门儿开开\n快点儿开开，我要进来\n不开不开我不开\n妈妈没回来，谁来也不开'
  },
  '世上只有妈妈好.mp3': {
    name: '世上只有妈妈好',
    emoji: '💝',
    desc: '亲情教育',
    lyrics: '世上只有妈妈好\n有妈的孩子像个宝\n投进妈妈的怀抱\n幸福享不了'
  },
  '小毛驴.mp3': {
    name: '小毛驴',
    emoji: '🫏',
    desc: '动物认知',
    lyrics: '我有一只小毛驴\n我从来也不骑\n有一天我心血来潮\n骑着去赶集'
  },
  '数鸭子.mp3': {
    name: '数鸭子',
    emoji: '🦆',
    desc: '数学启蒙',
    lyrics: '门前大桥下\n游过一群鸭\n快来快来数一数\n二四六七八'
  },
  '采蘑菇的小姑娘.mp3': {
    name: '采蘑菇的小姑娘',
    emoji: '🍄',
    desc: '劳动教育',
    lyrics: '采蘑菇的小姑娘\n背着一个大竹筐\n清晨光着小脚丫\n走遍森林和山冈'
  },
  '让我们荡起双桨.mp3': {
    name: '让我们荡起双桨',
    emoji: '🚣',
    desc: '童年快乐',
    lyrics: '让我们荡起双桨\n小船儿推开波浪\n海面上倒映着美丽的白塔\n四周环绕着绿树红墙'
  },
  '卖报歌.mp3': {
    name: '卖报歌',
    emoji: '📰',
    desc: '历史教育',
    lyrics: '啦啦啦！啦啦啦！\n我是卖报的小行家\n不等天明去等派报\n一面走，一面叫'
  },
  '娃哈哈.mp3': {
    name: '娃哈哈',
    emoji: '😊',
    desc: '快乐童年',
    lyrics: '我们的祖国是花园\n花园里花朵真鲜艳\n和暖的阳光照耀着我们\n每个人脸上都笑开颜'
  },
  '种太阳.mp3': {
    name: '种太阳',
    emoji: '☀️',
    desc: '想象力培养',
    lyrics: '我有一个美丽的愿望\n长大以后能播种太阳\n播种一个，一个就够了\n会结出许多的许多的太阳'
  },
  '读书郎.mp3': {
    name: '读书郎',
    emoji: '📚',
    desc: '学习意识',
    lyrics: '小嘛小儿郎\n背着那书包上学堂\n不怕太阳晒\n也不怕那风雨狂'
  },
  '蜗牛与黄鹂鸟.mp3': {
    name: '蜗牛与黄鹂鸟',
    emoji: '🐌',
    desc: '坚持精神',
    lyrics: '阿门阿前一棵葡萄树\n阿嫩阿嫩绿地刚发芽\n蜗牛背着那重重的壳呀\n一步一步地往上爬'
  },
  '小螺号.mp3': {
    name: '小螺号',
    emoji: '🐚',
    desc: '海洋认知',
    lyrics: '海边有个小螺号\n滴哩哩吹起来\n海螺听了笑开怀\n笑开怀'
  },
  '春天在哪里.mp3': {
    name: '春天在哪里',
    emoji: '🌸',
    desc: '季节认知',
    lyrics: '春天在哪里呀\n春天在哪里\n春天在那青翠的山林里\n这里有红花呀\n这里有绿草\n还有那会唱歌的小黄鹂'
  },

  // English songs
  'Twinkle Twinkle Little Star.mp3': {
    name: 'Twinkle Twinkle Little Star',
    emoji: '⭐',
    desc: 'Sleep Time',
    lyrics: 'Twinkle, twinkle, little star\nHow I wonder what you are\nUp above the world so high\nLike a diamond in the sky'
  },
  'abcsongs.mp3': {
    name: 'ABC Song',
    emoji: '🅰️',
    desc: 'Alphabet Learning',
    lyrics: 'A B C D E F G\nH I J K L M N O P\nQ R S T U V\nW X Y Z\nNow I know my ABCs\nNext time won\'t you sing with me'
  },
  'Happy Birthday.mp3': {
    name: 'Happy Birthday',
    emoji: '🎂',
    desc: 'Holiday Greeting',
    lyrics: 'Happy birthday to you\nHappy birthday to you\nHappy birthday dear friend\nHappy birthday to you'
  },
  'Row Row Row Your Boat.mp3': {
    name: 'Row Row Row Your Boat',
    emoji: '🚣',
    desc: 'Coordination',
    lyrics: 'Row, row, row your boat\nGently down the stream\nMerrily, merrily, merrily, merrily\nLife is but a dream'
  },
  'Mary Had a Little Lamb.mp3': {
    name: 'Mary Had a Little Lamb',
    emoji: '🐑',
    desc: 'Animal Learning',
    lyrics: 'Mary had a little lamb\nLittle lamb, little lamb\nMary had a little lamb\nIts fleece was white as snow'
  },
  'London Bridge.mp3': {
    name: 'London Bridge',
    emoji: '🌉',
    desc: 'Culture Learning',
    lyrics: 'London Bridge is falling down\nFalling down, falling down\nLondon Bridge is falling down\nMy fair lady'
  },
  'OldMacDonald.mp3': {
    name: 'Old MacDonald Had a Farm',
    emoji: '🚜',
    desc: 'Animal Sounds',
    lyrics: 'Old MacDonald had a farm\nE-I-E-I-O\nAnd on his farm he had a cow\nE-I-E-I-O\nWith a moo-moo here\nAnd a moo-moo there'
  },
  'WheelsBus.mp3': {
    name: 'The Wheels on the Bus',
    emoji: '🚌',
    desc: 'Transportation',
    lyrics: 'The wheels on the bus go round and round\nRound and round, round and round\nThe wheels on the bus go round and round\nAll through the town'
  },
  'HeadShoulders.mp3': {
    name: 'Head Shoulders Knees and Toes',
    emoji: '👤',
    desc: 'Body Parts',
    lyrics: 'Head, shoulders, knees and toes\nKnees and toes\nHead, shoulders, knees and toes\nKnees and toes\nAnd eyes and ears and mouth and nose'
  },
  "If You're Happy.mp3": {
    name: "If You're Happy",
    emoji: '😊',
    desc: 'Emotion Expression',
    lyrics: "If you're happy and you know it\nClap your hands\nIf you're happy and you know it\nClap your hands\nIf you're happy and you know it\nAnd you really want to show it\nIf you're happy and you know it\nClap your hands"
  },
  'Baa Baa Black Sheep.mp3': {
    name: 'Baa Baa Black Sheep',
    emoji: '🐑',
    desc: 'Animal Learning',
    lyrics: 'Baa, baa, black sheep\nHave you any wool?\nYes, sir, yes, sir\nThree bags full'
  },
  'Hickory Dickory Dock.mp3': {
    name: 'Hickory Dickory Dock',
    emoji: '🕐',
    desc: 'Number Learning',
    lyrics: 'Hickory dickory dock\nThe mouse ran up the clock\nThe clock struck one\nThe mouse ran down\nHickory dickory dock'
  },
  'Five little monkeys.mp3': {
    name: 'Five Little Monkeys',
    emoji: '🐵',
    desc: 'Count Down',
    lyrics: 'Five little monkeys jumping on the bed\nOne fell off and bumped his head\nMama called the doctor and the doctor said\nNo more monkeys jumping on the bed'
  },
  'Rain Rain Go Away.mp3': {
    name: 'Rain Rain Go Away',
    emoji: '🌧️',
    desc: 'Nature',
    lyrics: 'Rain, rain, go away\nCome again another day\nLittle Johnny wants to play\nRain, rain, go away'
  },
  'Eensy Weensy Spider.mp3': {
    name: 'Itsy Bitsy Spider',
    emoji: '🕷️',
    desc: 'Animal Learning',
    lyrics: 'The itsy bitsy spider went up the water spout\nDown came the rain and washed the spider out\nOut came the sun and dried up all the rain\nAnd the itsy bitsy spider went up the spout again'
  },
  'Do-Re-Mi.mp3': {
    name: 'Do-Re-Mi',
    emoji: '🎵',
    desc: 'Music Learning',
    lyrics: 'Doe, a deer, a female deer\nRay, a drop of golden sun\nMe, a name I call myself\nFar, a long, long way to run'
  },
  'You Are My Sunshine.mp3': {
    name: 'You Are My Sunshine',
    emoji: '☀️',
    desc: 'Love Expression',
    lyrics: 'You are my sunshine, my only sunshine\nYou make me happy when skies are gray\nYou\'ll never know dear, how much I love you\nPlease don\'t take my sunshine away'
  },
  'Ring Around the Rosie.mp3': {
    name: 'Ring Around the Rosie',
    emoji: '🌹',
    desc: 'Game Interactive',
    lyrics: 'Ring around the rosie\nA pocket full of posies\nAshes, ashes\nWe all fall down'
  },
  'This Old Man.mp3': {
    name: 'This Old Man',
    emoji: '👴',
    desc: 'Number Learning',
    lyrics: 'This old man, he played one\nHe played knick-knack on my thumb\nWith a knick-knack paddywhack\nGive a dog a bone\nThis old man came rolling home'
  },
  'Pat a cake.mp3': {
    name: 'Pat a Cake',
    emoji: '🧁',
    desc: 'Game Interactive',
    lyrics: 'Pat-a-cake, pat-a-cake, baker\'s man\nBake me a cake as fast as you can\nPat it and prick it and mark it with B\nPut it in the oven for baby and me'
  },
  'One little finger.mp3': {
    name: 'One Little Finger',
    emoji: '👆',
    desc: 'Body Parts',
    lyrics: 'One little finger, one little finger, one little finger\nTap tap tap\nPoint your finger up\nPoint your finger down\nPut it on your head, head, head'
  }
};

// Scan audio files and match with metadata
function getSongsFromDir(dir, lang) {
  const songs = [];
  if (!fs.existsSync(dir)) return songs;

  const files = fs.readdirSync(dir);
  files.forEach(filename => {
    const ext = path.extname(filename).toLowerCase();
    if (audioExtensions.includes(ext)) {
      if (songDatabase[filename]) {
        const meta = songDatabase[filename];
        songs.push({
          name: meta.name,
          filename: filename,
          emoji: meta.emoji,
          desc: meta.desc,
          lyrics: meta.lyrics,
          audioPath: `${lang}/${filename}`
        });
      } else {
        // Unknown file
        songs.push({
          name: filename.replace(/\.[^.]*$/, ''),
          filename: filename,
          emoji: '🎵',
          desc: 'Unknown',
          lyrics: 'Lyrics not available',
          audioPath: `${lang}/${filename}`
        });
      }
    }
  });

  return songs;
}

const chineseSongs = getSongsFromDir(chineseDir, 'chinese');
const englishSongs = getSongsFromDir(englishDir, 'english');

// Escape string for JavaScript
function escapeJSString(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Generate JS array
function buildJSArray(songs) {
  const lines = songs.map((s, i) => {
    const lyrics = escapeJSString(s.lyrics);
    const minioUrl = generateMinioUrl(s.audioPath);
    const fallback = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${i + 1}.mp3`;
    return `            { emoji: "${s.emoji}", name: "${s.name}", desc: "${s.desc}", lyrics: "${lyrics}", audio: "${minioUrl}", fallback: "${fallback}" }`;
  });
  return lines.join(',\n');
}

// Update index.html
function updateIndexHtml() {
  if (!fs.existsSync(indexHtml)) {
    console.error('ERROR: index.html not found');
    return false;
  }

  let content = fs.readFileSync(indexHtml, 'utf8');

  // Find and replace song data - use a regex to match the entire block
  const songDataPattern = /const chineseSongs = \[([\s\S]*?)\];[\s\S]*?const englishSongs = \[([\s\S]*?)\];/;

  if (!songDataPattern.test(content)) {
    console.error('ERROR: Cannot find song data arrays');
    return false;
  }

  // Build new content
  const chineseJs = buildJSArray(chineseSongs);
  const englishJs = buildJSArray(englishSongs);

  let newContent = content.replace(
    songDataPattern,
    `const chineseSongs = [\n${chineseJs}\n        ];\n\n        const englishSongs = [\n${englishJs}\n        ];`
  );

  // Update song count in language buttons
  newContent = newContent.replace(
    /🇺🇸 English Songs \(\d+\)/,
    `🇺🇸 English Songs (${englishSongs.length})`
  );
  newContent = newContent.replace(
    /🇨🇳 中文儿歌 \(\d+\)/,
    `🇨🇳 中文儿歌 (${chineseSongs.length})`
  );

  // Backup
  const backupPath = indexHtml + '.bak';
  fs.copyFileSync(indexHtml, backupPath);
  console.log(`Backup: ${backupPath}`);

  // Write new content
  fs.writeFileSync(indexHtml, newContent, 'utf8');
  console.log(`Updated: ${indexHtml}`);

  return true;
}

// Show status
function showStatus() {
  console.log('\n' + '='.repeat(50));
  console.log('Song Status Report');
  console.log('='.repeat(50));

  const langs = [
    { name: 'Chinese', songs: chineseSongs },
    { name: 'English', songs: englishSongs }
  ];

  langs.forEach(lang => {
    console.log(`\n[${lang.name} Songs]`);
    console.log(`   Total: ${lang.songs.length}`);

    if (lang.songs.length > 0) {
      console.log('');
      lang.songs.forEach(s => {
        const isKnown = songDatabase.hasOwnProperty(s.filename);
        const status = isKnown ? '[OK]' : '[?]';
        console.log(`   ${status} ${s.name} (${s.filename})`);
      });
    }
  });

  console.log('\n' + '='.repeat(50));
}

// List all songs
function showSongList() {
  console.log('\n' + '='.repeat(80));
  console.log('Song List');
  console.log('='.repeat(80));

  const langs = [
    { name: 'Chinese', songs: chineseSongs, flag: 'CN' },
    { name: 'English', songs: englishSongs, flag: 'EN' }
  ];

  langs.forEach(lang => {
    console.log(`\n[${lang.flag}] ${lang.name} Songs\n`);

    lang.songs.forEach((s, i) => {
      const isKnown = songDatabase.hasOwnProperty(s.filename);
      const status = isKnown ? '[OK]' : '[?]';
      console.log(`  ${(i + 1).toString().padStart(2)}. ${status} ${s.name}`);
      console.log(`      File: ${s.filename}`);
      console.log(`      Desc: ${s.desc}`);
      console.log(`      Path: ${s.audioPath}`);
      console.log('');
    });
  });

  console.log('='.repeat(80));
}

// Generate JS data
function showJSData() {
  console.log('// Chinese songs data');
  console.log('const chineseSongs = [');
  chineseSongs.forEach(s => {
    const lyrics = escapeJSString(s.lyrics);
    const fallback = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    console.log(`    { emoji: "${s.emoji}", name: "${s.name}", desc: "${s.desc}", lyrics: "${lyrics}", audio: "${s.audioPath}", fallback: "${fallback}" },`);
  });
  console.log('];');
  console.log('');
  console.log('// English songs data');
  console.log('const englishSongs = [');
  englishSongs.forEach(s => {
    const lyrics = escapeJSString(s.lyrics);
    const fallback = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    console.log(`    { emoji: "${s.emoji}", name: "${s.name}", desc: "${s.desc}", lyrics: "${lyrics}", audio: "${s.audioPath}", fallback: "${fallback}" },`);
  });
  console.log('];');
}

// Parse arguments
const args = process.argv.slice(2);
const isGenerate = args.includes('--generate') || args.includes('-g');
const isUpdate = args.includes('--update') || args.includes('-u');
const isList = args.includes('--list') || args.includes('-l');
const isQuiet = args.includes('--quiet') || args.includes('-q');

// Main
if (isList) {
  showSongList();
} else if (isGenerate) {
  showJSData();
  if (!isQuiet) showStatus();
} else if (isUpdate) {
  showStatus();
  if (updateIndexHtml()) {
    console.log('\n[SUCCESS] Update completed!');
  } else {
    console.log('\n[ERROR] Update failed!');
    process.exit(1);
  }
} else {
  showStatus();
}
