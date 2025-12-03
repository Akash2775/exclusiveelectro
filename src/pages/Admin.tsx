import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useCategories, useCreateCategory, useDeleteCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Package,
  FolderOpen,
  Zap,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Admin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    price: "",
    original_price: "",
    image_url: "",
    description: "",
    badge: "",
    is_featured: false,
    is_flash_deal: false,
    stock: "0",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [authLoading, user, isAdmin, navigate]);

  const handleCreateProduct = async () => {
    if (!productForm.name || !productForm.slug || !productForm.price) {
      toast({
        title: "Validation Error",
        description: "Name, slug, and price are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProduct.mutateAsync({
        name: productForm.name,
        slug: productForm.slug,
        price: parseFloat(productForm.price),
        original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
        image_url: productForm.image_url || null,
        description: productForm.description || null,
        badge: productForm.badge || null,
        is_featured: productForm.is_featured,
        is_flash_deal: productForm.is_flash_deal,
        stock: parseInt(productForm.stock) || 0,
      });

      toast({ title: "Success", description: "Product created successfully." });
      setProductDialogOpen(false);
      resetProductForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await updateProduct.mutateAsync({
        id: editingProduct,
        updates: {
          name: productForm.name,
          slug: productForm.slug,
          price: parseFloat(productForm.price),
          original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
          image_url: productForm.image_url || null,
          description: productForm.description || null,
          badge: productForm.badge || null,
          is_featured: productForm.is_featured,
          is_flash_deal: productForm.is_flash_deal,
          stock: parseInt(productForm.stock) || 0,
        },
      });

      toast({ title: "Success", description: "Product updated successfully." });
      setProductDialogOpen(false);
      setEditingProduct(null);
      resetProductForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast({ title: "Success", description: "Product deleted successfully." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateCategory = async () => {
    if (!categoryForm.name || !categoryForm.slug) {
      toast({
        title: "Validation Error",
        description: "Name and slug are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createCategory.mutateAsync({
        name: categoryForm.name,
        slug: categoryForm.slug,
        description: categoryForm.description || null,
        icon: categoryForm.icon || null,
      });

      toast({ title: "Success", description: "Category created successfully." });
      setCategoryDialogOpen(false);
      setCategoryForm({ name: "", slug: "", description: "", icon: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast({ title: "Success", description: "Category deleted successfully." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const startEditingProduct = (product: any) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      slug: product.slug,
      price: product.price.toString(),
      original_price: product.original_price?.toString() || "",
      image_url: product.image_url || "",
      description: product.description || "",
      badge: product.badge || "",
      is_featured: product.is_featured || false,
      is_flash_deal: product.is_flash_deal || false,
      stock: product.stock?.toString() || "0",
    });
    setProductDialogOpen(true);
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      slug: "",
      price: "",
      original_price: "",
      image_url: "",
      description: "",
      badge: "",
      is_featured: false,
      is_flash_deal: false,
      stock: "0",
    });
  };

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Store
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">Admin Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">Products</h2>
              <Dialog open={productDialogOpen} onOpenChange={(open) => {
                setProductDialogOpen(open);
                if (!open) {
                  setEditingProduct(null);
                  resetProductForm();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({ ...productForm, name: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug *</Label>
                        <Input
                          id="slug"
                          value={productForm.slug}
                          onChange={(e) =>
                            setProductForm({ ...productForm, slug: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({ ...productForm, price: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="original_price">Original Price</Label>
                        <Input
                          id="original_price"
                          type="number"
                          value={productForm.original_price}
                          onChange={(e) =>
                            setProductForm({ ...productForm, original_price: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={productForm.stock}
                          onChange={(e) =>
                            setProductForm({ ...productForm, stock: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={productForm.image_url}
                        onChange={(e) =>
                          setProductForm({ ...productForm, image_url: e.target.value })
                        }
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="badge">Badge</Label>
                        <Input
                          id="badge"
                          value={productForm.badge}
                          onChange={(e) =>
                            setProductForm({ ...productForm, badge: e.target.value })
                          }
                          className="bg-secondary/50"
                          placeholder="e.g. Hot, New, Sale"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({ ...productForm, description: e.target.value })
                          }
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_featured"
                          checked={productForm.is_featured}
                          onCheckedChange={(checked) =>
                            setProductForm({ ...productForm, is_featured: checked })
                          }
                        />
                        <Label htmlFor="is_featured">Featured Product</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          id="is_flash_deal"
                          checked={productForm.is_flash_deal}
                          onCheckedChange={(checked) =>
                            setProductForm({ ...productForm, is_flash_deal: checked })
                          }
                        />
                        <Label htmlFor="is_flash_deal">Flash Deal</Label>
                      </div>
                    </div>
                    <Button
                      onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                      className="btn-primary w-full"
                      disabled={createProduct.isPending || updateProduct.isPending}
                    >
                      {createProduct.isPending || updateProduct.isPending
                        ? "Saving..."
                        : editingProduct
                        ? "Update Product"
                        : "Create Product"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {productsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Product</th>
                      <th className="text-left p-4 font-semibold">Price</th>
                      <th className="text-left p-4 font-semibold">Stock</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-right p-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr key={product.id} className="border-t border-border/30">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {product.image_url && (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover bg-secondary"
                              />
                            )}
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-primary font-semibold">
                            ${Number(product.price).toFixed(2)}
                          </span>
                          {product.original_price && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${Number(product.original_price).toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="p-4">{product.stock}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {product.is_featured && (
                              <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                                Featured
                              </span>
                            )}
                            {product.is_flash_deal && (
                              <span className="px-2 py-1 text-xs rounded-full bg-destructive/20 text-destructive">
                                Flash Deal
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startEditingProduct(product)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!products || products.length === 0) && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                          No products found. Create your first product!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">Categories</h2>
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cat-name">Name *</Label>
                      <Input
                        id="cat-name"
                        value={categoryForm.name}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, name: e.target.value })
                        }
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cat-slug">Slug *</Label>
                      <Input
                        id="cat-slug"
                        value={categoryForm.slug}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, slug: e.target.value })
                        }
                        className="bg-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cat-icon">Icon (emoji)</Label>
                      <Input
                        id="cat-icon"
                        value={categoryForm.icon}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, icon: e.target.value })
                        }
                        className="bg-secondary/50"
                        placeholder="e.g. 📱"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cat-description">Description</Label>
                      <Input
                        id="cat-description"
                        value={categoryForm.description}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, description: e.target.value })
                        }
                        className="bg-secondary/50"
                      />
                    </div>
                    <Button
                      onClick={handleCreateCategory}
                      className="btn-primary w-full"
                      disabled={createCategory.isPending}
                    >
                      {createCategory.isPending ? "Creating..." : "Create Category"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {categoriesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories?.map((category) => (
                  <div key={category.id} className="glass-card p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{category.icon || "📦"}</span>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <p className="text-sm text-muted-foreground">{category.slug}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {category.description && (
                      <p className="mt-3 text-sm text-muted-foreground">{category.description}</p>
                    )}
                  </div>
                ))}
                {(!categories || categories.length === 0) && (
                  <div className="col-span-full p-8 text-center text-muted-foreground glass-card">
                    No categories found. Create your first category!
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
