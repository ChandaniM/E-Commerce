export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  sale: boolean;
  category : string[],
  grams: string[]; 
  layout: 'portrait' | 'landscape' | string; 

  features: {
    cardWidth: number | null;
    button: {
      show: boolean;
      text: string;
    };
    gramsTags: boolean;
    input: {
      show: boolean;
      type: string;
    };
    titleAlignment: 'left' | 'center' | 'right' | string; 
    buttonWrapper: string;
  };
}
