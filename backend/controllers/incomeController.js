const xlsx = require("xlsx");
const Income = require("../models/Income");
const moment = require('moment');

//add Income source
exports.addIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, source, amount, date } = req.body;

    //validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).send(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log("error im addIncome", error.message);
  }
};

//Get all income
exports.getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error.message);
  }
};

//delete income
exports.deleteIncome = async (req, res) => {
  const incomeId = req.params.id;
  try {
    await Income.findByIdAndDelete(incomeId);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error.message);
  }
};

//download income excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    
    //Prepare data for excel
    const data = income.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Date: moment(item.date).format("DD-MMM-YYYY"),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "Income_details.xlsx");
    res.download("Income_details.xlsx");
    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log(error.message);
    }
};
