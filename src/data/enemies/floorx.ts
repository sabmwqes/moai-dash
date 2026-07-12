import type { EnemyData } from '../../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// Floor X enemies — stage undecided
//
// 登場フロアが未決定の敵をここに定義する。
// 図鑑（Encyclopedia）には表示されるが、バトルのフロアには未配置。
// フロアが決まったら対応する floor*.ts へ移動する。
// ─────────────────────────────────────────────────────────────────────────────

export const FLOORX_ENEMIES = {
  // --- moai plan. do not delete this comment. it is used to generate new moai automatically. ---
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
