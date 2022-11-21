type LocalStorage = typeof window.localStorage;

enum TOKEN_STORAGE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    GUEST_TOKEN = 'GUEST_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

enum TOKEN_PREFIX {
    VC = 'VC',
    SHOPBY = 'SHOPBY',
}

interface AccessToken {
    accessToken: string;
    refreshToken?: string;
    expiry: number; // unix timestamp
}

abstract class Storage<T extends string> {
    private readonly storage: Nullable<LocalStorage>;
    private readonly prefix: TOKEN_PREFIX;

    private getOriginKey(key: T) {
        return `${this.prefix}_${key}`;
    }

    constructor(
        prefix: TOKEN_PREFIX,
        // getStorage = (): LocalStorage => typeof window.localStorage || null,
    ) {
        this.prefix = prefix;
        this.storage =
            typeof window !== 'undefined' ? window.localStorage : null;
    }

    protected get(key: T): string {
        if (typeof window !== 'undefined') {
            return this.storage?.getItem(this.getOriginKey(key)) || '';
        } else {
            return '';
        }
    }

    protected set(key: T, value: string): void {
        if (typeof window !== 'undefined') {
            this.storage?.setItem(this.getOriginKey(key), value);
        }
    }

    protected clearItem(key: T): void {
        if (typeof window !== 'undefined') {
            this.storage?.removeItem(key);
        }
    }

    protected clearItems(keys: T[]): void {
        keys.forEach((key) => this.clearItem(this.getOriginKey(key) as T));
    }
}

class TokenStorage extends Storage<TOKEN_STORAGE_KEY> {
    getAccessToken(): Nullable<AccessToken> {
        const data = this.get(TOKEN_STORAGE_KEY.ACCESS_TOKEN);

        return data ? JSON.parse(data) : null;
    }

    setAccessToken(accessToken: string) {
        this.set(TOKEN_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    }

    getGuestToken() {
        const data = this.get(TOKEN_STORAGE_KEY.GUEST_TOKEN);

        return data ? JSON.parse(data) : '';
    }

    setGuestToken(guestToken: string) {
        this.set(TOKEN_STORAGE_KEY.GUEST_TOKEN, guestToken);
    }

    getRefreshToken() {
        const data = this.get(TOKEN_STORAGE_KEY.REFRESH_TOKEN);

        return data ? JSON.parse(data) : '';
    }

    setRereshToken(refreshToken: string) {
        this.set(TOKEN_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }

    clear() {
        this.clearItems([TOKEN_STORAGE_KEY.ACCESS_TOKEN]);
    }
}

// // TODO: storage 역할 분리로 인해 제거 제거예정
// const tokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
// const shopbyTokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
// const vcTokenStorage = new TokenStorage(TOKEN_PREFIX.VC);

// export { tokenStorage, shopbyTokenStorage, vcTokenStorage };

// class TokenStorage {
//     private readonly prefix: TOKEN_PREFIX;

//     constructor(prefix: TOKEN_PREFIX) {
//         this.prefix = prefix;
//     }

//     static setItem(key: string, item: string) {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem(key, item);
//         }
//     }

//     static getItem(key: string) {
//         if (typeof window !== 'undefined') {
//             return localStorage.getItem(key);
//         }
//         return null;
//     }

//     static removeItem(key: string) {
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem(key);
//         }
//     }

//     static getAccessToken(): Nullable<AccessToken> {
//         const data = this.get(TOKEN_STORAGE_KEY.ACCESS_TOKEN);

//         return data ? JSON.parse(data) : null;
//     }
// }

const tokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
const shopbyTokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
const vcTokenStorage = new TokenStorage(TOKEN_PREFIX.VC);

export { tokenStorage, shopbyTokenStorage, vcTokenStorage };
