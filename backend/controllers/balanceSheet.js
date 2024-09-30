const axios = require("axios");

exports.getBalanceSheet = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BALANCE_SHEET_API_URL}/api.xro/2.0/Reports/BalanceSheet`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching balance sheet" });
  }
};
