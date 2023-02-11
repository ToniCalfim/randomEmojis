"use strict";

/** General Info This file ****************************************************
 *
 * Script File  :
 * File Editor  : File was last edited using: VSCodium
 * Description  :
 * ****************************************************************************
 * Author's Email   : soulidbrasil@gmail.com
 * Author's Email   : 751127@gmail.com
 * ****************************************************************************
 * Created  : Jan, 2023
 * Modified : Jan, 2023
 * Lincence : MIT
 * ****************************************************************************
 * On async function:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Have your own random emoji key:
 * - https://emoji-api.com
 *******************************************************************************
 * History: v1.0.0.1: >
**************************************************************************** */

class RandomizeEmojis {

    /** Definition of attributes */
    #loadedEmojis;

    /** One-only access to DOM */
    #btnEl = document.getElementById("btn");
    #emojiNameEl = document.getElementById("emoji-name");

    constructor() {

        this.#awaitFetchEmojis();

        this.#addButtonEvent();

    }

    /** Getters and setters */

    set displayEmojiChar(emojiCharacter) {

    };

    get displayEmojiChar() {

        return this.#btnEl.innerHTML;

    };

    set displayEmojiName(emojiUnicodeName) {

    };

    get displayEmojiName() {

        return this.#emojiNameEl.innerHTML;

    };

    /** Definition of Methods */

    async #awaitFetchEmojis() {

        this.#loadedEmojis = await this.#fetchEmojis();

    };

    async #fetchEmojis() {

        try {

            const baseURL = "https://emoji-api.com/emojis?access_key=";

            const apiKEY = "eaa8f55c4934127debe00f83fbe5561ab5a6f6ac";

            /** Using template string */
            const fullURL = `${baseURL} ${apiKEY}`;

            this.#emojiNameEl.innerHTML = "Waiting for emojis to fetch...";
            const response = await fetch(fullURL);

            this.#emojiNameEl.innerHTML = "Waiting for emojis to load...";
            const result = await response.json();

            //console.log("Loaded Emojis", result);

            this.#btnEl.innerHTML = "Emoji me now";
            this.#emojiNameEl.innerHTML = "Emoji name";

            return result;

        }

        catch (err) {

            this.#btnEl.innerHTML = "No emojis available";
            this.#emojiNameEl.innerHTML = "Server seems to be down"
            this.#btnEl.setAttribute("disabled", "true");

            console.log("Error:" + err);

        }

    };

    #addButtonEvent() {

        this.#btnEl.addEventListener("click", () => {

            const randomNum = Math.floor(Math.random() * this.#loadedEmojis.length);

            this.#btnEl.innerHTML = this.#loadedEmojis[randomNum].character;
            this.#emojiNameEl.innerHTML = this.#loadedEmojis[randomNum].unicodeName;

            // console.log("Random Number", randomNum);

        });

    };

};