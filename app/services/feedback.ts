import { Message } from "../interview/page";

export async function getFeedback(conversation: Message[], code: string) {
  const responses = await Promise.all([
    // Technical Depth & Optimization
    fetch("/api/feedback/technicalDepth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation }),
    }),
    // Problem Solving & Functional Correctness
    fetch("/api/feedback/problemSolving", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation }),
    }),
    // Code Quality & Readability
    fetch("/api/feedback/codeQuality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }),
  ]);

  const [technicalDepth, problemSolving, codeQuality] = await Promise.all(
    responses.map((r) => r.json())
  );

  return {
    technicalDepth,
    problemSolving,
    codeQuality,
  };
}
