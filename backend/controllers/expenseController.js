const xlsx = require("xlsx");
const Expense = require("../models/Expense");
const moment = require('moment');

//add Expense source
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, category, amount, date } = req.body;

    //validation: check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).send(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log("error im addIncome", error.message);
  }
};

//Get all Expense
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error.message);
  }
};

//delete Expense
exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    await Expense.findByIdAndDelete(expenseId);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error.message);
  }
};

//download Expense excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    
    //Prepare data for excel
    const data = expense.map((item) => ({
        Category: item.category,
        Amount: item.amount,
        Date: moment(item.date).format("DD-MMM-YYYY"),
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "Expense_details.xlsx");
    res.download("Expense_details.xlsx");
    } catch (error) {
        res.status(500).json({message:"Server Error"});
        console.log(error.message);
    }
};
