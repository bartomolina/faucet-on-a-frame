# Faucet in a Frame

ETH Sepolia / Base Sepolia Faucet
Users can claim 0.1 Sepolia ETH / 24 hours 

CREATE OR REPLACE FUNCTION get_random_sponsor(OUT fid int8, OUT adcredits int8, OUT totalvisualizations int8)
AS $$
BEGIN
  SELECT id, credits, visualizations INTO fid, adcredits, totalvisualizations FROM "Users"
  WHERE credits > 0
  ORDER BY RANDOM()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
