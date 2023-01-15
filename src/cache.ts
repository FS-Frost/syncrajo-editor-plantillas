import { currentTimestampInSeconds } from "./utils";

export default class Cache {
    static newKey(...params: string[]): string {
        let key = "";

        for (let i = 0; i < params.length; i++) {
            const p = params[i];
            key = key == "" ? p : `${key}-${p}`;
        }

        return key;
    }

    static set(key: string, value: string, secondsToExpire?: number): void {
        const timedValue = {
            expiresAt: currentTimestampInSeconds() + (secondsToExpire ?? 60 * 30),
            data: value
        };

        localStorage.setItem(key, JSON.stringify(timedValue));
    }

    static get(key: string): string | null {
        let timedValue = null;

        try {
            const rawData = localStorage.getItem(key) ?? "";
            timedValue = JSON.parse(rawData);
        } catch (error) {
            console.error(`ERROR: get cache '${key}'`, error);
        }

        if (timedValue == null) {
            return null;
        }

        if (!Number.isInteger(timedValue?.expiresAt)) {
            return null;
        }

        if (timedValue?.expiresAt <= currentTimestampInSeconds()) {
            console.info(`Cache '${key}' expired`);
            return null;
        }

        return timedValue?.data;
    }

    static setJson(key: string, value: any, secondsToExpire?: number): void {
        this.set(key, JSON.stringify(value), secondsToExpire);
    }

    static getJson<T>(key: string): T | null {
        let data = null;

        try {
            const rawData = this.get(key);

            if (rawData == null) {
                return null;
            }

            data = JSON.parse(rawData);
        } catch (error) {
            console.error(`ERROR: get cache '${key}'`, error);
        }

        return data;
    }

    static getArray<T>(key: string): T[] | null {
        let data = this.getJson(key);

        if (!Array.isArray(data)) {
            return null;
        }

        return data;
    }

    static clear(): void {
        localStorage.clear();
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }
}
