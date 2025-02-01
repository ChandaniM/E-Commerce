export interface Product {
    product_id: string;
    product_name: string;
    category: string ;
    discounted_price: string;
    actual_price: string;
    discount_percentage?: string;
    rating?: string;
    rating_count?: string;
    about_product?: string;
    user_id?: string;
    user_name?: string;
    review_id?: string;
    review_title?: string;
    review_content?: string;
    img_link?: string;
    product_link?: string;
  }