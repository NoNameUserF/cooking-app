const convertSeconds = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hourWord = getCorrectWord(hours, ["час", "часа", "часов"]);
    const minuteWord = getCorrectWord(minutes, ["минута", "минуты", "минут"]);
    const secondWord = getCorrectWord(remainingSeconds, ["секунда", "секунды", "секунд"]);

    let result = "";
    if (hours > 0) {
        result += `${hours} ${hourWord}`;
    }
    if (minutes > 0) {
        if (result) result += " ";
        result += `${minutes} ${minuteWord}`;
    }
    if (remainingSeconds > 0) {
        if (result) result += " ";
        result += `${remainingSeconds} ${secondWord}`;
    }

    return result || "0 секунд";
};

function getCorrectWord(number: number, words: string[]): string {
    if (number % 10 === 1 && number % 100 !== 11) {
        return words[0];
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return words[1];
    } else {
        return words[2];
    }
}

export default convertSeconds;
