import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Candidate from "../models/candidate.model";
import { v4 as uuidv4 } from "uuid";

export const createCandidate = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, skills, status, recruited, recruitmentYear } = req.body;
    if (recruited && !recruitmentYear) {
      return res.status(400).json({ error: "Recruitment year is required if recruited is true." });
    }

    const candidate = await Candidate.create({
      id: uuidv4(),
      name,
      email,
      skills,
      status,
      recruited,
      recruitmentYear: recruited ? recruitmentYear : null,
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllCandidates = async (_req: Request, res: Response) => {
  try {
    const candidates = await Candidate.findAll();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });

    await candidate.update(req.body);
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });

    await candidate.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getRecruitmentStats = async (_req: Request, res: Response) => {
  try {
    const stats = await Candidate.findAll({
      attributes: ["recruitmentYear"],
      group: ["recruitmentYear"],
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
