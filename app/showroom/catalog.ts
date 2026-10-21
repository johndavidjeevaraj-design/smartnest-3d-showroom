export type MaterialCategory = "Stone" | "Terrazzo" | "Concrete" | "Marble";

export type ShowroomMaterial = {
  id: string;
  name: string;
  category: MaterialCategory;
  color: string;
  grout: string;
  finish: string;
  format: string;
  thickness: string;
  description: string;
  textureStyle: "veined" | "speckled" | "clouded" | "linear";
};

export const materials: ShowroomMaterial[] = [
  {
    id: "warm-limestone",
    name: "Warm limestone",
    category: "Stone",
    color: "#c9b99f",
    grout: "#817564",
    finish: "Soft honed",
    format: "120 × 60 cm",
    thickness: "9 mm",
    description:
      "Quiet sand-toned movement with soft mineral flecks and a honed, low-glare finish.",
    textureStyle: "clouded",
  },
  {
    id: "silver-travertine",
    name: "Silver travertine",
    category: "Stone",
    color: "#aaa69d",
    grout: "#69665f",
    finish: "Natural stone",
    format: "120 × 60 cm",
    thickness: "9 mm",
    description:
      "Cool grey-beige striations bring a calm, architectural rhythm to the room.",
    textureStyle: "linear",
  },
  {
    id: "cloud-terrazzo",
    name: "Cloud terrazzo",
    category: "Terrazzo",
    color: "#d0ccc2",
    grout: "#817d75",
    finish: "Velvet",
    format: "100 × 100 cm",
    thickness: "8 mm",
    description:
      "A pale mineral field with fine, scattered aggregate and a gently tactile surface.",
    textureStyle: "speckled",
  },
  {
    id: "basalt-graphite",
    name: "Basalt graphite",
    category: "Stone",
    color: "#62625f",
    grout: "#393a38",
    finish: "Structured",
    format: "120 × 60 cm",
    thickness: "9 mm",
    description:
      "Deep charcoal stone with restrained grain, designed to anchor light-filled spaces.",
    textureStyle: "clouded",
  },
  {
    id: "chalk-marble",
    name: "Chalk marble",
    category: "Marble",
    color: "#ded9ce",
    grout: "#9a9489",
    finish: "Satin",
    format: "120 × 120 cm",
    thickness: "9 mm",
    description:
      "Warm chalk-white porcelain with delicate, low-contrast mineral veining.",
    textureStyle: "veined",
  },
  {
    id: "moss-concrete",
    name: "Moss concrete",
    category: "Concrete",
    color: "#96978b",
    grout: "#5f6258",
    finish: "Natural",
    format: "60 × 60 cm",
    thickness: "8 mm",
    description:
      "Muted mineral green and soft tonal variation create a grounded, tactile plane.",
    textureStyle: "speckled",
  },
];

export type MaterialFilter =
  | "All materials"
  | MaterialCategory;

export function filterMaterials(
  query: string,
  category: MaterialFilter,
): ShowroomMaterial[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return materials.filter((material) => {
    const matchesCategory =
      category === "All materials" || material.category === category;
    const searchText = [
      material.name,
      material.category,
      material.finish,
      material.format,
      material.description,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return matchesCategory && searchText.includes(normalizedQuery);
  });
}

export const materialCategories: MaterialFilter[] = [
  "All materials",
  "Stone",
  "Terrazzo",
  "Concrete",
  "Marble",
];

export const floors = [
  { id: "ground-floor", label: "Ground floor", implemented: true },
  { id: "first-floor", label: "First floor", implemented: false },
  { id: "underground", label: "Underground", implemented: false },
  { id: "pop-up-window", label: "Pop-up window", implemented: false },
] as const;

export type FloorId = (typeof floors)[number]["id"];
