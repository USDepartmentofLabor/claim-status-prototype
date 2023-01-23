import { useEffect, useState } from "react";

import { ClaimData } from "../types";

/**
 * Fetch claim data from a mock API. For demo purposes, this
 * accepts a scenario param, but in a real app you'd likely pass
 * in the claim ID or other identifier.
 */
const useClaimData = (demoScenario: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClaimData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      // Support deployment to a subdirectory, like GitHub Pages.
      const basePath = process.env.BASE_PATH ?? "";

      try {
        // For demo purposes, we're simulating a JSON API call here by loading a static JSON file
        // which contains a mock response body for each demo scenario
        const cacheBuster = new Date().getTime(); // prevent caching of the static mock data so we can change it without troubles
        const resp = await fetch(
          `${basePath}/mock-api/${demoScenario}.json?${cacheBuster}`
        );
        const data = (await resp.json()) as ClaimData;
        setData(data);
        setLoading(false);
      } catch (err) {
        let errorMessage;
        if (err instanceof Error) {
          errorMessage = err.message;
        } else {
          errorMessage = String(err);
        }
        setError(errorMessage);
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, [demoScenario]);

  return { loading, data, error };
};

export default useClaimData;
