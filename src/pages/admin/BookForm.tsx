import React, { useState } from "react";
import { Book } from "../../types/book";
import { createBook } from "../../services/bookService";// Import hàm createBook

const initialBook: Book = {
  id: "",
  name: "",
  short_description: "",
  description: "",
  book_cover: null,
  authors: [{ id: 0, name: "", slug: "" }],
  categories: { id: 0, name: "", is_leaf: false },
  current_seller: {
    id: 0,
    sku: "",
    name: "",
    link: "",
    logo: "",
    price: 0,
    product_id: "",
    store_id: 0,
    is_best_store: false,
    is_offline_installment_supported: null,
  },
  original_price: 0,
  list_price: 0,
  quantity_sold: { text: "", value: 0 },
  rating_average: 0,
  images: [{ base_url: "", is_gallery: true, label: null, large_url: "", medium_url: "", position: null, small_url: "", thumbnail_url: "" }],
  specifications: [{ name: "Thông tin chung", attributes: [{ code: "", name: "", value: "" }] }],
};

const BookForm = () => {
  const [book, setBook] = useState<Book>(initialBook);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [error, setError] = useState<string | null>(null); // Thêm state error

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (path: string, value: any) => {
    setBook(prev => {
      const updatedBook = { ...prev };
      let current = updatedBook as any;
      const parts = path.split('.');
      const lastPart = parts.pop();

      for (const part of parts) {
        if (!current[part]) {
          current[part] = typeof part === 'number' ? [] : {};
        }
        current = current[part];
      }

      if (lastPart) {
        current[lastPart] = value;
      }
      return updatedBook;
    });
  };

  const handleArrayItemChange = (path: string, index: number, value: any) => {
    setBook(prev => {
      const updatedBook = { ...prev };
      let current = updatedBook as any;
      const parts = path.split('.');
      const arrayName = parts.pop();

      for (const part of parts) {
        current = current[part];
      }

      if (arrayName && Array.isArray(current[arrayName]) && current[arrayName][index]) {
        current[arrayName][index] = { ...current[arrayName][index], ...value };
      }
      return updatedBook;
    });
  };

  const handleAddAuthor = () => {
    setBook(prev => ({ ...prev, authors: [...prev.authors, { id: 0, name: "", slug: "" }] }));
  };

  const handleRemoveAuthor = (index: number) => {
    setBook(prev => ({ ...prev, authors: prev.authors.filter((_, i) => i !== index) }));
  };

  const handleAddImage = () => {
    setBook(prev => ({ ...prev, images: [...prev.images, { base_url: "", is_gallery: true, label: null, large_url: "", medium_url: "", position: null, small_url: "", thumbnail_url: "" }] }));
  };

  const handleRemoveImage = (index: number) => {
    setBook(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };
  const handleAddSpecificationAttribute = (specIndex: number) => {
    setBook(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, sIndex) =>
        sIndex === specIndex ? { ...spec, attributes: [...spec.attributes, { code: "", name: "", value: "" }] } : spec
      )
    }));
  };

  const handleRemoveSpecificationAttribute = (specIndex: number, attrIndex: number) => {
    setBook(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, sIndex) =>
        sIndex === specIndex ? { ...spec, attributes: spec.attributes.filter((_, aIndex) => aIndex !== attrIndex) } : spec
      )
    }));
  };

  const handleSpecificationNameChange = (specIndex: number, name: string) => {
    setBook(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, sIndex) =>
        sIndex === specIndex ? { ...spec, name } : spec
      )
    }));
  };

  const handleSpecificationAttributeChange = (specIndex: number, attrIndex: number, attribute: { code: string; name: string; value: string }) => {
    setBook(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec, sIndex) =>
        sIndex === specIndex ? {
          ...spec,
          attributes: spec.attributes.map((attr, aIndex) =>
            aIndex === attrIndex ? attribute : attr
          )
        } : spec
      )
    }));
  };

  const handleAddSpecification = () => {
    setBook(prev => ({ ...prev, specifications: [...prev.specifications, { name: "", attributes: [{ code: "", name: "", value: "" }] }] }));
  };

  const handleRemoveSpecification = (specIndex: number) => {
    setBook(prev => ({ ...prev, specifications: prev.specifications.filter((_, sIndex) => sIndex !== specIndex) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    setError(null); // Reset lỗi trước đó
    try {
      // Gọi hàm createBook từ apiService
      await createBook(book);
      console.log("Sách đã được tạo thành công:", book);
      // TODO: Có thể reset form hoặc hiển thị thông báo thành công
      setBook(initialBook); // Reset form sau khi tạo thành công
    } catch (err: any) {
      setError(err.message || "Đã có lỗi xảy ra khi tạo sách."); // Gán lỗi vào state
      console.error("Lỗi khi tạo sách:", err);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold">Thêm / Sửa Sách</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên sách */}
        <input
          type="text"
          name="name"
          value={book.name}
          onChange={handleChange}
          placeholder="Tên sách"
          className="w-full px-4 py-2 border rounded"
          required
        />

        {/* Mô tả ngắn */}
        <textarea
          name="short_description"
          value={book.short_description}
          onChange={handleChange}
          placeholder="Mô tả ngắn"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Mô tả chi tiết */}
        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          placeholder="Mô tả chi tiết"
          className="w-full px-4 py-2 border rounded"
        />

        {/* Giá bán + Giá niêm yết */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="original_price"
            value={book.original_price}
            onChange={handleChange}
            placeholder="Giá bán"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            name="list_price"
            value={book.list_price}
            onChange={handleChange}
            placeholder="Giá niêm yết"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Tác giả */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Tác giả</h3>
          {book.authors.map((author, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="number"
                placeholder="ID"
                value={author.id}
                onChange={(e) => handleArrayItemChange(`authors`, index, { id: +e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Tên"
                value={author.name}
                onChange={(e) => handleArrayItemChange(`authors`, index, { name: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="Slug"
                value={author.slug}
                onChange={(e) => handleArrayItemChange(`authors`, index, { slug: e.target.value })}
                className="border rounded px-2 py-1"
              />
              {book.authors.length > 1 && (
                <button type="button" onClick={() => handleRemoveAuthor(index)} className="text-red-500">
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddAuthor} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Thêm tác giả
          </button>
        </div>

        {/* Thể loại */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Thể loại</h3>
          <input
            type="number"
            placeholder="ID thể loại"
            value={book.categories.id}
            onChange={(e) => handleNestedChange(`categories.id`, +e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Tên thể loại"
            value={book.categories.name}
            onChange={(e) => handleNestedChange(`categories.name`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <div className="flex items-center">
            <input 
            title="d"
              type="checkbox"
              checked={book.categories.is_leaf}
              onChange={(e) => handleNestedChange(`categories.is_leaf`, e.target.checked)}
              className="mr-2"
            />
            <label>Is Leaf</label>
          </div>
        </div>

        {/* Nhà cung cấp hiện tại */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Nhà cung cấp hiện tại</h3>
          <input
            type="number"
            placeholder="ID"
            value={book.current_seller.id}
            onChange={(e) => handleNestedChange(`current_seller.id`, +e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="SKU"
            value={book.current_seller.sku}
            onChange={(e) => handleNestedChange(`current_seller.sku`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Tên nhà cung cấp"
            value={book.current_seller.name}
            onChange={(e) => handleNestedChange(`current_seller.name`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="url"
            placeholder="Link"
            value={book.current_seller.link}
            onChange={(e) => handleNestedChange(`current_seller.link`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="url"
            placeholder="Logo URL"
            value={book.current_seller.logo}
            onChange={(e) => handleNestedChange(`current_seller.logo`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Giá"
            value={book.current_seller.price}
            onChange={(e) => handleNestedChange(`current_seller.price`, +e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Product ID"
            value={book.current_seller.product_id}
            onChange={(e) => handleNestedChange(`current_seller.product_id`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Store ID"
            value={book.current_seller.store_id}
            onChange={(e) => handleNestedChange(`current_seller.store_id`, +e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={book.current_seller.is_best_store}
              onChange={(e) => handleNestedChange(`current_seller.is_best_store`, e.target.checked)}
              className="mr-2"
            />
            <label>Is Best Store</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={book.current_seller.is_offline_installment_supported === true}
              onChange={(e) => handleNestedChange(`current_seller.is_offline_installment_supported`, e.target.checked)}
              className="mr-2"
            />
            <label>Is Offline Installment Supported</label>
          </div>
        </div>

        {/* Số lượng đã bán */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Số lượng đã bán</h3>
          <input
            type="text"
            placeholder="Text"
            value={book.quantity_sold.text}
            onChange={(e) => handleNestedChange(`quantity_sold.text`, e.target.value)}
            className="w-full border px-2 py-1 rounded mb-2"
          />
          <input
            type="number"
            placeholder="Value"
            value={book.quantity_sold.value}
            onChange={(e) => handleNestedChange(`quantity_sold.value`, +e.target.value)}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {/* Đánh giá trung bình */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Đánh giá trung bình</h3>
          <input
            type="number"
            step="0.1"
            placeholder="Rating Average"
            value={book.rating_average}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        {/* Hình ảnh */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Hình ảnh</h3>
          {book.images.map((img, index) => (
            <div key={index} className="mb-4 border rounded p-2">
              <h4 className="font-semibold">Hình ảnh {index + 1}</h4>
              <input
                type="text"
                placeholder="Base URL"
                value={img.base_url}
                onChange={(e) => handleArrayItemChange(`images`, index, { base_url: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={img.is_gallery}
                  onChange={(e) => handleArrayItemChange(`images`, index, { is_gallery: e.target.checked })}
                  className="mr-2"
                />
                <label>Is Gallery</label>
              </div>
              <input
                type="text"
                placeholder="Label"
                value={img.label || ''}
                onChange={(e) => handleArrayItemChange(`images`, index, { label: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <input
                type="url"
                placeholder="Large URL"
                value={img.large_url}
                onChange={(e) => handleArrayItemChange(`images`, index, { large_url: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <input
                type="url"
                placeholder="Medium URL"
                value={img.medium_url}
                onChange={(e) => handleArrayItemChange(`images`, index, { medium_url: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <input
                type="number"
                placeholder="Position"
                value={img.position || ''}
                onChange={(e) => handleArrayItemChange(`images`, index, { position: +e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <input
                type="url"
                placeholder="Small URL"
                value={img.small_url}
                onChange={(e) => handleArrayItemChange(`images`, index, { small_url: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <input
                type="url"
                placeholder="Thumbnail URL"
                value={img.thumbnail_url}
                onChange={(e) => handleArrayItemChange(`images`, index, { thumbnail_url: e.target.value })}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              {book.images.length > 1 && (
                <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-500">
                  Xóa
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddImage} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Thêm hình ảnh
          </button>
        </div>

        {/* Specifications */}
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Thông số</h3>
          {book.specifications.map((spec, specIndex) => (
            <div key={specIndex} className="mb-4 border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Thông số {specIndex + 1}</h4>
                {book.specifications.length > 1 && (
                  <button type="button" onClick={() => handleRemoveSpecification(specIndex)} className="text-red-500">
                    Xóa nhóm thông số
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Tên thông số"
                value={spec.name}
                onChange={(e) => handleSpecificationNameChange(specIndex, e.target.value)}
                className="w-full border rounded px-2 py-1 mb-2"
              />
              <h5 className="font-medium mt-2 mb-2">Thuộc tính:</h5>
              {spec.attributes.map((attr, attrIndex) => (
                <div key={attrIndex} className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Mã"
                    value={attr.code}
                    onChange={(e) =>
                      handleSpecificationAttributeChange(specIndex, attrIndex, {
                        ...attr,
                        code: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="Tên"
                    value={attr.name}
                    onChange={(e) =>
                      handleSpecificationAttributeChange(specIndex, attrIndex, {
                        ...attr,
                        name: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={attr.value}
                    onChange={(e) =>
                      handleSpecificationAttributeChange(specIndex, attrIndex, {
                        ...attr,
                        value: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                  />
                  {spec.attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecificationAttribute(specIndex, attrIndex)}
                      className="text-red-500"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSpecificationAttribute(specIndex)}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded mt-2"
              >
                Thêm thuộc tính
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSpecification} className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
            Thêm nhóm thông số
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu sách"}
        </button>
        {error && <p className="text-red-500">{error}</p>} {/* Hiển thị thông báo lỗi */}
      </form>
    </div>
  );
};

export default BookForm;
