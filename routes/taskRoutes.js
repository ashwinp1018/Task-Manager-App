import express from "express";
import Task from "../models/Task.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().lean();
  res.render("index", { tasks, alert: null });
});

router.post("/tasks", async (req, res) => {
  const { text, priority } = req.body;
  if (!text.trim()) {
    const tasks = await Task.find().lean();
    return res.render("index", { tasks, alert: "Task cannot be empty!" });
  }
  await Task.create({ title: text, priority });
  res.redirect("/");
});

router.post("/tasks/edit/:id", async (req, res) => {
  const { text, priority } = req.body;
  await Task.findByIdAndUpdate(req.params.id, { title: text, priority });
  res.redirect("/");
});

router.post("/tasks/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

export default router;
