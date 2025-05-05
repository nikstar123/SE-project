import { Request, Response, NextFunction } from "express";
import { Product } from "../../models/Product";

// Example authenticate middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Add authentication logic here
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Proceed to the next middleware or route handler
  next();
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    title,
    description,
    price,
    category,
    condition,
    location,
    expires_at,
  } = req.body;
  const seller_id = (req as any).user.id;

  const product = await Product.create({
    seller_id,
    title,
    description,
    price,
    category,
    condition,
    location,
    expires_at,
  });

  res.status(201).json({ product });
};

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.findAll({ where: { status: "active" } });
  res.json({ products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ product });
};

// Export the middleware
export { authenticate };
