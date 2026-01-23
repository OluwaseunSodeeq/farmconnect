const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
