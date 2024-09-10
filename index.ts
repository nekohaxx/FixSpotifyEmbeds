/**
 * Copyright (c) 2024 nekohaxx. All rights reserved.
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

const SPOTIFY_REGEX = /https:\/\/open\.spotify\.com\/[^ ?]+/;

export default definePlugin({
    name: "ActuallyFixSpotifyEmbeds",
    description: "Fixes Spotify embeds",
    authors: [Devs.nekohaxx],
    start() {
        Vencord.Webpack.Common.FluxDispatcher._interceptors.push(event => {
            if (event.type != "MESSAGE_CREATE") return;	
            if (event.message.content.match(SPOTIFY_REGEX)) {
                event.message.embeds = event.message.embeds ?? [];
                const url = event.message.content.match(SPOTIFY_REGEX)[0];
                event.message.embeds.push({
                    "type": "link",
                    "url": url,
                    "provider": {
                        "name": "Spotify",
                        "url": "https://spotify.com/"
                    },
                });
            }
        })
    }
});
