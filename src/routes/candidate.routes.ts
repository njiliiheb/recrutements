import { Router } from "express";
import * as candidateController from "../controllers/candidate.controller";

const router = Router();

router.post("/", candidateController.createCandidate);
router.get("/", candidateController.getAllCandidates);
router.get("/:id", candidateController.getCandidateById);
router.put("/:id", candidateController.updateCandidate);
router.delete("/:id", candidateController.deleteCandidate);
router.get("/stats", candidateController.getRecruitmentStats);

export default router;
