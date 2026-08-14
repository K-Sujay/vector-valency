export type BankQuestion = {
  chapterSlug: string;
  subject: "physics" | "chemistry" | "mathematics" | "computer-science";
  set: 4 | 5;
  id: string;
  prompt: string;
  type: "mcq" | "short";
  options?: string[];
  correct: string;
  explanation: string;
  marks: 3 | 5;
  topic: string;
  source: "exam-pack";
};

// Source-backed seed questions from the user's previously uploaded exam pack.
// These are intentionally kept separate from generated questions so future curated
// question banks can be expanded without changing the quiz engine.
export const QUESTION_BANK: BankQuestion[] = [
  {
    chapterSlug: "electric-charges-and-fields", subject: "physics", set: 4, id: "phy1-gauss-flux-radius",
    prompt: "A point charge is enclosed by a spherical Gaussian surface. If the radius of the sphere is doubled while the same charge remains enclosed, what happens to the total electric flux? Explain briefly.",
    type: "mcq", options: ["It becomes half", "It becomes one-fourth", "It remains unchanged", "It becomes four times"],
    correct: "It remains unchanged",
    explanation: "Gauss's law gives Φ = q_enclosed/ε₀. The enclosed charge has not changed, so the total flux is unchanged. The electric field at the surface changes with radius, but total closed-surface flux does not.",
    marks: 3, topic: "Gauss's law", source: "exam-pack",
  },
  {
    chapterSlug: "electric-charges-and-fields", subject: "physics", set: 4, id: "phy1-dipole-torque",
    prompt: "A dipole has moment 6 × 10⁻⁸ C·m and is placed in an electric field of 5 × 10⁴ N/C at 30°. Find the torque on the dipole.",
    type: "short", correct: "1.5 × 10⁻³ N·m",
    explanation: "Given p = 6 × 10⁻⁸ C·m, E = 5 × 10⁴ N/C and θ = 30°. Use τ = pE sinθ. Therefore τ = (6 × 10⁻⁸)(5 × 10⁴)(1/2) = 1.5 × 10⁻³ N·m.",
    marks: 3, topic: "Electric dipole torque", source: "exam-pack",
  },
  {
    chapterSlug: "electric-charges-and-fields", subject: "physics", set: 5, id: "phy1-line-charge-field",
    prompt: "An infinite line charge has linear charge density 4 × 10⁻⁸ C/m. Find the electric field magnitude at a point 20 cm from the line.",
    type: "short", correct: "3.60 × 10³ N/C",
    explanation: "Use E = λ/(2πε₀r). Here λ = 4 × 10⁻⁸ C/m and r = 0.20 m. Substitution gives E ≈ 3.60 × 10³ N/C. For a positive line charge the field is radially outward.",
    marks: 5, topic: "Infinite line charge", source: "exam-pack",
  },
  {
    chapterSlug: "electric-charges-and-fields", subject: "physics", set: 5, id: "phy1-spherical-shell-gauss",
    prompt: "Using Gauss's law, derive the electric field outside a uniformly charged spherical shell of radius R and charge Q.",
    type: "short", correct: "E = Q/(4πε₀r²)",
    explanation: "Choose a concentric spherical Gaussian surface of radius r > R. By spherical symmetry E is constant and radial. Flux = E(4πr²). Enclosed charge is Q. Gauss's law gives E(4πr²)=Q/ε₀, hence E = Q/(4πε₀r²) = kQ/r², directed radially outward for Q > 0.",
    marks: 5, topic: "Gauss's law and spherical shell", source: "exam-pack",
  },
  {
    chapterSlug: "electrostatic-potential-and-capacitance", subject: "physics", set: 4, id: "phy2-zero-potential",
    prompt: "Charges +3 × 10⁻⁸ C and −2 × 10⁻⁸ C are 15 cm apart. Find the points on the line joining them where the electric potential is zero.",
    type: "short", correct: "9 cm from the +3 × 10⁻⁸ C charge and 30 cm beyond the −2 × 10⁻⁸ C charge",
    explanation: "Set V = k(q₁/r₁ + q₂/r₂) = 0. Between the charges, 3/x = 2/(0.15−x), giving x = 0.09 m. Outside, on the side of the smaller charge, 3/x = 2/(x−0.15), giving x = 0.45 m from the +3 × 10⁻⁸ C charge, i.e. 30 cm beyond the negative charge. There are two zero-potential points.",
    marks: 5, topic: "Zero electric potential", source: "exam-pack",
  },
  {
    chapterSlug: "electrostatic-potential-and-capacitance", subject: "physics", set: 5, id: "phy2-dipole-potential",
    prompt: "Obtain the expression for the electric potential due to an electric dipole at a distant point, stating the required approximation.",
    type: "short", correct: "V = kp cosθ/r² for r ≫ a",
    explanation: "For charges ±q separated by 2a, write the potential as V = k[q/r₊ − q/r₋]. For a distant point where r ≫ a, the expression reduces to V = kp cosθ/r², where p = 2aq and θ is the angle between p and the position vector.",
    marks: 5, topic: "Potential due to dipole", source: "exam-pack",
  },
  {
    chapterSlug: "electrostatic-potential-and-capacitance", subject: "physics", set: 5, id: "phy2-capacitor-dielectric",
    prompt: "A parallel-plate capacitor is charged and then disconnected from its battery. A dielectric of constant K is inserted fully between the plates. What happens to capacitance and potential difference?",
    type: "mcq", options: ["C becomes KC and V becomes V/K", "C becomes C/K and V becomes KV", "Both C and V remain unchanged", "C becomes KC and V remains V"],
    correct: "C becomes KC and V becomes V/K",
    explanation: "With the battery disconnected, free charge Q remains constant. Inserting the dielectric makes C′ = KC. Since V = Q/C, the new potential is V′ = V/K.",
    marks: 5, topic: "Dielectric and disconnected capacitor", source: "exam-pack",
  },
  {
    chapterSlug: "electrostatic-potential-and-capacitance", subject: "physics", set: 4, id: "phy2-capacitor-combination",
    prompt: "Two capacitors C₁ and C₂ are connected first in series and then in parallel. Write the equivalent capacitance for both arrangements and state which stores more charge at the same applied voltage.",
    type: "short", correct: "Series: C₁C₂/(C₁+C₂); Parallel: C₁+C₂; parallel stores more charge",
    explanation: "For series, 1/Cs = 1/C₁ + 1/C₂, so Cs = C₁C₂/(C₁+C₂). For parallel, Cp = C₁+C₂. At the same voltage Q = CV, and Cp > Cs, so the parallel arrangement stores more charge.",
    marks: 3, topic: "Capacitor combinations", source: "exam-pack",
  },
];
