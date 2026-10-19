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
  {
    number: "04",
    title: "Database Migration & Data Engineering",
    subtitle: "PostgreSQL migration & data-flow analysis",
    description:
      "Contributed to PostgreSQL database migration initiatives and analyzed data flows to improve system integration, data consistency, and overall platform reliability.",
    stack: ["PostgreSQL", "Data Engineering"],
    employer: "channels by stc",
  },
  {
    number: "05",
    title: "Inventory Management Automation",
    subtitle: "One-click inventory workflow automation",
    description:
      "Developed automation solutions to streamline inventory management workflows, enabling employees to retrieve and access system content through a one-click experience.",
    stack: ["Workflow Automation"],
    employer: "channels by stc",
  },

  // --- Samsung Research and Development Institute Jordan ---
  {
    number: "06",
    title: "On-Device Arabic ASR",
    subtitle: "On-device speech recognition for Galaxy AI",
    description:
      "Contributed to the Galaxy AI project, building end-to-end Arabic automatic speech recognition for Samsung flagship smartphones, with ASR and LLM models optimized for on-device NPUs using pruning, quantization, and LoRA.",
    stack: ["ASR", "Quantization", "Pruning", "LoRA"],
    employer: "Samsung R&D Institute Jordan",
  },
  {
    number: "07",
    title: "On-Device LLM Optimization",
    subtitle: "Compressing LLMs for on-device inference",
    description:
      "Quantized and pruned small LLMs (1B–3B parameters) for on-device deployment using the Qualcomm AI SDK.",
    stack: ["LLMs", "Quantization", "Qualcomm AI SDK"],
    employer: "Samsung R&D Institute Jordan",
  },
  {
    number: "08",
    title: "Patented Multimodal Deep Learning Research",
    subtitle: "2nd place, Spoken Task-Oriented Semantic Parsing @ ICASSP 2023",
    description:
      "Spearheaded advancements in multimodal deep learning, earning a patent for an innovative solution — research that went on to place 2nd at Spoken Task-Oriented Semantic Parsing @ ICASSP 2023.",
    stack: ["Multimodal Learning", "Semantic Parsing", "Deep Learning"],
    employer: "Samsung R&D Institute Jordan",
  },
  {
    number: "09",
    title: "Applied AI Research Prototypes",
    subtitle: "Generative image filling, voice isolation, speaker diarization",
    description:
      "Proposed and built several applied research prototypes: generative image inpainting (Generative Image Filling), real-time multi-speaker voice isolation (Voice Filter), and speaker diarization.",
    stack: ["Generative AI", "Computer Vision", "Speaker Diarization"],
    employer: "Samsung R&D Institute Jordan",
  },
  {
    number: "10",
    title: "Automated Smartphone Testing",
    subtitle: "Computer-vision-based test automation",
    description:
      "Led development of automated smartphone testing systems using computer vision to validate device behavior at scale.",
    stack: ["Computer Vision", "Test Automation", "Python"],
    employer: "Samsung R&D Institute Jordan",
  },

  // --- Jordan University of Science and Technology ---
  {
    number: "11",
    title: "Hateful Arabic Memes Detection",
    subtitle: "Multimodal hate-speech detection research",
    description:
      "A multimodal deep learning system that detects hateful Arabic memes and classifies hate categories, built on a dataset annotated in-house. Ranked 17th globally in SemEval-2022 Task 5 (YMAI).",
    stack: ["Multimodal Learning", "NLP", "Computer Vision"],
    employer: "Jordan University of Science and Technology",
  },

  // --- Personal / academic projects ---
  {
    number: "12",
    title: "Student LLM",
    subtitle: "Grade-aware RAG tutor",
    description:
      "A retrieval-augmented generation system that searches a class textbook and tailors answers to a student’s specific grade level.",
    stack: ["Python", "LLM", "RAG", "Vector DB"],
    // TODO: add your repo link, e.g. "https://github.com/yourname/student-llm"
  },
  {
    number: "13",
    title: "Pyroomacoustics Rooms Simulator",
    subtitle: "Room acoustics simulation & augmentation",
    description:
      "A Python application for simulating room acoustics and applying the simulated effects to WAV audio files — used for audio data augmentation.",
    stack: ["Python", "Data Augmentation", "Pyroomacoustics"],
    // TODO: add your repo link
  },
  {
    number: "14",
    title: "Adaptive Call Sentiment Analyzer",
    subtitle: "Call-center transcript sentiment classifier",
    description:
      "A FastAPI + Streamlit application that classifies customer support call transcripts into Positive, Neutral, or Negative sentiment.",
    stack: ["Python", "FastAPI", "Streamlit"],
    // TODO: add your repo link
  },
];
