import { db } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let products;
    if (category) {
      products = await db.product.findMany({
        where: {
          categoryId: category,
        },
        include: {
          category: true,
        },
      });
    } else {
      products = await db.product.findMany({
        include: {
          category: true,
        },
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
