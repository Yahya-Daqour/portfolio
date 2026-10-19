export type Project = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  // Omit for personal/academic projects — the UI falls back to "Personal Project".
  employer?: string;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  // --- channels by stc ---
  {
    number: "01",
    title: "MarketLens",
    subtitle: "AI-powered competitive pricing platform",
    description:
      "An AI-powered competitive pricing platform built end-to-end — backend, frontend, and ML algorithms — including web scraping pipelines and product-matching algorithms that compare prices against stc Store.",
    stack: ["Python", "Web Scraping", "Machine Learning"],
    employer: "channels by stc",
  },
  {
    number: "02",
    title: "Commission Engine",
    subtitle: "AI payout validation & data quality",
    description:
      "An AI service that validates payout calculations and checks whether commission policies are logically consistent with the payouts they generate, cross-referenced against company announcements.",
    stack: ["Python", "Data Validation", "Machine Learning"],
    employer: "channels by stc",
  },
  {
    number: "03",
    title: "Warehouse Management System",
    subtitle: "AI-powered picking-route optimization",
    description:
      "An AI-powered warehouse navigation and mapping system that optimizes product-picking routes to minimize travel time across multiple warehouse locations. (In progress.)",
    stack: ["Python", "Optimization", "Machine Learning"],
    employer: "channels by stc",
  },

  // --- Samsung Research and Development Institute Jordan ---
  {
    number: "04",
    title: "On-Device Arabic ASR",
    subtitle: "On-device speech recognition for Galaxy phones",
    description:
      "End-to-end Arabic automatic speech recognition for Samsung flagship smartphones, with ASR and LLM models optimized for on-device NPUs using pruning, quantization, and LoRA.",
    stack: ["ASR", "Quantization", "Pruning", "LoRA"],
    employer: "Samsung R&D Institute Jordan",
  },
  {
    number: "05",
    title: "On-Device LLM Optimization",
    subtitle: "Compressing LLMs for on-device inference",
    description:
      "Quantized and pruned small LLMs (1B–3B parameters) for on-device deployment using the Qualcomm AI SDK.",
    stack: ["LLMs", "Quantization", "Qualcomm AI SDK"],
    employer: "Samsung R&D Institute Jordan",
  },

  // --- Jordan University of Science and Technology ---
  {
    number: "06",
    title: "Hateful Arabic Memes Detection",
    subtitle: "Multimodal hate-speech detection research",
    description:
      "A multimodal deep learning system that detects hateful Arabic memes and classifies hate categories, built on a dataset annotated in-house. Ranked 17th globally in SemEval-2022 Task 5 (YMAI).",
    stack: ["Multimodal Learning", "NLP", "Computer Vision"],
    employer: "Jordan University of Science and Technology",
  },

  // --- Personal / academic projects ---
  {
    number: "07",
    title: "Student LLM",
    subtitle: "Grade-aware RAG tutor",
    description:
      "A retrieval-augmented generation system that searches a class textbook and tailors answers to a student’s specific grade level.",
    stack: ["Python", "LLM", "RAG", "Vector DB"],
    // TODO: add your repo link, e.g. "https://github.com/yourname/student-llm"
  },
  {
    number: "08",
    title: "Pyroomacoustics Rooms Simulator",
    subtitle: "Room acoustics simulation & augmentation",
    description:
      "A Python application for simulating room acoustics and applying the simulated effects to WAV audio files — used for audio data augmentation.",
    stack: ["Python", "Data Augmentation", "Pyroomacoustics"],
    // TODO: add your repo link
  },
  {
    number: "09",
    title: "Adaptive Call Sentiment Analyzer",
    subtitle: "Call-center transcript sentiment classifier",
    description:
      "A FastAPI + Streamlit application that classifies customer support call transcripts into Positive, Neutral, or Negative sentiment.",
    stack: ["Python", "FastAPI", "Streamlit"],
    // TODO: add your repo link
  },
];
