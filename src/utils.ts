export async function waitUntil(conditionFunction: () => boolean, everyMs: number, untilMs: number = 0): Promise<boolean> {
    return await new Promise((resolve, _) => {
        let tries = 0;

        const interval = setInterval(() => {
            tries++;

            if (untilMs > 0 && tries * everyMs >= untilMs) {
                clearInterval(interval);
                resolve(false);
            }

            if (conditionFunction()) {
                resolve(true);
                clearInterval(interval);
            }
        }, everyMs);
    });
}

export function currentTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}