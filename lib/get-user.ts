import { fetchQuery, init } from "@airstack/node";

import { env } from "@/env.mjs";

export const getUser = async (fid: number) => {
  init(env.AIRSTACK_API_KEY);
  const query = `
    query fetchUser {
      Socials(
        input: {
          filter: { dappName: { _eq: farcaster }, identity: { _eq: "fc_fid:${fid}" } }
          blockchain: ethereum
        }
      ) {
        Social {
          profileDisplayName
          profileName
        }
      }
    }
  `;

  const { data } = await fetchQuery(query);

  return data;
};
