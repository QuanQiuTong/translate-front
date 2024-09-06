import axios, { AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

const req = axios.create({ baseURL: "api", timeout: 60000 });

req.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

const parse = (res: AxiosResponse) => {
  // console.log("response data:\n", res.data.data);
  const lines = res.data.data.split("\n");
  if (lines.length <= 1) {
    ElMessage.warning("GPT response is empty");
    return { empty: true };
  }
  const str = lines.slice(0, -1).join("").replace(/my\$/g, "");
  console.log("to parse:\n", str);
  return str ? JSON.parse(str) : { empty: true };
};

/**
 * res.data.data =
 * "
 *  {
 *    content: "How are you? It's great that we have a vacation in fourteen days. So exciting!",
 *    title: "Excitement for an upcoming vacation",
 *    preText: "The speaker is looking forward to a break in fourteen days and expresses excitement about it."
 *  }
 *  (from GPT API)error in parsing gpt response
 * "
 */

export const translate = async (
  content: string,
  toolId: number = 0,
  preText: string = ""
) => {
  const res = await req.post("/trans/submitPassage", {
    sessionId: parseInt(localStorage.sessionID),
    toolId,
    content,
    preText,
  });
  return toolId === 0 ? parse(res) : res.data.data;
};

/* const CHUNK_SIZE = 2000;

const longTranslate = async (content: string, toolId: number = 0) => {
  let start = 0;
  let end = CHUNK_SIZE;
  let preText = "";

  while (start < content.length) {
    const chunk = content.slice(start, end);
    const res = await translate(chunk, toolId, preText);

    if (res && res.data && res.data.data) {
      preText = res.data.data.preText;
    }

    start += CHUNK_SIZE;
    end += CHUNK_SIZE;
  }
};
 */
export const modify = async (
  original: string,
  outcome: string,
  changed: string
) => {
  console.log("modify:\n", original, "\n", changed);
  const res = await req.post("trans/changePassage", {
    sessionId: parseInt(localStorage.sessionID),
    source_content: original,
    target_content: outcome,
    target_modified: changed,
  });
  return parse(res).learned_prompt;
};

export const queryDicts = async (word, language = "en", use_gpt = false) => {
  if (!word) return "";
  const res = await req.post("/dict/query", { word, language, use_gpt });
  console.log("queryDicts:\n", res.data.data);
  return JSON.parse(res.data.data);
};

export const queryDict = async (word: string, lang = "en") => {
  let arr = await queryDicts(word, lang, false);
  console.log(arr);
  console.log("is?:\n", arr instanceof Array);
  try {
    if (!(arr instanceof Array)) arr = await queryDicts(word, lang, true);
    console.log("gpt:\n", arr);
    console.log(arr[0]);
    return arr[0];
  } catch (e) {
    return null;
  }
};

const data = {
  word: "cat",
  phonetic: "/kat/",
  phonetics: [
    {
      text: "/kat/",
      audio: "https://api.dictionaryapi.dev/media/pronunciations/en/cat-uk.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014180",
      license: {
        name: "BY 3.0 US",
        url: "https://creativecommons.org/licenses/by/3.0/us",
      },
    },
    {
      text: "/kæt/",
      audio: "https://api.dictionaryapi.dev/media/pronunciations/en/cat-us.mp3",
      sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=187316",
      license: {
        name: "BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
    },
  ],
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition: "An animal of the family Felidae:",
          synonyms: ["felid"],
          antonyms: [],
        },
        {
          definition: "A person:",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A strong tackle used to hoist an anchor to the cathead of a ship.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "Short form of cat-o'-nine-tails.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            'A sturdy merchant sailing vessel (now only in "catboat").',
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            'The game of "trap and ball" (also called "cat and dog").',
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "The pointed piece of wood that is struck in the game of tipcat.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "A vagina, a vulva; the female external genitalia.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A double tripod (for holding a plate, etc.) with six feet, of which three rest on the ground, in whatever position it is placed.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition:
            "A wheeled shelter, used in the Middle Ages as a siege weapon to allow assailants to approach enemy defences.",
          synonyms: ["Welsh cat", "tortoise"],
          antonyms: [],
        },
      ],
      synonyms: [
        "saber-tooth",
        "saber-toothed cat",
        "feline",
        "feline cat",
        "pantherine",
        "pantherine cat",
        "Caniformia",
        "carnivoran",
        "cat-like",
        "feliform",
        "feloid",
        "jaguar",
        "leopard",
        "lion",
        "panther",
        "tiger",
        "Welsh cat",
        "tortoise",
        "felid",
      ],
      antonyms: [],
    },
    {
      partOfSpeech: "verb",
      definitions: [
        {
          definition:
            "To hoist (the anchor) by its ring so that it hangs at the cathead.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "To flog with a cat-o'-nine-tails.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "To vomit.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "To go wandering at night.",
          synonyms: [],
          antonyms: [],
        },
        {
          definition: "To gossip in a catty manner.",
          synonyms: [],
          antonyms: [],
        },
      ],
      synonyms: [],
      antonyms: [],
    },
  ],
  license: {
    name: "CC BY-SA 3.0",
    url: "https://creativecommons.org/licenses/by-sa/3.0",
  },
  sourceUrls: ["https://en.wiktionary.org/wiki/cat"],
};
