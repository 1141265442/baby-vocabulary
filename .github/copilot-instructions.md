# Project Guidelines

## Code Style
- Keep the project as a simple static web app: plain HTML, CSS, and vanilla JavaScript in one page unless a task explicitly requests splitting files.
- Preserve existing language usage: learner-facing UI text is Chinese, vocabulary fields are English plus IPA pronunciation.
- Follow current naming patterns in JavaScript (e.g., originalWords, currentIndex, isShuffle) and avoid introducing frameworks or build tooling.

## Architecture
- Main app entry is [英文/vocabulary.html](英文/vocabulary.html), containing:
  - UI markup for the card and controls
  - Embedded CSS theme/styles
  - In-page JavaScript state and behavior (navigation, shuffle mode, speech synthesis)
- Vocabulary content is currently duplicated across:
  - [英文/vocabulary.html](英文/vocabulary.html)
  - [英文/词汇学习表.md](英文/词汇学习表.md)
  - [英文/词汇翻译.md](英文/词汇翻译.md)

## Build and Test
- No install/build pipeline is required.
- Run by opening [英文/vocabulary.html](英文/vocabulary.html) in a browser.
- Validate changes manually in browser:
  - Next/previous navigation
  - Ordered/shuffle mode toggle
  - Speech synthesis button and keyboard shortcuts

## Conventions
- When adding or modifying vocabulary, keep all three vocabulary files synchronized unless the task explicitly requests a different single source of truth.
- Keep the layout child-friendly: large type, clear contrast, simple controls, and touch-friendly button sizes.
- Keep pronunciation format in IPA wrapped with slashes (example: /naɪt/).
- Prefer linking to existing docs for word lists/translations instead of re-embedding long lists in instructions:
  - [英文/词汇学习表.md](英文/词汇学习表.md)
  - [英文/词汇翻译.md](英文/词汇翻译.md)
