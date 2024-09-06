export const getKeyByValue = (obj, value) => {
  const entry = Object.entries(obj).find(([key, val]) => val === value);
  return entry && entry[0];
}

export const selText = (textarea) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  console.log(textarea.value.substring(start, end));
  return textarea.value.substring(start, end);
};

export const calcPos = (textarea) => {
  const textBeforeSelection = textarea.value.substring(
    0,
    textarea.selectionStart
  );

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.whiteSpace = "pre-wrap";
  div.style.visibility = "hidden";
  div.style.font = getComputedStyle(textarea).font;
  div.style.left = `${textarea.offsetLeft}px`;
  div.style.top = `${textarea.offsetTop}px`;
  div.style.width = `${textarea.offsetWidth}px`;
  div.style.height = `${textarea.offsetHeight}px`;
  div.textContent = textBeforeSelection;

  document.body.appendChild(div);

  const span = document.createElement("span");
  span.textContent = selText(textarea);
  div.appendChild(span);

  const rect = span.getBoundingClientRect();
  document.body.removeChild(div);

  return {
    top: rect.top + window.scrollY + rect.height + 10,
    left: rect.left + window.scrollX,
  };
};

export const brief = (dictEntry) => {
  const word = dictEntry.word;
  const phonetic = dictEntry.phonetic;
  const definition = dictEntry.meanings[0].definitions[0].definition;
  return `${word} (${phonetic}): ${definition}`;
};
export const synonym = (dictEntry) => {
    const result = { noun: [], verb: [] };
    dictEntry.meanings.forEach((item) => {
      if (item.partOfSpeech === "noun") {
        result.noun = item.synonyms;
      } else if (item.partOfSpeech === "verb") {
        result.verb= item.synonyms;
      }
    });
    return result;
};
