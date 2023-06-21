import { useState, useEffect } from 'react';
/**
 * This utility function simulates loading, since Api connections are not implemented yet
 */
const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  return {loading};
};

export default useLoading;
