export const formatNumberedText = (text) => {
if(typeof text === "string"){
    // split text by newline character
    const lines = text?.split("\n");
  
    // loop through each line of text
    for (let i = 0; i < lines.length; i++) {
      // if line starts with a number followed by a period and a space
      if (/^\d+\.\s/.test(lines[i])) {
        // add a newline character before the line
        lines[i] = "\n" + lines[i];
      } else {
        return text;
      }
    }
  
    // join the lines back together and return the formatted text
    return lines.join("\n");
}
};

export const formatNumber = (value) => {
  if (value < 1000) {
    return value;
  } else if (value >= 1000 && value < 1000000) {
    const formattedValue = value / 1000;
    return formattedValue % 1 === 0 ? formattedValue.toFixed(0) + 'k' : formattedValue.toFixed(1) + 'k';
  } else if (value >= 1000000) {
    const formattedValue = value / 1000000;
    return formattedValue % 1 === 0 ? formattedValue.toFixed(0) + 'Cr' : formattedValue.toFixed(1) + 'Cr';
  }
};