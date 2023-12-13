import { useState } from "react"
import { createRoot } from "react-dom/client"
import shuffle from "lodash/shuffle"

import "./index.css"

import introImage from "./assets/intro.jpg"
import christmasTreeImage from "./assets/christmas-tree.png"

const allCharacters = [
  {
    name: "Santa Clause",
    img: require("./assets/characters/santa.jpg"),
    truths: [
      "Santa Claus is often depicted as living at the North Pole.",
      "He is traditionally known to deliver gifts to children around the world on Christmas Eve.",
      "Santa's sleigh is famously pulled by reindeer, including one named Rudolph who has a red, glowing nose.",
      "In many cultures, children leave out milk and cookies for Santa Claus on Christmas Eve.",
      "Santa Claus is commonly portrayed as a jolly, rotund man with a white beard and red suit.",
    ],
    lies: [
      "Santa Claus traditionally travels by airplane rather than a sleigh.",
      "He is well-known for delivering gifts only to children in the Southern Hemisphere.",
      "Santa’s outfit is traditionally green and yellow, not red.",
      "Santa Claus lives in a high-tech apartment in New York City.",
      "He has a pet dragon named Sparkles that helps him make toys. ",
    ],
  },
  {
    name: "Mrs Clause",
    img: require("./assets/characters/mrs-clause.jpg"),
    truths: [
      "Mrs. Claus is typically portrayed as a kind and caring figure, often assisting Santa Claus in his Christmas preparations.",
      "She is commonly depicted as an elderly woman with white hair, wearing a dress that often matches Santa's suit in style and color.",
      "In many stories, Mrs. Claus is known for her excellent baking skills, especially when it comes to making cookies and other sweet treats.",
      "She is often shown as managing the elves and taking care of the reindeer in various Christmas tales.",
      "Mrs. Claus sometimes responds to children's letters addressed to Santa, offering encouragement and holiday cheer.",
    ],
    lies: [
      "Mrs. Claus was once a champion ice skater and still competes in international skating competitions every year.",
      "She invented a time machine, which she uses to help Santa deliver all the gifts in one night.",
      "Mrs. Claus is known for her magical ability to control the weather, ensuring a white Christmas every year, no matter the location.",
      "In some stories, it's said that Mrs. Claus is actually an accomplished astronaut and regularly takes trips to Mars.",
      "She hosts a popular cooking show in the North Pole, where she teaches elves and reindeer gourmet cooking.",
      "Mrs. Claus is an expert in robotics and has built a team of robot elves to help with the increasing demand for toys.",
    ],
  },
  {
    name: "Anna",
    img: require("./assets/characters/anna.jpg"),
    truths: [
      "Anna is a princess of the fictional kingdom of Arendelle.",
      "She has a sister named Elsa, who has ice powers and becomes the Snow Queen.",
      "Anna is known for her optimistic, energetic, and fearless personality.",
      "She embarks on a perilous journey to save her kingdom from an eternal winter caused by her sister’s powers.",
      "Anna falls in love with Kristoff, a rugged ice harvester, during her adventure.",
    ],
    lies: [
      "Anna is secretly a world-class sushi chef and often prepares elaborate meals for the citizens of Arendelle using her expert ice-fishing skills.",
      "She holds the record for the longest snowball fight in Arendelle, which lasted a full week and involved the entire kingdom.",
      "Anna has a hidden talent as a stand-up comedian, and she regularly performs at Olaf's comedy club in the castle's basement.",
      "In her spare time, Anna is an avid inventor and has created a line of snow-proof beachwear for the citizens of Arendelle.",
      "She discovered a secret underground network of tunnels beneath Arendelle, which she uses for rollerblading races with the trolls.",
    ]
  },
  {
    name: "Elsa",
    img: require("./assets/characters/elsa.jpg"),
    truths: [
      "Elsa possesses magical ice powers, which allow her to create and control ice and snow.",
      "She becomes the Queen of Arendelle at the beginning of the first \"Frozen\" movie.",
      "Elsa is known for her signature song, \"Let It Go\", which she sings when she decides to embrace her ice powers.",
      "She has a younger sister named Anna, with whom she shares a deep bond.",
      "In \"Frozen II\", Elsa discovers the truth about her powers and finds a deeper connection to nature and the elements.",
    ],
    lies: [
      "Elsa secretly dreams of becoming a professional ice sculptor and opening an ice art gallery in Arendelle.",
      "She has a hidden talent as an ice-cream chef, inventing new flavors like \"Northern Lights Neapolitan\" and \"Glacier Mint Chip.\"",
      "Elsa once entered a snowman-building competition and accidentally brought all her snowmen to life, causing a comical chaos in Arendelle.",
      "In her spare time, Elsa is a cold weather fashion designer, creating a line of clothing that is both stylish and warm enough for eternal winters.",
      "Elsa is an avid snowboarder and has built an elaborate snow park in the mountains, where she practices extreme winter sports.",
    ],
  },
  {
    name: "Olaf",
    img: require("./assets/characters/olaf.jpg"),
    truths: [
      "Olaf is a friendly snowman brought to life by Elsa's magical powers.",
      "He loves warm hugs and dreams about experiencing summer.",
      "Olaf is known for his innocent, childlike personality and often provides comic relief in the movies.",
      "He has a carrot for a nose, which becomes a humorous plot point in both films.",
      "Olaf is disassembled and reassembled multiple times throughout the \"Frozen\" movies, yet always remains cheerful and optimistic.",
    ],
    lies: [
      "Olaf is the secret ruler of Arendelle and takes over the kingdom when Elsa and Anna are away.",
      "He has a magical ability to turn into liquid water and then reform himself at will.",
      "Olaf is an expert ice skater and often competes in the Arendelle Winter Olympics.",
      "He has a twin brother named \"Melty\", who is made of sand and lives on a tropical beach.",
      "Olaf has a secret underground lair where he plans to build an army of snowmen to take over the world.",
    ],
  },
  {
    name: "Kristoff",
    img: require("./assets/characters/kristoff.jpg"),
    truths: [
      "Kristoff is an ice harvester by trade and is quite skilled in navigating the snowy landscapes.",
      "He has a loyal reindeer companion named Sven, whom he treats as his best friend.",
      "Kristoff is initially a bit of a loner, but he forms a close bond with Anna during their adventures.",
      "He is known for his rugged appearance and practical, down-to-earth personality.",
      "In \"Frozen II\", Kristoff plans to propose to Anna and struggles to find the perfect moment to do so.",
    ],
    lies: [
      "Kristoff is a secret snowboard champion, known in the underground circuits as \"The Iceman.\"",
      "He has an extensive collection of snow globes from every part of the world, even though he's never left Arendelle.",
      "Kristoff is an aspiring singer and has recorded a duet album with Sven, titled \"Reindeer Tunes.\"",
      "He has invented a new sport called \"ice harvesting hockey\", where players use ice blocks instead of pucks.",
      "Kristoff is a gourmet chef in his spare time, famous for his reindeer-shaped cookies and \"Northern Lights\" flavored ice cream.",
    ],
  },
  {
    name: "The Grinch",
    img: require("./assets/characters/grinch.jpg"),
    truths: [
      "The Grinch is known for his grumpy and solitary nature, living alone in a cave on Mount Crumpit.",
      "He despises Christmas and the cheerful celebrations of the Whos in Whoville.",
      "His only companion is his loyal dog, Max, who assists him in his schemes.",
      "The Grinch attempts to steal Christmas from the Whos by taking away their decorations, gifts, and feast.",
      "Despite his initial dislike for Christmas, the Grinch experiences a change of heart and eventually embraces the holiday spirit.",
    ],
    lies: [
      "The Grinch is a secret holiday decorator and has a hidden talent for creating extravagant Christmas light displays.",
      "He's an accomplished chef and is famous in Whoville for his \"Roast Beast\" recipe, a dish he only prepares once a year.",
      "The Grinch is an undercover pop star in Whoville, known for his hit single \"Green With Envy.\"",
      "He holds the world record for the largest collection of ugly Christmas sweaters, which he wears throughout the year.",
      "The Grinch is an avid gardener and has a secret garden filled with rare, colorful plants that spell \"Merry Grinchmas\" when viewed from above.",
    ]
  },
  {
    name: "Jack Frost",
    img: require("./assets/characters/jack-frost.jpg"),
    truths: [
      "Jack Frost is often depicted as a sprite-like character who personifies crisp, cold, winter weather.",
      "He is traditionally shown as a young man with icy powers, capable of creating frost and snow.",
      "Jack Frost is known for nipping at noses and toes, creating frost patterns on windows, and dusting the environment with snow.",
      "In various stories and depictions, he is often portrayed as mischievous and playful.",
      "Jack Frost appears in numerous cultural narratives and has been a character in books, movies, and folklore for many years.",
    ],
    lies: [
      "Jack Frost is the mayor of a small town in the Arctic Circle, known for its year-round snow and ice festivals.",
      "He invented skiing and holds the world record for the longest ski jump.",
      "Jack Frost has a pet polar bear named Frosty, which helps him paint the leaves with frost patterns.",
      "He is a famous ice cream chef, known for creating the coldest ice cream in the world, which can only be eaten wearing special gloves.",
      "Jack Frost is a renowned ice architect, famous for building ice palaces and castles that never melt, even in summer.",
    ]
  },
  {
    name: "Rudolph the reindeer",
    img: require("./assets/characters/rudolph.jpg"),
    truths: [
      "Rudolph is known for his glowing red nose, which lights up.",
      "He is a character in a story and song that describes him leading Santa Claus's sleigh on a foggy Christmas Eve.",
      "Rudolph was initially created by Robert L. May for Montgomery Ward department store's Christmas promotion in 1939.",
      "The story of Rudolph has been adapted into various forms, including a popular song and an animated TV special.",
      "In the narrative, Rudolph is initially ostracized because of his bright red nose but eventually becomes a hero.",
    ],
    lies: [
      "Rudolph has a secret twin brother named Randall, who has a glowing blue nose.",
      "Rudolph originally wanted to be a dentist before deciding to lead Santa’s sleigh.",
      "He has a hidden talent for ballet dancing and often performs in the North Pole's annual Nutcracker performance.",
      "Rudolph runs a school for aspiring young reindeer who want to learn how to fly and join Santa's team.",
      "Rudolph's red nose also functions as a Wi-Fi hotspot, providing internet access to Santa Claus on his global journey.",
    ],
  },
  {
    name: "Ebenzer Scrooge",
    img: require("./assets/characters/scrooge.jpg"),
    truths: [
      "Ebenezer Scrooge is depicted as a miserly and cold-hearted old man at the beginning of the story.",
      "He is visited by the ghost of his former business partner, Jacob Marley, and the Ghosts of Christmas Past, Present, and Yet to Come.",
      "Scrooge's transformation into a kinder, more generous person is the central theme of \"A Christmas Carol.\"",
      "He initially despises Christmas and everything associated with it, uttering the famous line, \"Bah! Humbug!\"",
      "The character of Scrooge has become synonymous with someone who is stingy or lacks Christmas spirit.",
    ],
    lies: [
      "Scrooge is a secret rock star in the North Pole, known for his annual Christmas Eve concerts.",
      "He invented a time machine, which he uses to travel to different Christmases throughout history.",
      "Scrooge has a pet reindeer named Marley, who helps him learn the true meaning of Christmas.",
      "He is an accomplished pastry chef and wins a baking contest in London with his \"Humbug Cupcakes.\"",
      "Scrooge opens a theme park after his transformation, called \"Scrooge World\", celebrating Christmas all year round.",
    ],
  },
  {
    name: "Jack Skellington",
    img: require("./assets/characters/jack-skellington.jpg"),
    truths: [
      "Jack Skellington is known as the \"Pumpkin King\" of Halloween Town.",
      "He becomes fascinated with Christmas and attempts to bring Christmas to Halloween Town.",
      "Jack is depicted as a tall, skeletal figure dressed in a pinstripe suit.",
      "Despite his initial enthusiasm for Christmas, Jack's lack of understanding about the holiday leads to chaos.",
      "Sally, a ragdoll created by Dr. Finkelstein, is his love interest in the story.",
    ],
    lies: [
      "Jack Skellington is a world-renowned pumpkin pie chef, winning the Halloween Town baking contest every year.",
      "He has a secret career as a pop singer, famous for his Halloween-themed Christmas carols.",
      "Jack invents a new holiday called \"Christmasween\", which becomes more popular than both Christmas and Halloween.",
      "He has a magical pet cat named \"Bones\", who helps him plan Halloween every year.",
      "Jack Skellington is an avid surfer and hosts an annual surfing competition in Halloween Town's \"Monster Wave\" event.",
    ],
  },
  {
    name: "Easter Bunny",
    img: require("./assets/characters/easter-bunny.jpg"),
    truths: [
      "The Easter Bunny is traditionally depicted as a rabbit that delivers Easter eggs to children.",
      "This character is a symbol of fertility and new life, aligning with the themes of spring and Easter.",
      "The Easter Bunny's origins can be traced back to folkloric and religious traditions in parts of Europe.",
      "Typically, the Easter Bunny is said to leave a basket filled with colored eggs, candy, and sometimes toys for children.",
      "The tradition of the Easter Bunny is particularly popular in the United States, Canada, and other Western countries, often associated with Easter egg hunts and Easter parades.",
    ],
    lies: [
      "The Easter Bunny lives on the moon during the off-season and only comes to Earth for Easter.",
      "He has a side job as a professional basketball player, known for his incredible jumping ability.",
      "The Easter Bunny is the CEO of a major chocolate factory, where all the Easter candies are produced.",
      "He has a magical ability to change colors like a chameleon, blending into any environment while delivering Easter eggs.",
      "The Easter Bunny is a renowned DJ, famous for hosting the biggest spring break parties on tropical islands.",
    ]
  },
  {
    name: "Sandman",
    img: require("./assets/characters/sandman.jpg"),
    truths: [
      "In \"Rise of the Guardians\", the Sandman, also known as Sandy, communicates through sand images that he forms above his head, as he does not speak.",
      "Sandy is the Guardian of Dreams and is responsible for bringing pleasant dreams to children.",
      "He is depicted as a small, golden figure who can manipulate sand to create dream imagery and for various other purposes.",
      "The Sandman is portrayed as a gentle and benevolent character, deeply caring about the well-being of children.",
      "In the movie, Sandy uses his dream sand to fight against the Nightmare King, Pitch Black, to protect the children's dreams.",
    ],
    lies: [
      "Sandy runs a magical sleep clinic in \"Rise of the Guardians\", where he teaches other mythical creatures the art of dream crafting.",
      "He has a secret hobby as a sandcastle architect and holds the world record for the largest sandcastle ever built.",
      "The Sandman is an accomplished musician in the movie, playing a lullaby on his dream flute to put entire cities to sleep.",
      "He invented a special type of coffee in the film that allows people to enter each other's dreams.",
      "Sandy is revealed to be the ultimate champion of intergalactic sandboarding competitions in \"Rise of the Guardians\.",
    ],
  },
  {
    name: "Tigger",
    img: require("./assets/characters/tigger.jpg"),
    truths: [
      "Tigger is known for his distinctive orange and black stripes and a springy tail.",
      "He is extremely energetic and is always seen bouncing around, often chanting his signature phrase, \"The wonderful thing about Tiggers, is Tiggers are wonderful things!\"",
      "Tigger is a fictional tiger character who is confident and has a very cheerful disposition.",
      "He first appeared in A.A. Milne's book \"The House at Pooh Corner\", which is part of the Winnie the Pooh series.",
      "Tigger considers himself to be the only one of his kind, often referring to himself as \"the only Tigger\".",
    ],
    lies: [
      "Tigger has a secret underground lair where he stores an enormous collection of rubber balls.",
      "Tigger once attempted to set a world record for the highest bounce but accidentally ended up in outer space, becoming the first tiger on the moon.",
      "He runs a Tigger-themed amusement park in the Hundred Acre Wood, complete with a \"Bounce Mountain\" roller coaster.",
      "Tigger has a side job as a motivational speaker, teaching others the art of bouncing their way to success.",
      "He tried to open a Tigger-themed restaurant but had to close it down when all the tables and chairs bounced away. ",
    ],
  },
  {
    name: "Piglet",
    img: require("./assets/characters/piglet.jpg"),
    truths: [
      "Piglet is a small, timid, pink pig character in the Winnie the Pooh stories.",
      "He is known for his soft-spoken, anxious, and often nervous personality.",
      "Piglet is best friends with Winnie the Pooh and is a loyal companion in their adventures.",
      "Despite his small size and fears, Piglet often shows bravery in times of need.",
      "He first appeared in A.A. Milne's book \"Winnie-the-Pooh\", which was published in 1926.",
    ],
    lies: [
      "Piglet is a secret agent who goes on undercover missions in the Hundred Acre Wood.",
      "He is an inventor and created the first-ever honeycomb-shaped umbrella specifically for Pooh's honey pots.",
      "He has a magical map that changes daily, leading him to new, undiscovered areas of the Hundred Acre Wood.",
      "Piglet is an expert in bird language and serves as a translator for the other animals during the annual Bird Chorus.",
      "He has a hobby of collecting clouds in various shapes and has an album filled with cloud photographs taken during his balloon rides. ",
    ]
  },
]

const maxCharacters = 10

type Option = {
  value: string,
  isTrue: boolean,
}

const getCharacters = () => {
  return shuffle(allCharacters).map(character => {
    const name = character.name
    const img = character.img
    const trueOptions:Option[] = shuffle(character.truths).slice(0, 2).map(truth => ({
      value: truth,
      isTrue: true,
    }))
    const falseOptions:Option[] = shuffle(character.lies).slice(0, 1).map(lie => ({
      value: lie,
      isTrue: false,
    }))
    const options = shuffle([
      ...trueOptions,
      ...falseOptions,
    ])

    return {
      name,
      img,
      options,
    }
  }).slice(0, maxCharacters)
}

const enum screenTypes {
  start = "start",
  game = "game",
  results = "results",
}

const LightBulb = (
  { on, x, y, rotation, color: colorProp } : 
  { on:boolean, x: number, y: number, rotation: number, color: string}
) => {
  const color = on ? colorProp : "#444444"

  return (
    <div 
      className="w-[30px] absolute z-30"
      style={{
        top: `${y}%`,
        left: `${x}%`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {on && (
        <div
          className="rounded-full w-[10px] absolute left-1/2 bottom-2 -translate-x-1/2 aspect-square bg-transparent opacity-75"
          style={{ boxShadow: `0px 0px 30px 15px ${color}` }}
        ></div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        version="1.1"
        viewBox="0 0 744.094 744.094"
        className="rotate-180"
      >
        <g
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="1"
          transform="translate(0 -308.268)"
        >
          <rect
            width="241.952"
            height="120.976"
            x="216.116"
            y="781.485"
            fill="#c1c1c1"
            opacity="1"
            ry="60.488"
            transform="rotate(-3.032)"
          ></rect>
          <circle
            cx="337.093"
            cy="604.09"
            r="234.936"
            fill={color}
            opacity="1"
            transform="rotate(-3.032)"
          ></circle>
          <path
            fill="#fff"
            d="M281.906 470.743c-39.136 36.344-10.628 130.744-48.545 93.13-37.917-37.613-38.164-98.843-.551-136.76 37.613-37.918 119.389-51.056 136.76-.55 20.492 59.575-59.056 17.612-87.664 44.18z"
            opacity="1"
          ></path>
          <rect
            width="241.952"
            height="120.976"
            x="212.817"
            y="843.778"
            fill="#c1c1c1"
            opacity="1"
            ry="60.488"
            transform="rotate(-3.032)"
          ></rect>
          <rect
            width="241.952"
            height="120.976"
            x="210.124"
            y="894.63"
            fill="#c1c1c1"
            opacity="1"
            ry="60.488"
            transform="rotate(-3.032)"
          ></rect>
          <rect
            width="208.758"
            height="9.206"
            x="-365.852"
            y="1065.551"
            fill="#797979"
            opacity="1"
            ry="4.603"
            transform="matrix(1 -.00374 .6005 .79963 0 0)"
          ></rect>
          <rect
            width="208.758"
            height="9.206"
            x="-412.567"
            y="1143.345"
            fill="#797979"
            opacity="1"
            ry="4.603"
            transform="matrix(1 -.00374 .6005 .79963 0 0)"
          ></rect>
        </g>
      </svg>
    </div>
  )
}

const App = () => {
  const [screen, setScreen] = useState(screenTypes.start)
  const [characters, setCharacters] = useState(getCharacters())
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0)
  const [points, setPoints] = useState(0)

  const character = characters[activeCharacterIndex]

  const startGame = () => {
    setScreen(screenTypes.game)
  }

  const restart = () => {
    setScreen(screenTypes.game)
    setPoints(0)
    setCharacters(getCharacters())
    setActiveCharacterIndex(0)
  }

  const chooseAnswer = (option:Option) => {
    if (!option.isTrue) {
      setPoints(points + 1)
    }

    const newCharacterIndex = activeCharacterIndex + 1
    if (newCharacterIndex < maxCharacters) {
      setActiveCharacterIndex(newCharacterIndex)
    } else {
      setScreen(screenTypes.results)
    }
  }

  return (
    <div>
      {screen === screenTypes.start && (
        <div className="h-screen bg-[length:227%] lg:bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${introImage})` }}>
          <button type="button" onClick={() => startGame()} className="absolute inset-0"></button>
        </div>
      )}
      {screen === screenTypes.game && (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="mt-6 flex flex-col items-center justify-center">
            <img src={character.img} className="w-[200px] rounded-full border border-gray-400"/>
            <p className="mt-3 font-heading text-32 font-bold text-[#ffffdf]">{character.name}</p>
          </div>
          <div className="mt-4">
            {character.options.map(option => (
              <div className="px-4 text-center text-[#ffffdf]">
                <button type="button" onClick={() => chooseAnswer(option)} className="mt-3 px-4 py-2 w-full max-w-[900px] border border-[#147e61] lg:text-20 bg-[#147e61] rounded-lg">
                  <p>{option.value}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {screen === screenTypes.results && (
        <div className="h-screen flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <div className="mx-auto aspect-square w-full max-w-[350px] relative inline-block">
              {(points === 10) && (
                <div 
                  className="w-1 h-1 absolute z-10 bg-transparent"
                  style={{
                    boxShadow: "1px 1px 25px 28px gold",
                    top: "17%",
                    left: "48%",
                  }}
                ></div>
              )}
              <img src={christmasTreeImage} className="relative z-20" />
              {[
                { x: 26, y: 71, rotation: 0, color: "red" },
                { x: 40, y: 70, rotation: 0, color: "orange" },
                { x: 55, y: 66.5, rotation: 0, color: "lightblue" },
                { x: 65, y: 62.5, rotation: 0, color: "gold" },

                { x: 60, y: 53.5, rotation: 0, color: "lightblue" },
                { x: 47, y: 52, rotation: 0, color: "orange" },
                { x: 33, y: 48, rotation: 0, color: "red" },

                { x: 40, y: 38, rotation: 0, color: "orange" },
                { x: 50, y: 35.5, rotation: 0, color: "red" },
              ].map((bulb, index) => {
                const on = points > index

                return (
                  <LightBulb on={on} x={bulb.x} y={bulb.y} rotation={bulb.rotation} color={bulb.color} />
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button type="button" onClick={() => restart()} className="mt-3 px-4 py-2 w-full max-w-[900px] border border-[#147e61] text-[#ffffdf] lg:text-20 bg-[#147e61] rounded-lg">
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById("app")).render(<App />)