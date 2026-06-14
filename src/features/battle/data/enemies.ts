import type { EnemyData } from '../../../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// Enemy registry
//
// すべての敵定義はこのオブジェクトに集約する。
// 消費者は `ENEMY_REGISTRY['red_moai']` のようにIDで参照するため、
// 敵の種類が増えてもimport文が増殖しない。
//
// ファイルが肥大化してきたら area ごとに分割し、
//   import { FOREST_ENEMIES } from './forest'
//   import { DUNGEON_ENEMIES } from './dungeon'
//   export const ENEMY_REGISTRY = { ...FOREST_ENEMIES, ...DUNGEON_ENEMIES }
// とマージするだけでよい。
// ─────────────────────────────────────────────────────────────────────────────

export const ENEMY_REGISTRY = {
  // Test moai - for testing and demonstration purposes, not meant to be a real enemy
  test_moai:{
    name: 'Test Moai',
    description: 'A moai used for testing and demonstration purposes. Not meant to be a real enemy.',
    icon: {
      layers: [
        { char: '🔧', className: 'char-icon__layer--holding' },
        { char: '🗿' },
      ],
    },
    hp: 100,
    actions: [
      [
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 10 } },
      ],
      [
        { type: { kind: 'damage', value: 20 } },
        { type: { kind: 'damage', value: 10 } },
        { type: { kind: 'damage', value: 5 } },
      ],
    ],
    exp: 999,
    gold: 999,
    rarity: 'X',
  },
  // Red Moai - red-tinted moai
  red_moai: {
    name: 'Red Moai',
    description: 'A red-tinted moai.',
    icon: {
      layers: [{ char: '🗿', className: 'char-icon__layer--red-tint' }],
    },
    hp: 20,
    actions: [
      [
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
      ],
    ],
    exp: 10,
    gold: 5,
    rarity: 'C',
  },
  // Blue Moai - blue-tinted moai
  blue_moai: {
    name: 'Blue Moai',
    description: 'A blue-tinted moai.',
    icon: {
      layers: [{ char: '🗿', className: 'char-icon__layer--blue-tint' }],
    },
    hp: 20,
    actions: [
      [
        { type: { kind: 'damage', value: 5 } },
        { type: { kind: 'damage', value: 5 } },
        {
          type: {
            kind: 'damage_status',
            value: 5,
            statusId: 'freeze',
            statusValue: 2,
          },
        },
      ],
    ],
    exp: 15,
    gold: 8,
    rarity: 'C',
  },
  // Yellow Moai - yellow-tinted moai
  // Green Moai - green-tinted moai
  // Orange Moai - orange-tinted moai
  // Purple Moai - purple-tinted moai
  // Pink Moai - pink-tinted moai
  // Brown Moai - brown-tinted moai
  // Big Moai - larger moai with big text
  // Thin Moai - thinner moai with thin text
  // Wide Moai - wider moai with wide text
  // Inverted Moai - upside-down moai with inverted text
  // Shadow of Moai - a dark silhouette of a moai with dark text
  // Golden Moai - a rare shiny golden moai with a lot of money
  // The Invincible Moai - the strongest moai that cannot be damaged, with a glowing aura

  // Balloon Moai - moai holding balloon 🎈
  // Cool Moai - moai with sunglasses 🕶️
  // Hat Moai - moai wearing a hat 🎩
  // Scholar Moai - moai wearing a graduation cap 🎓
  // Lover Moai - moai with a love heart ❤️
  // Broken Lover Moai - moai with a broken heart 💔
  // Blue Lover Moai - moai with a blue love heart 💙
  // Gamer Moai - moai playing a game 🎮
  // Fighter Moai - moai ready to brawl 🥊
  // Mrs. Moai - moai wearing high heels 👠
  // Moai Drip - moai wearing a drip (pants) 👖
  // Archer Moai - moai wielding a bow 🏹
  // Miner Moai - moai holding a pickaxe ⛏️
  // Jazz Moai - moai playing saxophone 🎷
  // Singer Moai - moai singing into a microphone 🎙️
  // Moai Tomb  - a grave of moai 🪦
  // Sign of Moai - moai written on a sign 🪧
  // Inspiration Moai - moai with a bright idea 💡
  // Detective Moai - moai with a magnifying glass 🔎
  // Coin Moai - a coin of moai 🪙
  // Burger Moai - moai eating a burger 🍔
  // Snack Moai - moai eating popcorn 🍿
  // Dessert Moai - moai eating ice cream 🍦
  // Cafe Moai - moai drinking coffee ☕
  // Renaissance Moai - moai drinking wine 🍷
  // Vacation Moai - moai drinking a tropical drink 🍹
  // Feast Moai - moai on a plate 🍽️
  // Cordyceps Moai - moai parasited by mushroom 🍄
  // Skate Moai - moai riding a skateboard 🛹
  // Moai Shrine - a moai torii gate ⛩️
  // Moai Storm - moai surrounded by a whirlwind 🌪️
  // Burning Moai - moai engulfed in flames 🔥
  // Scorching Moai - moai engulfed in bigger flames 🔥🔥
  // Angry Moai - moai radiating anger 💢
  // Furious Moai - moai radiating more anger 💢💢
  // Watcher Moai - moai is watching you 👀
  // Copyrighted Moai - moai marked with copyright ©️
  // Trademark Moai - moai with a trademark symbol ™️
  // Hamsa Moai - moai wearing a protective amulet 🪬
  // Sleepy Moai - moai taking a nap 💤
  // RhythMoai - moai with musical notes 🎵
  // Speech of Moai - moai in a speech bubble 💬
  // Thought of Moai - moai in a thought bubble 💭
  // Canceled Moai - moai with a cross mark ❌
  // Forest Moai - tree on moai 🌳
  // Cactus Moai - cactus on moai 🌵
  // Trashed Moai - moai in a trash can 🗑️
  // Bomber Moai - moai with an explosive bomb 💣
  // Shooter Moai - moai with a gun 🔫
  // Double shooter Moai - moai with two guns 🔫🔫
  // Sword Moai - moai with a sword 🗡️
  // D️ouble Sword Moai - moai with two swords 🗡️🗡️
  // Giant Sword Moai - moai with a huge sword 🗡️
  // Shield Moai - moai with a shield 🛡️
  // Smasher Moai - moai with a hammer 🔨
  // King Moai - moai wearing a crown 👑
  // Star Moai - moai surrounded by sparkles ✨
  // Powerful Moai - moai radiating power 💪
  // Cyclops Moai - moai with an eye on its forehead 👁️
  // Listener Moai - moai listening carefully 👂
  // Puncher Moai - moai throwing a punch 🤜
  // Walker Moai - moai with two legs 🦵
  // Halloween Moai - moai carved like a jack-o'-lantern 🎃
  // Military Moai - moai wearing a military helmet 🪖
  // The 1st Moai - moai with a gold medal 🥇
  // Karate Moai - moai in a martial arts uniform 🥋
  // Aired Moai - moai on a television 📺
  // Moai Notebook - moai on a notebook 📘
  // Directory Moai - moai on a file folder 📁
  // Bed Moai - moai lying in bed 🛏️
  // Atom Moai - moai surrounded by atomic symbols ⚛️
  // IT Moai - moai with a laptop 💻
  // Toilet Moai - a moai in a toilet 🚽
  // Not Moai - this is not a moai 🌚
  // Literal Moai - literally a literal "MOAI"

  // --- 🗿 Dangorous and mysterious moai zone 🗿 ---

  // Moaiception - a moai of moai
  // Fractal Moai - a moai made of smaller moai
  // Moai Universe - a whole universe of moai 🌌
  // Unmoai - a moai that is not a moai now 🪨
  // Anti-Moai - a moai that opposes all moai, with inverted colors
  // Null Moai - a a moai that does not exist, with invisible text and a blank appearance
  // God Moai - a divine moai with godly powers
  // The Unknown Moai - a moai that cannot be comprehended by the human mind
  // The Ultimate Moai - the most powerful moai that transcends all logic and reason
  // The Omnipotent Moai - a moai that can do anything and has unlimited power
  // The paradoxical Moai - a moai that is both itself and not itself at the same time, defying all rules of reality
  // The Eternal Moai - a moai that has existed since the beginning of time and will continue to exist until the end of time
  // The Infinite Moai - a moai that is infinite
  // ThE gLiTcHeD MoAi - a moai that is corrupted by glitches and bugs, with glitched text and a distorted appearance
  // [REDACTED] Moai - a moai that has been removed from existence, with all records of it erased and forgotten 🚫
  // Anonymous - a moai with no name and no identity, represented by a blank silhouette
  // The End - the final moai that appears at the end of the game, with a mysterious presence

} satisfies Record<string, EnemyData>

// EnemyId is automatically derived from the registry keys.
// Adding a new entry here is all that's needed — no manual union to maintain.
export type EnemyId = keyof typeof ENEMY_REGISTRY

