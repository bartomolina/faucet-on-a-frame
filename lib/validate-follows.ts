import { fetchQuery, init } from "@airstack/node";

import { env } from "@/env.mjs";

export const validateFollows = async (fid: number) => {
  init(env.AIRSTACK_API_KEY);
  const query = `
    query isFollowing {
      Wallet(input: {identity: "fc_fid:${fid}", blockchain: ethereum}) {
        socialFollowers(
          input: {filter: {identity: {_in: ["fc_fid:218166", "fc_fid:12142"]}, dappName: {_eq: farcaster}}}
        ) {
          Follower {
            followingProfileId
          }
        }
      }
    }
  `;

  const { data } = await fetchQuery(query);

  if (
    data.Wallet.socialFollowers.Follower &&
    data.Wallet.socialFollowers.Follower.length == 2
  ) {
    return true;
  }
  return false;
};
