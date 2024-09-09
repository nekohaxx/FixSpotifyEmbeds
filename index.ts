/**
 * Copyright (c) 2024 nekohaxx. All rights reserved.
 */

import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "FixSpotifyEmbeds",
    description: "Fixes Spotify embeds",
    authors: [Devs.nekohaxx],
    flux: {
        "MESSAGE_CREATE": (event: any) => {
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
        }
    }
});
